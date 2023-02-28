// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coordinates, geocode } from "@/services/geocodingService";
import {
  getOfficeGridPoints,
  getWeatherForecast,
} from "@/services/nationalWeatherService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinates[] | string>
) {
  const { address } = req.query;
  const coordinates = await geocode(address as string);
  if (coordinates.length === 0) {
    return res.status(404).json("No address matched");
  }
  const officeGridPoints = await getOfficeGridPoints(coordinates[0]);
  const weatherForecast = await getWeatherForecast(officeGridPoints);
  res.status(200).json(weatherForecast);
  // TODO implement error handling
}
