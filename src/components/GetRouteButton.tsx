import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GetRouteButtonProps, PubsType } from "./types";

export default function GetRouteButton({
  newPubData,
  getRandomPubs,
  toggleVisibility,
  pubCount,
  eightRouteMarkersVisible,
  allPubMarkersVisible,
}: GetRouteButtonProps) {
  const pickEightPubs = (data: PubsType[], count: number) => {
    if (count > data.length) {
      return [];
    }

    const shuffledArray = [...data].sort(() => Math.random() - 0.5);

    const coordinatesArray = shuffledArray
      .slice(0, count)
      .map((pub) => [pub.latitude, pub.longitude]);

    coordinatesArray.sort((a, b) => {
      const latitudeA = a[0];
      const latitudeB = b[0];
      const longitudeA = a[1];
      const longitudeB = b[1];

      if (latitudeA !== latitudeB) {
        return latitudeA - latitudeB;
      } else {
        return longitudeA - longitudeB;
      }
    });

    getRandomPubs(
      shuffledArray.slice(0, count) as any,
      coordinatesArray as any
    );
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        disabled={allPubMarkersVisible}
        onClick={() => {
          pickEightPubs(newPubData as any, pubCount);
          toggleVisibility();
        }}
        variant="contained"
        style={{ width: "150px", backgroundColor: "#33b249" }}
      >
        {eightRouteMarkersVisible ? "Clear" : "  Pub Crawl"}
      </Button>
    </Stack>
  );
}
