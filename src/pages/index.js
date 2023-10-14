import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ['latin'] })

const Map = dynamic(
  () => {
    return import("@/components/Map");
  },
  {
    loading: () => <p>A map is loading</p>,
    ssr: false  // This line is important. It's what prevents server-side render
  }
);

export default function Home({ data }) {
  return (
    <>
      <Map data={data}/>
    </>
  )
}
export async function getStaticProps() {
  // Make the API GET request
  const response = await fetch('http://localhost:3001/pubs');
  const data = await response.json();

  return {
    props: {
      data
    }
  };
}