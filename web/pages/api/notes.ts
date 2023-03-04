// Workaround for error validating SSL locally
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const notes = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/notes`);
  res.json(notes.data)
}
