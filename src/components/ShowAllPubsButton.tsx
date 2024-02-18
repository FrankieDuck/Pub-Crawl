import React from 'react';
import Button from "@mui/material/Button";

interface ShowAllPubsButtonProps {
  getAllMarkerVisibility: () => void;
}

export default function ShowAllPubsButton({
  getAllMarkerVisibility,
}: ShowAllPubsButtonProps) {
  return (
    <Button
      style={{ width: "150px" }}
      onClick={getAllMarkerVisibility}
      variant="contained"
    >
      Show All
    </Button>
  );
}
