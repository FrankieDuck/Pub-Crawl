import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import locations from "../city.json";
import { Box } from "@mui/material";

interface SearchBarProps {
  getCountyValue: (value: string) => void;
}

export default function SearchBar({ getCountyValue }: SearchBarProps) {
  const handleInputChange = (
    _event: React.ChangeEvent<{}>,
    value: { label: string; value: string } | null
  ) => {
    const selectedLocation = value ? value.label : "";
    getCountyValue(selectedLocation);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      e.preventDefault();
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      getCountyValue(capitalizedValue);
    }
  };

  const defaultLocation = locations.find(
    (location) => location.label === "City of London"
  );

  return (
    <Box>
      <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        onChange={(event, value) => handleInputChange(event, value)}
        onKeyPress={handleEnterPress}
        options={locations}
        renderInput={(params) => <TextField {...params} label="Location" />}
        defaultValue={defaultLocation}
      />
    </Box>
  );
}
