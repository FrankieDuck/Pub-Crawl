import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface PubCountSelectProps {
  getPubCount: (value: number) => void;
}

const pubCount = [1, 2, 3, 4, 5, 6, 7, 8];

export default function PubCountSelect({ getPubCount }: PubCountSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getPubCount(Number(event.target.value));
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
        {pubCount.map((count) => (
          <MenuItem key={count} value={count}>
            {count}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
