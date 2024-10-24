import React from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

interface CheckBoxScoreProps {
  pubName: string;
}

export default function CheckBoxScore({ pubName }: CheckBoxScoreProps) {
  const [value, setValue] = useState<number | null>(0);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleRatingChange = (
    _event: React.SyntheticEvent | Event,
    newValue: number | null,
    pubName: string
  ) => {
    setValue(newValue);
    const randomUserIdentifier = generateUUID();

    const ratingData = {
      user_identifier: randomUserIdentifier,
      pub_id: pubName,
      rating_value: newValue,
    };

    axios
      .post("http://localhost:3001/ratings", { rating: ratingData })
      .then((response) => {
        console.log("Rating sent successfully", response.data);
      })
      .catch((error) => {
        console.error("Error sending rating to the API", error);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleRatingChange(event, newValue, pubName);
        }}
      />
    </div>
  );
}
