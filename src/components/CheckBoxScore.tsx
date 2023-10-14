import { useState } from "react";
import Rating from "@mui/material/Rating";

export default function CheckBoxScore() {
  const [value, setValue] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
