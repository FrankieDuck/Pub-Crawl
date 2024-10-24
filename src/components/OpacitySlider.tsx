import * as React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { OpacitySliderProps } from "./types";
import { Box } from "@mui/material";

export default function OpacitySlider({ getOpacityLevel }: OpacitySliderProps) {
  const handleChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      getOpacityLevel(value);
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      gap: 2,
      pl: 1, 
      pt: 1.5 
    }}
    >
      <Typography>Opacity</Typography>
      <Slider
        min={0}
        max={1}
        step={0.1}
        defaultValue={1}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChange}
        sx={{  maxWidth: '75%', color: "#33b249" }}
      />
    </Box>
  );
}
