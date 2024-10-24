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

    const coordinatesArray: [number, number][] = shuffledArray
      .slice(0, count)
      .map((pub) => [pub.latitude, pub.longitude]);

    coordinatesArray.sort((a, b) => {
      const [latitudeA, longitudeA] = a;
      const [latitudeB, longitudeB] = b;

      if (latitudeA !== latitudeB) {
        return latitudeA - latitudeB;
      } else {
        return longitudeA - longitudeB;
      }
    });

    getRandomPubs(
      shuffledArray.slice(0, count),
      { coordinates: coordinatesArray }
    );
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        disabled={allPubMarkersVisible}
        onClick={() => {
          pickEightPubs(newPubData, pubCount);
          toggleVisibility();
        }}
        variant="contained"
        style={{ width: "150px", backgroundColor: "#33b249" }}
      >
        {eightRouteMarkersVisible ? "Clear" : "Pub Crawl"}
      </Button>
    </Stack>
  );
}