import * as React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { OpacitySliderProps } from "./types";

export default function OpacitySlider({ getOpacityLevel }: OpacitySliderProps) {
  const handleChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      getOpacityLevel(value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        paddingLeft: "8px",
        paddingBottom: "12px",
      }}
    >
      <Typography>Map Opacity</Typography>
      <Slider
        min={0}
        max={1}
        step={0.1}
        defaultValue={1}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChange}
        style={{ maxWidth: "200px" }}
      />
    </div>
  );
}
