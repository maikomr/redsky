import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
            <Typography align="center">
              <strong>Wind Speed:</strong>&nbsp;{period.windSpeed},&nbsp;
              {period.windDirection}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center">
              <strong>Precipitation:</strong>&nbsp;
              {Number(period.probabilityOfPrecipitation.value)}%
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center">
              <strong>Humidity</strong>:&nbsp;
              {Number(period.relativeHumidity.value)}%
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
