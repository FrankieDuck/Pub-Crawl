import * as React from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ShowRouteButton from "./ShowRouteButton";
import GetRouteButton from "./GetRouteButton";
import ShowAllPubsButton from "./ShowAllPubsButton";
import SearchBar from "./SearchBar";
import PubCountSelect from "./PubCountSelect";
import { MapControlAccordionProps } from "./types";

export default function MapControlAccordion({
  getRandomPubs,
  toggleVisibility,
  eightRouteMarkersVisible,
  eightPubs,
  pubCount,
  getPubCount,
  getAllMarkerVisibility,
  getCountyValue,
  newPubData,
  allPubMarkersVisible,
}: MapControlAccordionProps) {
  return (
    <Box>
      <Accordion>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <Typography>Map Controls</Typography>

          <AccordionDetails>
            <Typography>Interact with the map using these controls</Typography>
          </AccordionDetails>
          <SearchBar getCountyValue={getCountyValue} />
          <PubCountSelect getPubCount={getPubCount} />
          <div
            style={{
              display: "flex",
              gap: "5px",
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <GetRouteButton
              newPubData={newPubData}
              pubCount={pubCount}
              getRandomPubs={getRandomPubs}
              toggleVisibility={toggleVisibility}
              eightRouteMarkersVisible={eightRouteMarkersVisible}
              allPubMarkersVisible={allPubMarkersVisible}
            />
            {/* <ShowRouteButton
            toggleVisibility={toggleVisibility}
            eightRouteMarkersVisible={eightRouteMarkersVisible}
            eightPubs={eightPubs}
          /> */}

            <ShowAllPubsButton
              getAllMarkerVisibility={getAllMarkerVisibility}
              eightRouteMarkersVisible={eightRouteMarkersVisible}
              allPubMarkersVisible={allPubMarkersVisible}
            />
          </div>
        </Box>
      </Accordion>
    </Box>
  );
}
