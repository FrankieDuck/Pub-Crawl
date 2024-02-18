import React from "react";
import { Polyline } from "react-leaflet";
import { LatLngTuple } from "leaflet";

type CoordinatesType = [string, string][];
interface RouteLineProps {
  routeCoordinates: CoordinatesType;
}

export default function RouteLine({ routeCoordinates }: RouteLineProps) {
  const convertStringCoordinatesToNumbers = (
    coordinates: CoordinatesType
  ): LatLngTuple[] => {
    return coordinates.map((coord) => {
      const [latitude, longitude] = coord as [string, string];
      const parsedLatitude = parseFloat(latitude as string);
      const parsedLongitude = parseFloat(longitude as string);
  
      if (!isNaN(parsedLatitude) && !isNaN(parsedLongitude)) {
        return [parsedLatitude, parsedLongitude];
      } else {
        return [0, 0]; 
      }
    });
  };

  const numericCoordinates =
    convertStringCoordinatesToNumbers(routeCoordinates);
  return (
    <Polyline pathOptions={{ color: "blue" }} positions={numericCoordinates} />
  );
}
