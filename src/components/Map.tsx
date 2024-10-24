import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { Box } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";
import RouteLine from "./RouteLine";
import MapControlAccordion from "./Accordion";
import RouteAccordion from "./RouteList";
import Settings from "./Settings";
import SkeletonLoader from "./SkeletonLoader";
import { CoordinatesType, PubsType, MapSizeType, ThemeType } from "./types";

export default function Map() {
  const themes: ThemeType = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    sunshine:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    whitewash: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  };

  const [countyValue, setCountyValue] = useState<string>("City of London");
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const [routeCoordinates, setRouteCoordinates] = useState<CoordinatesType>({
    coordinates: [],
  });
  const [eightPubs, setEightPubs] = useState<PubsType[]>([]);
  const [pubCount, setPubCount] = useState(5);
  const [opacityLevel, setOpacityLevel] = useState<number>();
  const [allPubMarkersVisible, setAllPubMarkersVisible] = useState(false);
  const [eightRouteMarkersVisible, setEightRouteMarkersVisible] =
    useState(false);

  const icon = L.icon({ iconUrl: "./images/pubIcon.png", iconSize: [30, 30] });
  const [newPubData, setNewPubData] = useState<PubsType[]>([]);

  const MapComponent = ({ mapSize }: MapSizeType) => {
    const map = useMap();

    useEffect(() => {
      if (mapSize && mapSize.length >= 2) {
        const [latitude, longitude] = mapSize;
        map.setView([latitude, longitude]);
      }
    }, [map, mapSize]);

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchDataCounty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ county: countyValue, limit: 500 }),
        });

        if (response.ok) {
          const data = await response.json();

          setNewPubData(data.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (countyValue) {
      fetchData();
    }
  }, [countyValue]);

  const getRandomPubs = (pubs: PubsType[], pubCoordinates: CoordinatesType) => {
    setEightPubs(pubs);
    setRouteCoordinates(pubCoordinates);
  };

  const getAllMarkerVisibility = () => {
    setAllPubMarkersVisible((prevValue) => !prevValue);
  };

  const getOpacityLevel = (level: number) => {
    setOpacityLevel(level);
  };

  const handleAllMarkersVisibility = () => {
    setEightRouteMarkersVisible((prevValue) => !prevValue);
  };

  const handleThemeMode = (selectedTheme: string) => {
    setCurrentTheme(selectedTheme);
  };

  const getCountyValue = (value: string) => {
    setCountyValue(value);
  };

  const getPubCount = (value: number) => {
    setPubCount(value);
  };

  //set map size and bounds
  const { mapSize, mapDataLoading } = useMemo(() => {
    if (!newPubData) {
      return { mapSize: null, mapDataLoading: true };
    }
  
    const xCoordinates = newPubData.map((item) => item.latitude);
    const yCoordinates = newPubData.map((item) => item.longitude);
  
    const minX = Math.min(...xCoordinates);
    const maxX = Math.max(...xCoordinates);
    const minY = Math.min(...yCoordinates);
    const maxY = Math.max(...yCoordinates);
  
    const bufferX = (maxX - minX) * 0.8;
    const bufferY = (maxY - minY) * 0.8;
  
    const bufferedMinX = minX - bufferX;
    const bufferedMinY = minY - bufferY;
    const bufferedMaxX = maxX + bufferX;
    const bufferedMaxY = maxY + bufferY;
  
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
      return { mapSize: [medianX, medianY], mapDataLoading: false };
    }
  
    return { mapSize: null, mapDataLoading: true };
  }, [newPubData]);

  return (
    <>
      {mapDataLoading ? (
        <SkeletonLoader />
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#83878D",
          }}
        >
          <Box sx={{ flex: "3", minWidth: "320px", maxWidth: "20%" }}>
            <Card
              sx={{
                padding: "8px",
                minHeight: "95vh",
              }}
            >
              <MapControlAccordion
                newPubData={newPubData}
                getRandomPubs={getRandomPubs}
                toggleVisibility={handleAllMarkersVisibility}
                eightRouteMarkersVisible={eightRouteMarkersVisible}
                eightPubs={eightPubs}
                getPubCount={getPubCount}
                pubCount={pubCount}
                getAllMarkerVisibility={getAllMarkerVisibility}
                getCountyValue={getCountyValue}
                allPubMarkersVisible={allPubMarkersVisible}
              />
              <RouteAccordion
                eightPubs={eightPubs}
                eightRouteMarkersVisible={eightRouteMarkersVisible}
              />
              <Settings
                handleThemeMode={handleThemeMode}
                getOpacityLevel={getOpacityLevel}
              />
            </Card>
          </Box>
          <Box
            sx={{
              flex: "7",
              minWidth: "50%",
              maxWidth: "80%",
              minHeight: "95vh",
            }}
          >
            <Card
              sx={{
                padding: "8px",
                height: "95vh",
              }}
            >
              <MapContainer
                center={mapSize as any}
                zoom={14}
                minZoom={12}
                scrollWheelZoom={true}
              >
                <MapComponent  mapSize={mapSize || []} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={themes[currentTheme]}
                  opacity={opacityLevel}
                />
                {eightRouteMarkersVisible && (
                  <RouteLine routeCoordinates={routeCoordinates as any} />
                )}
                {eightRouteMarkersVisible &&
                  eightPubs?.map((pub) => (
                    <Marker
                      key={pub.id}
                      position={[pub.latitude, pub.longitude]}
                      icon={icon}
                    >
                      <Popup>
                        <Box>
                          <h2>{pub.name}</h2>
                          <p>{pub.address}</p>
                          <p>{pub.postcode}</p>
                        </Box>
                      </Popup>
                    </Marker>
                  ))}

                {allPubMarkersVisible &&
                  !eightRouteMarkersVisible &&
                  newPubData?.map((pub: PubsType) => (
                    <Marker
                      key={pub.id}
                      position={[pub.latitude, pub.longitude]}
                      icon={icon}
                    >
                      <Popup>
                        <Box>
                          <h2>{pub.name}</h2>
                          <p>{pub.address}</p>
                          <p>{pub.postcode}</p>
                        </Box>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </Card>
          </Box>
        </Card>
      )}
    </>
  );
}
