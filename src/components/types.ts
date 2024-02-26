export interface CoordinatesType {
  coordinates: [number, number][];
}

export interface PubsType {
  id: number;
  name: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  county: string;
}

export interface GroupedData {
  [key: string]: PubsType[];
}

type GetRandomPubsType = (
  pubs: PubsType[],
  pubCoordinates: CoordinatesType
) => void;
type ToggleVisibilityType = () => void;
type GetOpacityLevelType = (level: number) => void;
type GetPubCountType = (value: number) => void;
type GetAllMarkerVisibilityType = () => void;
type GetCountyValueType = (value: string) => void;

export interface MapControlAccordionProps {
  getRandomPubs: GetRandomPubsType;
  toggleVisibility: ToggleVisibilityType;
  getOpacityLevel: GetOpacityLevelType;
  getAllMarkerVisibility: GetAllMarkerVisibilityType;
  pubCount: number;
  eightPubs: any;
  newPubData: any;
  getPubCount: GetPubCountType;
  eightRouteMarkersVisible: boolean;
  getCountyValue: GetCountyValueType;
}

export interface MapSizeType {
  mapSize: number[];
}

export interface ThemeType {
  [key: string]: string;
}

export interface GetRouteButtonProps {
  newPubData: PubsType;
  getRandomPubs: GetRandomPubsType;
  toggleVisibility: ToggleVisibilityType;
  pubCount: number;
}

export interface OpacitySliderProps {
  getOpacityLevel: GetOpacityLevelType;
}
