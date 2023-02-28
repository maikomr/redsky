"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchInput from "@/components/SearchInput";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isReady && (
          <SearchInput
            defaultValue={query.address as string}
            onSubmit={handleSearchInputSubmit}
          />
        )}
        <Typography>{isSuccess && JSON.stringify(data)}</Typography>
      </Box>
    </Container>
  );
}
