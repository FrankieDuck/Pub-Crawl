import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import locations from "../city.json";

export default function BasicTextFields({ getCountyValue }) {
  const handleInputChange = (e, newValue) => {
    const selectedLocation = newValue.label;
    console.log("the new selectedLocation", selectedLocation);
    getCountyValue(selectedLocation);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      console.log(value);
      e.preventDefault();
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

      getCountyValue(capitalizedValue);
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onChange={handleInputChange}
        onKeyPress={handleEnterPress}
        options={locations}
        sx={{ paddingLeft: "5px", width: 300 }}
        renderInput={(params) => <TextField {...params} label="Locations" />}
      />
    </>
  );
}
