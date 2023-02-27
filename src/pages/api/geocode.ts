// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coordinates, geocode } from "@/services/geocodingService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinates[]>
) {
  const { address } = req.query;
  const data = await geocode(address as string);
  res.status(200).json(data);
}
