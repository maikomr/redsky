import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Temperature from "./Temperature";

interface PeriodsProps {
  periods: object[];
}

export default function Periods({ periods }: PeriodsProps) {
  return (
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
              <Typography align="center">{period.shortForecast}</Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
