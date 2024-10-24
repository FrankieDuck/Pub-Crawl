import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
} from '@mui/material';
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
    { name: "Light", icon: "fa-regular fa-sun", color: "#FFD700" },
    { name: "Dark", icon: "fa-regular fa-moon", color: "black" },
    { name: "Satellite", icon: "fa-solid fa-satellite", color: "#33b249" },
    { name: "Sunshine", icon: "fa-solid fa-spa", color: "#FFD700" }, 
    { name: "Whitewash", icon: "fa-brands fa-accusoft", color: "#ff5a5f" },
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
    <AccordionDetails sx={{ overflowY: "auto" }}>
      <List>
        
        {themes.map((theme) => (
          <ListItem 
            button 
            key={theme.name}
            onClick={() => handleThemeMode(theme.name)}
            sx={{ 
              color: theme.color,
              '&:hover': {
                backgroundColor: `${theme.color}22`,
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <i className={theme.icon}></i>
            </ListItemIcon>
            <ListItemText primary={theme.name} />
          </ListItem>
        ))}
      </List>
      <OpacitySlider getOpacityLevel={getOpacityLevel} />
    </AccordionDetails>
  </Accordion>
  );
}
