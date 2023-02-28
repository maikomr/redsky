import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Temperature from "./Temperature";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

interface PeriodsProps {
  periods: object[];
}

export default function Periods({ periods }: PeriodsProps) {
  const theme = useTheme();
  const { query, push } = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      direction={matches ? "row" : "column"}
      spacing={matches ? "auto" : 1}
    >
      {periods.map((period: any) => (
        <Paper
          key={period.name}
          variant="outlined"
          sx={{
            width: matches ? 150 : "100%",
            maxHeight: 200,
            padding: 2,
            "&:hover": {
              cursor: "pointer",
              backgroundColor: theme.palette.secondary.main,
            },
          }}
          onClick={() => push({ query: { ...query, period: period.number } })}
        >
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
            <Typography align="center">{period.shortForecast}</Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
