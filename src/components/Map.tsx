import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import RouteLine from "./RouteLine";
import MapControlAccordion from "./Accordion";
import RouteAccordion from "./RouteList";
import ThemeButtons from "./ThemeButtons";
import SkeletonLoader from "./SkeletonLoader";
import { useSnackbar } from "notistack";

export default function Map({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const pubData = data.rows;

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
  const [countyValue, setCountyValue] = useState("Cambridge");
  const [currentTheme, setCurrentTheme] = useState("light");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [eightPubs, setEightPubs] = useState([]);
  const [opacityLevel, setOpacityLevel] = useState([]);
  const [allPubMarkersVisible, setAllPubMarkersVisible] = useState(false);
  const [eightRouteMarkersVisible, setEightRouteMarkersVisible] =
    useState(false);

  const [mapSize, setMapSize] = useState([0, 0]);
  const [mapBounds, setMapBounds] = useState([[0, 0]]);

  const [mapDataLoading, setMapDataLoading] = useState(true);
  const icon = L.icon({ iconUrl: "./images/pubIcon.png", iconSize: [30, 30] });
  const [newPubData, setNewPubData] = useState();

  const MapComponent = ({ mapSize }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapSize);
    }, [mapSize]);

    return null;
  };

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

  const getCountyValue = (value) => {
    setCountyValue(value);
  };

  const pubCrawlPressed = () => {
    if (eightPubs) {
      setEightRouteMarkersVisible((prevValue) => !prevValue);
    }
  };
  // const opacityValue = allMarkersVisible ? 0 : 1;

  //fetch new pub data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/pubs?county=${countyValue}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newData = await response.json();
        if (newData.rows.length === 0) {
          enqueueSnackbar(
            "Please enter a valid city or town to see your results",
            {
              variant: "warning",
            }
          );
        }
        setNewPubData(newData);
      } catch (error) {}
    }

    fetchData();
  }, [countyValue]);

  //set map size and bounds
  useEffect(() => {
    if (newPubData) {
      const xCoordinates = newPubData?.rows.map((item) => item.latitude);
      const yCoordinates = newPubData?.rows.map((item) => item.longitude);

      const minX = Math.min(...xCoordinates);
      const maxX = Math.max(...xCoordinates);
      const minY = Math.min(...yCoordinates);
      const maxY = Math.max(...yCoordinates);

      const bufferX: number = (maxX - minX) * 0.8;
      const bufferY: number = (maxY - minY) * 0.8;

      //to set the map bounds rather than the size
      const bufferedMinX = minX - bufferX;
      const bufferedMinY = minY - bufferY;
      const bufferedMaxX = maxX + bufferX;
      const bufferedMaxY = maxY + bufferY;

      //to set the map size below
      const medianX = (minX + maxX) / 2;
      const medianY = (minY + maxY) / 2;

      const isMapSizeValid = [medianY, medianX].every(
        (coord) =>
          !isNaN(coord) &&
          isFinite(coord) &&
          coord !== null &&
          coord !== Infinity
      );

      const isMapBoundsValid = [
        [bufferedMinY, bufferedMinX],
        [bufferedMaxY, bufferedMaxX],
      ].every((bounds) =>
        bounds.every(
          (coord) =>
            !isNaN(coord) &&
            isFinite(coord) &&
            coord !== null &&
            coord !== Infinity
        )
      );

      if (isMapSizeValid && isMapBoundsValid) {
        setMapBounds([
          [bufferedMinX, bufferedMinY],
          [bufferedMaxX, bufferedMaxY],
        ]);
        setMapSize([medianX, medianY]);
        setMapDataLoading(false);
      }
    }
  }, [newPubData]);

  return (
    <>
      {mapDataLoading ? (
        <SkeletonLoader />
      ) : (
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
              newPubData={newPubData}
              getRandomPubs={getRandomPubs}
              toggleVisibility={handleAllMarkersVisibility}
              eightRouteMarkersVisible={eightRouteMarkersVisible}
              handleThemeMode={handleThemeMode}
              theme={currentTheme}
              getOpacityLevel={getOpacityLevel}
              eightPubs={eightPubs}
              getAllMarkerVisibility={getAllMarkerVisibility}
              getCountyValue={getCountyValue}
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
              center={mapSize}
              // maxBounds={mapBounds}
              zoom={14}
              minZoom={12}
              scrollWheelZoom={true}
            >
              <MapComponent mapSize={mapSize} />
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
                newPubData.rows?.map((pub) => (
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
      )}
    </>
  );
}
