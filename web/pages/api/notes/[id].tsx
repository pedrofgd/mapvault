import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function noteHandler(req: NextApiRequest, res: NextApiResponse) {
   const { 
      query: {id} 
   } = req

   const notes = await axios.get(`http://localhost:5149/api/v1/notes/${id}`);
   res.json(notes.data)
}