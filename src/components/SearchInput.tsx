import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  defaultValue?: string;
  onSubmit(text: string): void;
}
export default function SearchInput({
  defaultValue,
  onSubmit,
}: SearchInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit((event.target as HTMLInputElement).value);
    }
  };
  return (
    <TextField
      defaultValue={defaultValue}
      placeholder="Search location here..."
      onKeyDown={handleKeyDown}
      variant="outlined"
      margin="dense"
      fullWidth
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  );
}
