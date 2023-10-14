import React from "react";
import Card from "@mui/material/Card";
import "@fortawesome/fontawesome-free/css/all.css";

export default function ThemeButtons({ handleThemeMode }) {
  const themes = [
    { name: "light", icon: "fa-regular fa-sun", color: "white" },
    { name: "dark", icon: "fa-regular fa-moon", color: "black" },
    { name: "satellite", icon: "fa-solid fa-satellite", color: "#78c257" },
    { name: "sunshine", icon: "fa-solid fa-spa", color: "#FAEFD3" },
    { name: "B&W", icon: "fa-solid fa-circle-half-stroke", color: "#ff9000" },
    { name: "whitewash", icon: "fa-brands fa-accusoft", color: "#ff5a5f" },
  ];

  return (
    <Card style={{ paddingBottom: "12px", background: "#c5cad1" }}>
      <ul>
        {themes.map((theme) => (
          <li
            key={theme.name}
            style={{ "--color": theme.color }}
            onClick={() => handleThemeMode(theme.name)}
          >
            <i className={theme.icon}></i>
          </li>
        ))}
      </ul>
    </Card>
  );
}
