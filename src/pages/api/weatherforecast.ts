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
  console.debug(coordinates);
  if (coordinates.length === 0) {
    return res.status(404).json("No address matched");
  }
  const officeGridPoints = await getOfficeGridPoints(coordinates[0]);
  console.debug(officeGridPoints);
  const weatherForecast = await getWeatherForecast(officeGridPoints);
  console.debug(weatherForecast);
  res.status(200).json(weatherForecast);
  // TODO implement error handling
}
