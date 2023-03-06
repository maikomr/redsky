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
import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";

export default function Home() {
  const { query, push } = useRouter();
  const [searchText, setSearchText] = React.useState<string>("");
  const [numberOfDays, setNumberOfDays] = React.useState<number>(7);

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

  const selectedPeriod =
    periods &&
    (periods
      .slice(0, numberOfDays)
      .find(
        (period: any) => period.number === parseInt(query.period as string)
      ) ||
      periods[0]);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Stack direction="row" alignItems="center" spacing={1}>
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
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="number-of-days-select">Number Of Days</InputLabel>
            <Select
              id="number-of-days-select"
              value={numberOfDays}
              label="Number of Days"
              onChange={(e) => setNumberOfDays(e.target.value as number)}
            >
              {Array.from({ length: 7 }, (v: number, index) => (
                <MenuItem value={index + 1}>{index + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {isSuccess && !periods.error && (
          <>
            <SelectedPeriod period={selectedPeriod} />
            <Periods periods={periods} numberOfDays={numberOfDays} />
          </>
        )}
        {isLoading && (
          <>
            <Skeleton variant="rectangular" sx={{ minHeight: 300 }} />
            <Stack direction="row" spacing="auto">
              {Array.from({ length: numberOfDays }).map((_, index) => (
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
