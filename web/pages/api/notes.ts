import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const notes = await axios
    .get("http://localhost:5149/api/v1/notes");

    const count = await axios
      .get("http://localhost:5149/api/v1/notes/count");
    
  res.json({
    notes: notes.data,
    count: count.data
  })
}
