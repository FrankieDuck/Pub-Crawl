import Button from "@mui/material/Button";

export default function ShowAllPubsButton({ getAllMarkerVisibility }) {
  return (
    <Button style={{ width: "150px"}} onClick={getAllMarkerVisibility} variant="contained">
      Show All
    </Button>
  );
}
