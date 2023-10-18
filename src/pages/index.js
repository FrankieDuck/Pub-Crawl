import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

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
      <Map data={data} />
    </>
  );
}

const county = "Aberdeen City"; // Replace 'Essex' with the desired county

export async function getStaticProps() {
  // Make the API GET request
  const response = await fetch(`http://localhost:3001/pubs?county=${county}`);
  const data = await response.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
