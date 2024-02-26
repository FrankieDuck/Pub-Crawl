/* eslint-disable react/prop-types */
import React from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { GET } from "./api/pubs";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

const Map = dynamic(
  () => {
    return import("@/components/Map");
  },
  {
    loading: () => <p>A map is loading</p>,
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
    const data = await GET();
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
