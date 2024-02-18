import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import Card from "@mui/material/Card";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxScore from "./CheckBoxScore";
import { PubsType } from "./types";

interface RouteAccordionProps {
  eightPubs: PubsType[];
}

export default function RouteAccordion({ eightPubs }: RouteAccordionProps) {
  const [pubName, setPubName] = useState("");

  const handleRatingClick = (pubName: string) => {
    setPubName(pubName);
  };
  return (
    <div>
      <Accordion>
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
              style={{ marginBottom: "20px" }}
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
    </div>
  );
}
