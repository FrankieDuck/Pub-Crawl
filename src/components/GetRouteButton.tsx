import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function GetRouteButton({ pubData, getRandomPubs }) {
  const pickEightPubs = (data, count) => {
    if (count > data.length) {
      console.log("Error: Count cannot be greater than array length.");
      return [];
    }
    const shuffledArray = [...data].sort(() => Math.random() - 0.5);

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
        onClick={() => pickEightPubs(pubData, 8)}
        variant="contained"
        style={{ width: "150px" }}
      >
        Pub Crawl
      </Button>
    </Stack>
  );
}
