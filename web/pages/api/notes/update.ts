import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
   await axios.put(`${process.env.BACKEND_BASE_URL}/api/v1/notes`,
      JSON.parse(_req.body))
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
}