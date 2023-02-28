import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Temperature from "./Temperature";

interface SelectedPeriodProps {
  period: any;
}

export default function SelectedPeriod({ period }: SelectedPeriodProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">{period.name}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography>
              {new Date(period.startTime).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={6}>
            <Temperature
              variant="h1"
              align="center"
              value={period.temperature}
              unit={period.temperatureUnit}
            />
          </Grid>
          <Grid item xs={12} marginBottom={6}>
            <Typography align="center">{period.detailedForecast}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Image
                src="/wind-icon.svg"
                alt="Wind icon"
                width={24}
                height={24}
                priority
              />
              <Typography align="center">
                {period.windSpeed},&nbsp;
                {period.windDirection}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/cloud-rain-icon.svg"
                alt="Precipitation icon"
                width={24}
                height={24}
                priority
              />
              <Typography align="center">
                {Number(period.probabilityOfPrecipitation.value)}%
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image
                src="/water-drop-teardrop-icon.svg"
                alt="Humidity icon"
                width={24}
                height={24}
                priority
              />
              <Typography align="center">
                {Number(period.relativeHumidity.value)}%
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
