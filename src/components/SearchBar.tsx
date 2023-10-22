import React from "react";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ getCountyValue }) {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const inputValue = e.target.value;
      const capitalizedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

      e.preventDefault();
      getCountyValue(capitalizedValue);
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" onKeyPress={onKeyPress} />
    </form>
  );
}
