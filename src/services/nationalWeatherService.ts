import { Coordinates } from "./geocodingService";

const NWS_HOSTNAME = "https://api.weather.gov";

export interface OfficeGridPoints {
  gridId: string;
  gridX: number;
  gridY: number;
}

export const getOfficeGridPoints = async ({
  lat,
  lon,
}: Coordinates): Promise<OfficeGridPoints> => {
  const response = await fetch(`${NWS_HOSTNAME}/points/${lat},${lon}`);
  const data = await response.json();
  const { gridId, gridX, gridY } = data.properties;
  return { gridId, gridX, gridY };
};

export const getWeatherForecast = async ({
  gridId,
  gridX,
  gridY,
}: OfficeGridPoints) => {
  const response = await fetch(
    `${NWS_HOSTNAME}/gridpoints/${gridId}/${gridX},${gridY}/forecast`
  );
  const data = await response.json();
  return data.properties.periods.filter((period: any) => period.isDaytime);
};
