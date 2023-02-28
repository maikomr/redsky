// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  Coordinates,
  geocode,
  GeocodingError,
} from "@/services/geocodingService";
import {
  getOfficeGridPoints,
  getWeatherForecast,
} from "@/services/nationalWeatherService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinates[] | { error: string }>
) {
  const { address } = req.query;
  try {
    const coordinatesResponse = await geocode(address as string);
    const geocodingErrors = (coordinatesResponse as GeocodingError).errors;
    if (geocodingErrors) {
      return res.status(400).json({ error: geocodingErrors[0] });
    }
    const coordinates = coordinatesResponse as Coordinates[];
    if ((coordinatesResponse as Coordinates[]).length === 0) {
      return res.status(404).json({ error: "No address matched" });
    }
    const officeGridPoints = await getOfficeGridPoints(coordinates[0]);
    const weatherForecast = await getWeatherForecast(officeGridPoints);
    res.status(200).json(weatherForecast);
  } catch (error) {
    return res.status(500).json({ error: error as string });
  }
}
