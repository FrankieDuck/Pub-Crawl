import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpacitySlider from "./OpacitySlider";
import ShowRouteButton from "./ShowRouteButton";
import GetRouteButton from "./GetRouteButton";
import ShowAllPubsButton from "./ShowAllPubsButton";

export default function MapControlAccordion({
  pubData,
  getRandomPubs,
  toggleVisibility,
  eightRouteMarkersVisible,
  getOpacityLevel,
  eightPubs,
  getAllMarkerVisibility,
}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Map Controls</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Interact with the map using these controls</Typography>
        </AccordionDetails>
        <OpacitySlider getOpacityLevel={getOpacityLevel} />
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            alignContent: "space-around",
            flexWrap: "wrap",
            paddingBottom: "15px",
          }}
        >
          <GetRouteButton pubData={pubData} getRandomPubs={getRandomPubs} />
          <ShowRouteButton
            toggleVisibility={toggleVisibility}
            eightRouteMarkersVisible={eightRouteMarkersVisible}
            eightPubs={eightPubs}
          />

          <ShowAllPubsButton getAllMarkerVisibility={getAllMarkerVisibility} />
        </div>
      </Accordion>
    </div>
  );
}
