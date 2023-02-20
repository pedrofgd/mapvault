import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function noteHandler(req: NextApiRequest, res: NextApiResponse) {
   const { 
      query: {id},
      method
   } = req

   switch (method) {
      case 'GET':
         const notes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/notes/${id}`);
         res.json(notes.data)
         break
      case 'DELETE':
         axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/notes/${id}`)
         .then(response => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'max-age=180000');
            res.end(JSON.stringify(response))
          })
          .catch(error => {
            res.json(error);
            res.status(405).end();
          });
          break
          default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
   }

}