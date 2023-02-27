import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: 0.5, display: "flex", alignItems: "center" }}>
        <SearchIcon />
      </Box>
      <InputBase placeholder="Search location here..." sx={{ flexGrow: 1 }} />
    </Box>
  );
}
