import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const note = await axios.post(
    `${process.env.BACKEND_BASE_URL}/api/v1/notes/create`,
    JSON.parse(_req.body));
    
  res.json(note.data)
}