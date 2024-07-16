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
    <Box sx={{ width: "auto" }}>
      <TextField
        id="outlined-select-count"
        select
        label="Pubs"
        defaultValue="5"
        onChange={handleChange}
        fullWidth
      >
        {count.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
