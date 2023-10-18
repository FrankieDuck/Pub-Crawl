import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  const [textFieldValue, setTextFieldValue] = useState("");
  console.log(textFieldValue);

  const handleTextFieldChange = (e) => {
    setTextFieldValue(e.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      onChange={handleTextFieldChange}
      value={textFieldValue}
    />
  );
}
