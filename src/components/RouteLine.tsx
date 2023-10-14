import React from "react";
import { Polyline } from "react-leaflet";

export default function RouteLine({ routeCoordinates }) {
  return (
    <Polyline pathOptions={{ color: "blue" }} positions={routeCoordinates} />
  );
}
