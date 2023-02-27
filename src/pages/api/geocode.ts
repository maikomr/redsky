// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
interface Coordinates {
  lat: number;
  lon: number;
}

const GEOCODING_SERVICE_HOSTNAME = "https://geocoding.geo.census.gov";

enum ReturnType {
  Locations = "locations",
  Geographies = "geographies",
}

enum SearchType {
  OneLineAddress = "onelineaddress",
  Address = "address",
  Coordinates = "coordinates",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinates[]>
) {
  const { address } = req.query;
  const response = await fetch(
    `${GEOCODING_SERVICE_HOSTNAME}/geocoder/${ReturnType.Locations}/${SearchType.OneLineAddress}?address=${address}&benchmark=2020&format=json`,
    { mode: "cors" }
  );
  const data = await response.json();
  res
    .status(200)
    .json(
      data.result.addressMatches.map(
        (match: { coordinates: Coordinates }) => match.coordinates
      )
    );
}
