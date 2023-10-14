import * as React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export default function OpacitySlider({ getOpacityLevel }) {

  const handleChange = (event, newValue) => {
    console.log(newValue); // Log the slider value to the console
    getOpacityLevel(newValue);
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
