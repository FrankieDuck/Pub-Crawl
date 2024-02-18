import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface PubCountSelectProps {
    getPubCount: (value: number) => void;
}

const count = [1, 2, 3, 4, 5, 6, 7, 8];

export default function PubCountSelect({ getPubCount }: PubCountSelectProps) {
  const handleChange = (event: any) => {
    getPubCount(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Pubs"
          defaultValue="5"
          // helperText="Select how many pubs to visit"
          onChange={handleChange}
        >
          {count.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
