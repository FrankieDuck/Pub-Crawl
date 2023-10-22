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
    ssr: false, // This line is important. It's what prevents server-side render
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
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
