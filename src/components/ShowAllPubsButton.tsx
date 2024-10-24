import React from "react";
import Button from "@mui/material/Button";

interface ShowAllPubsButtonProps {
  getAllMarkerVisibility: () => void;
  allPubMarkersVisible: boolean;
  eightRouteMarkersVisible: boolean;
}

export default function ShowAllPubsButton({
  getAllMarkerVisibility,
  allPubMarkersVisible,
  eightRouteMarkersVisible,
}: ShowAllPubsButtonProps) {
  return (
    <Button
      disabled={eightRouteMarkersVisible}
      sx={{ width: "150px", backgroundColor: "#33b249" }}
      onClick={getAllMarkerVisibility}
      variant="contained"
    >
      {allPubMarkersVisible ? "Hide All" : "Show All"}
    </Button>
  );
}
