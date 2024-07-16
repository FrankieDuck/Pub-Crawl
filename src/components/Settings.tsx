import React from "react";
import Typography from "@mui/material/Typography";
import "@fortawesome/fontawesome-free/css/all.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpacitySlider from "./OpacitySlider";
interface ThemeButtonsProps {
  handleThemeMode: (selectedTheme: string) => void;
  getOpacityLevel: (level: number) => void;
}

export default function Settings({
  handleThemeMode,
  getOpacityLevel,
}: ThemeButtonsProps) {
  const themes = [
    { name: "light", icon: "fa-regular fa-sun", color: "white" },
    { name: "dark", icon: "fa-regular fa-moon", color: "black" },
    { name: "satellite", icon: "fa-solid fa-satellite", color: "#78c257" },
    { name: "sunshine", icon: "fa-solid fa-spa", color: "#FAEFD3" },
    { name: "whitewash", icon: "fa-brands fa-accusoft", color: "#ff5a5f" },
  ];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ overflowY: "auto" }}>
        <ul className="theme-list">
          {themes.map((theme) => (
            <li
              className="theme-item"
              key={theme.name}
              style={{ "--color": theme.color } as React.CSSProperties}
              onClick={() => handleThemeMode(theme.name)}
            >
              <i className={theme.icon}></i>
            </li>
          ))}
        </ul>
        <OpacitySlider getOpacityLevel={getOpacityLevel} />
      </AccordionDetails>
    </Accordion>
  );
}
