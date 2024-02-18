/* eslint-disable react/prop-types */
import React from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
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

const county = "Aberdeen City";

export async function getStaticProps() {
  const response = await fetch(`http://localhost:3001/pubs?county=${county}`);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
