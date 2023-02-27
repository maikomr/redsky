import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  const handleSearchInputSubmit = async (text: string) => {
    const addressParam = encodeURIComponent(text.trim().replaceAll(" ", "+"));
    const response = await fetch(`/api/geocode?address=${addressParam}`);
    const data = await response.json();
    console.log(data);
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
        <SearchInput onSubmit={handleSearchInputSubmit} />
        <Typography variant="body1">Hello world!</Typography>
      </Box>
    </Container>
  );
}
