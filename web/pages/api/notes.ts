import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const notes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/notes`);
  res.json(notes.data)
}
