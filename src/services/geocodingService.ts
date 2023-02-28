const GEOCODING_SERVICE_HOSTNAME = "https://geocoding.geo.census.gov";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingError {
  errors: string[];
  status: string;
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
): Promise<Coordinates[] | GeocodingError> => {
  const response = await fetch(
    `${GEOCODING_SERVICE_HOSTNAME}/geocoder/${returnType}/${searchType}?address=${address}&benchmark=2020&format=json`,
    { mode: "cors" }
  );
  const data = await response.json();
  if (response.ok) {
    return data.result.addressMatches.map((match: any) => ({
      latitude: match.coordinates.y,
      longitude: match.coordinates.x,
    }));
  }
  return data;
};
