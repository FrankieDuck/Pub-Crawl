/* eslint-disable react/prop-types */
import React from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import fetchDataFromDB from "./api/pubs";
import { SnackbarProvider } from "notistack";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const dynamics = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

const Map = dynamic(
  () => {
    return import("@/components/Map");
  },
  {
    loading: () => (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <CircularProgress />
        <p>A map is loading</p>
      </Box>
    ),
    ssr: false,
  }
);

export default function Home({ data }) {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={2000}
        maxSnack={1}
      >
        <Map data={data} />
      </SnackbarProvider>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const data = await fetchDataFromDB();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        data: [],
      },
    };
  }
}
