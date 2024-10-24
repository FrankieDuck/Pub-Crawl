import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface ShowRouteButtonProps {
  toggleVisibility: () => void;
  eightRouteMarkersVisible: boolean;
  eightPubs: number | number[];
}

export const selectedButtonStyle = {
  fontSize: 14,
  color: "black",
  backgroundColor: "#E9EBED",
  width: 18, 
};

export const unselectedButtonStyle = {
  fontSize: 14,
  color: "black",
  backgroundColor: "gray",
  width: 18, 
};

export default function ShowRouteButton({
  toggleVisibility,
  eightRouteMarkersVisible,
  eightPubs,
}: ShowRouteButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        sx={{
          ...(eightRouteMarkersVisible
            ? selectedButtonStyle
            : unselectedButtonStyle),
        }}
        onClick={toggleVisibility}
        disabled={(Array.isArray(eightPubs) ? eightPubs.length : 1) <= 0}
      >
        {eightRouteMarkersVisible ? "Hide Route" : "Show Route"}
      </Button>
    </Stack>
  );
}
