"use client";

import SearchInput from "@/components/SearchInput";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const fetchWeatherForecast = async (address: string) => {
  const addressParam = encodeURIComponent(address.trim().replaceAll(" ", "+"));
  const response = await fetch(`/api/weatherforecast?address=${addressParam}`);
  return response.json();
};

export default function Home() {
  const { query, isReady, push } = useRouter();
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["weatherforecast", query.address],
    queryFn: ({ queryKey }) => fetchWeatherForecast(queryKey[1] as string),
    enabled:
      typeof query.address !== "undefined" &&
      (query.address as string)?.length > 0,
  });

  const handleSearchInputSubmit = async (address: string) => {
    if (address?.length) {
      await push({ query: { address } });
      refetch();
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        {isReady && (
          <SearchInput
            defaultValue={query.address as string}
            onSubmit={handleSearchInputSubmit}
          />
        )}
        {isSuccess && (
          <Stack direction="row" spacing="auto">
            {data.map((period: any) => (
              <Card key={period.name} variant="outlined">
                <CardContent>
                  <Typography>{period.name}</Typography>
                  <Typography>
                    {period.temperature}&nbsp;&deg;{period.temperatureUnit}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
