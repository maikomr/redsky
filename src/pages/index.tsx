import React from "react";
import SelectedPeriod from "@/components/SelecedPeriod";
import Temperature from "@/components/Temperature";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

export default function Home() {
  const { query, push } = useRouter();
  const [searchText, setSearchText] = React.useState<string>("");
  const {
    data: periods,
    isSuccess,
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
      push({ query: { address } });
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
            <SelectedPeriod period={periods[1]} />
            <Stack direction="row" spacing="auto">
              {periods.map((period: any) => (
                <Card
                  key={period.name}
                  variant="outlined"
                  sx={{ width: 150, maxHeight: 200 }}
                >
                  <CardContent>
                    <Stack alignItems="center">
                      <Typography variant="body1" gutterBottom>
                        {period.name}
                      </Typography>
                      <Temperature
                        gutterBottom
                        variant="h5"
                        sx={{ fontWeight: "bold" }}
                        value={period.temperature}
                        unit={period.temperatureUnit}
                      />
                      <Typography align="center">
                        {period.shortForecast}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </>
        )}
        {isSuccess && periods.error && (
          <Alert variant="outlined" color="error">
            {periods.error}
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
