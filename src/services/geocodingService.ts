const GEOCODING_SERVICE_HOSTNAME = "https://geocoding.geo.census.gov";

export interface Coordinates {
  lat: number;
  lon: number;
}

export enum ReturnType {
  Locations = "locations",
  Geographies = "geographies",
}

export enum SearchType {
  OneLineAddress = "onelineaddress",
  Address = "address",
  Coordinates = "coordinates",
}

export const geocode = async (
  address: string,
  returnType: ReturnType = ReturnType.Locations,
  searchType: SearchType = SearchType.OneLineAddress
) => {
  const response = await fetch(
    `${GEOCODING_SERVICE_HOSTNAME}/geocoder/${returnType}/${searchType}?address=${address}&benchmark=2020&format=json`,
    { mode: "cors" }
  );
  const data = await response.json();
  return data.result.addressMatches.map(
    (match: { coordinates: Coordinates }) => match.coordinates
  );
};
