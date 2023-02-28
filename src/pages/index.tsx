import React from "react";
import SelectedPeriod from "@/components/SelectedPeriod";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Periods from "@/components/Periods";
import Skeleton from "@mui/material/Skeleton";
import Copyright from "@/components/Copyright";

export default function Home() {
  const { query, push } = useRouter();
  const [searchText, setSearchText] = React.useState<string>("");
  const {
    data: periods,
    isSuccess,
    isLoading,
    isInitialLoading,
  } = useQuery({
    queryKey: ["weatherforecast", query.address],
    queryFn: async ({ queryKey }) => {
      const address = queryKey[1] as string;
      const addressParam = encodeURI(address.replaceAll(" ", "+"));
      const response = await fetch(
        `/api/weatherforecast?address=${addressParam}`
      );
      return response.json();
    },
    enabled: Boolean(query.address),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const address = (event.target as HTMLInputElement).value;
    if (event.key === "Enter" && address) {
      push({ query: { ...query, address } });
    }
  };

  React.useEffect(() => {
    if (query.address && isInitialLoading) {
      setSearchText(query.address as string);
    }
  }, [query.address, isInitialLoading]);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <TextField
          value={searchText}
          placeholder="Search location here..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        {isSuccess && !periods.error && (
          <>
            <SelectedPeriod
              period={
                periods.find(
                  (period: any) =>
                    period.number === parseInt(query.period as string)
                ) || periods[0]
              }
            />
            <Periods periods={periods} />
          </>
        )}
        {isLoading && (
          <>
            <Skeleton variant="rectangular" sx={{ minHeight: "300px" }} />
            <Stack direction="row" spacing="auto">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton
                  key={`loading-card-${index}`}
                  variant="rectangular"
                  sx={{ width: 150, height: 200 }}
                />
              ))}
            </Stack>
          </>
        )}
        {isSuccess && periods.error && (
          <Alert variant="outlined" color="error">
            {periods.error}
          </Alert>
        )}
        <Copyright />
      </Stack>
    </Container>
  );
}
