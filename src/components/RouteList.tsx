import * as React from "react";
import Accordion from "@mui/material/Accordion";
import Card from "@mui/material/Card";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxScore from "./CheckBoxScore";

export default function RouteAccordion({ eightPubs }) {
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
          {/* <Typography>Here is your Pub Crawl! Starting at; </Typography> */}

          {eightPubs?.map((pub) => (
            <Card key={pub.id} style={{ marginBottom: "20px" }}>
              <Typography>{pub.name}</Typography>
              <Typography>{pub.address}</Typography>
              <Typography>{pub.postcode}</Typography>
              <CheckBoxScore />
            </Card>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
