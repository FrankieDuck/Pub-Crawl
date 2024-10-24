import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxScore from "./CheckBoxScore";

interface RouteAccordionProps {
  eightPubs: { id: string; name: string; address: string; postcode: string }[];
  eightRouteMarkersVisible: boolean;
}

export default function RouteAccordion({
  eightPubs,
  eightRouteMarkersVisible,
}: RouteAccordionProps) {
  const [pubName, setPubName] = useState("");
  const [expanded, setExpanded] = useState(eightRouteMarkersVisible);

  useEffect(() => {
    setExpanded(eightRouteMarkersVisible);
  }, [eightRouteMarkersVisible]);

  const handleRatingClick = (pubName: string) => {
    setPubName(pubName);
  };

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Route</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ overflowY: "auto", maxHeight: "500px" }}>
          {eightPubs?.map((pub) => (
            <Card
              key={pub.id}
              sx={{ mb: 2.5 }}
              onClick={() => handleRatingClick(pub.name)}
            >
              <Typography>{pub.name}</Typography>
              <Typography>{pub.address}</Typography>
              <Typography>{pub.postcode}</Typography>
              <CheckBoxScore pubName={pubName} />
            </Card>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
