import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import RouteLine from "./RouteLine";
import MapControlAccordion from "./Accordion";
import RouteAccordion from "./RouteList";
import ThemeButtons from "./ThemeButtons";

export default function Map({ data }) {
  const pubData = data.rows;
  console.log(pubData);

  const [themes, setTheme] = useState({
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    sunshine:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    BW: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    whitewash: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  });

  const [currentTheme, setCurrentTheme] = useState("light");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [eightPubs, setEightPubs] = useState([]);
  const [opacityLevel, setOpacityLevel] = useState([]);
  const [allPubMarkersVisible, setAllPubMarkersVisible] = useState(false);
  const [eightRouteMarkersVisible, setEightRouteMarkersVisible] =
    useState(false);

  const icon = L.icon({ iconUrl: "./images/pubIcon.png", iconSize: [30, 30] });
  const position = [57.14621, -2.095969];

  const getRandomPubs = (pubs, pubCoordinates) => {
    setEightPubs(pubs);
    setRouteCoordinates(pubCoordinates);
  };

  const getAllMarkerVisibility = () => {
    setAllPubMarkersVisible((prevValue) => !prevValue);
  };

  const getOpacityLevel = (level) => {
    setOpacityLevel(level);
  };

  const handleAllMarkersVisibility = () => {
    setEightRouteMarkersVisible((prevValue) => !prevValue);
  };

  const handleThemeMode = (selectedTheme) => {
    setCurrentTheme(selectedTheme);
  };

  // const opacityValue = allMarkersVisible ? 0 : 1;

  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "fit-content",
          maxWidth: "2050px",
          paddingRight: "12px",
          paddingLeft: "8px",
          marginLeft: "18px",
          marginTop: "18px",
          paddingBottom: "10px",
          height: "900px",
          backgroundColor: "#586261",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "fit-content",
            marginTop: "10px",
            maxWidth: "335px",
            backgroundColor: "#83878D",
          }}
        >
          <MapControlAccordion
            pubData={pubData}
            getRandomPubs={getRandomPubs}
            toggleVisibility={handleAllMarkersVisibility}
            eightRouteMarkersVisible={eightRouteMarkersVisible}
            handleThemeMode={handleThemeMode}
            theme={currentTheme}
            getOpacityLevel={getOpacityLevel}
            eightPubs={eightPubs}
            getAllMarkerVisibility={getAllMarkerVisibility}
          />
          <RouteAccordion eightPubs={eightPubs} />
          <ThemeButtons handleThemeMode={handleThemeMode} />
        </Card>
        <Card
          sx={{
            padding: "8px",
            minWidth: "1520px",
            maxWidth: "1520px",
            marginLeft: "15px",
            marginTop: "8px",
            marginBottom: "15px",
            height: "882px",
          }}
        >
          <MapContainer
            center={position}
            zoom={14}
            minZoom={12}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={themes[currentTheme]}
              opacity={opacityLevel}
              style={{ height: "550px" }}
            />
            {eightRouteMarkersVisible && (
              <RouteLine routeCoordinates={routeCoordinates} />
            )}

            {eightRouteMarkersVisible &&
              eightPubs?.map((pub) => (
                <Marker
                  key={pub.id}
                  position={[pub.latitude, pub.longitude]}
                  icon={icon}
                >
                  <Popup>
                    <div>
                      <h2>{pub.name}</h2>
                      <p>{pub.address}</p>
                      <p>{pub.postcode}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {allPubMarkersVisible &&
              !eightRouteMarkersVisible &&
              pubData?.map((pub) => (
                <Marker
                  key={pub.id}
                  position={[pub.latitude, pub.longitude]}
                  icon={icon}
                >
                  <Popup>
                    <div>
                      <h2>{pub.name}</h2>
                      <p>{pub.address}</p>
                      <p>{pub.postcode}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </Card>
      </Card>
    </>
  );
}
