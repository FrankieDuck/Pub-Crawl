import * as React from "react";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";

export default function RadiusSlider({ getRadiusLevel, handleRadiusVisibility }) {
  const handleChange = (event, newValue) => {
    getRadiusLevel(newValue);
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
      <Button variant="contained" onClick={handleRadiusVisibility}>Radius Size</Button>
      <Slider
        min={1000}
        max={10000}
        step={50}
        defaultValue={1}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChange}
        style={{ maxWidth: "200px" }}
      />
    </div>
  );
}
