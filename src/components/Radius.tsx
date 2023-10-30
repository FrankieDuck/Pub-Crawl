import React from "react";
import { Circle } from "react-leaflet";

interface RadiusProps {
  radiusLevel: number;
}

export default function Radius({radiusLevel}: RadiusProps) {
    
  return (
    <>
      <Circle center={[52.206283, 0.120203]} fillColor="blue" radius={radiusLevel} />
    </>
  );
}
