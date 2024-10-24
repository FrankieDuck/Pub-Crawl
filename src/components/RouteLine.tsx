import React from "react";
import { Polyline } from "react-leaflet";
import { LatLngTuple } from "leaflet";

interface CoordinatesWrapper {
  coordinates: [string, string][];
}

interface RouteLineProps {
  routeCoordinates: CoordinatesWrapper;
}

export default function RouteLine({ routeCoordinates }: RouteLineProps) {
  const convertStringCoordinatesToNumbers = (
    coordinatesObj: CoordinatesWrapper
  ): LatLngTuple[] => {
    return coordinatesObj.coordinates.map((coord) => {
      const [latitude, longitude] = coord;
      return [parseFloat(latitude), parseFloat(longitude)] as LatLngTuple;
    });
  };

  const numericCoordinates = convertStringCoordinatesToNumbers(routeCoordinates);

  return (
    <Polyline pathOptions={{ color: "blue" }} positions={numericCoordinates} />
  );
}
