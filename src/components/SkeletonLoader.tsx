import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const skeleStyle = {
  skeleton: {
    width: "90%",
    height: "90%",
    borderRadius: "6px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
};

export default function SkeletonLoader() {
  return (
    <Box sx={skeleStyle.container}>
      <Skeleton sx={skeleStyle.skeleton} animation="wave" />
    </Box>
  );
}
