import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function GetRouteButton({ newPubData, getRandomPubs }) {
  const pickEightPubs = (data, count) => {
    if (count > data.length) {
      return [];
    }
    console.log("this is the data", data);
    const shuffledArray = [...data.rows].sort(() => Math.random() - 0.5);

    const coordinatesArray = shuffledArray
      .slice(0, count)
      .map((pub) => [parseFloat(pub.latitude), parseFloat(pub.longitude)]);

    coordinatesArray.sort((a, b) => {
      const latitudeA = a[0];
      const latitudeB = b[0];
      const longitudeA = a[1];
      const longitudeB = b[1];

      // Compare first by latitude and then by longitude
      if (latitudeA !== latitudeB) {
        return latitudeA - latitudeB;
      } else {
        return longitudeA - longitudeB;
      }
    });

    getRandomPubs(shuffledArray.slice(0, count), coordinatesArray);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={() => pickEightPubs(newPubData, 8)}
        variant="contained"
        style={{ width: "150px" }}
      >
        Pub Crawl
      </Button>
    </Stack>
  );
}
