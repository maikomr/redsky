import { Box, Container, Typography } from "@mui/material";

export default function Home() {
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
        <Typography variant="h4" gutterBottom>
          RedSky
        </Typography>
        <Typography variant="body1">Hello world!</Typography>
      </Box>
    </Container>
  );
}
