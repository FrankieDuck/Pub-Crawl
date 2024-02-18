import React from "react";
import Skeleton from "@mui/material/Skeleton";

const skeleStyle = {
  skeleton: {
    width: "1800px",
    height: "1200px",
    marginTop: "-240px",
    marginLeft: "-325px",
    position: "relative",
    borderRadius: "6px",
  },
};

export default function SkeletonLoader() {
  return <Skeleton sx={skeleStyle.skeleton} animation="wave" />;
}
