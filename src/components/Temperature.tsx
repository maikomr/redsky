import Typography from "@mui/material/Typography";

interface TemperatureProps {
  value: number;
  unit: string;
  [field: string]: any;
}

export default function Temperature({
  value,
  unit,
  ...rest
}: TemperatureProps) {
  return (
    <Typography {...rest}>
      {value}&nbsp;&deg;{unit}
    </Typography>
  );
}
