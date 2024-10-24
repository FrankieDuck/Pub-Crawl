export interface CoordinatesType {
  coordinates: [number, number][];
}

export interface PubsType {
  id: string;
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
  getAllMarkerVisibility: GetAllMarkerVisibilityType;
  pubCount: number;
  eightPubs: any;
  newPubData: any;
  getPubCount: GetPubCountType;
  eightRouteMarkersVisible: boolean;
  getCountyValue: GetCountyValueType;
  allPubMarkersVisible: boolean
}

export interface MapSizeType {
  mapSize: number[] | null;
}

export interface ThemeType {
  [key: string]: string;
}

export interface GetRouteButtonProps {
  newPubData: PubsType[];
  getRandomPubs: (pubs: PubsType[], pubCoordinates: CoordinatesType) => void;
  toggleVisibility: () => void;
  pubCount: number;
  eightRouteMarkersVisible: boolean;
  allPubMarkersVisible: boolean;
}

export interface OpacitySliderProps {
  getOpacityLevel: GetOpacityLevelType;
}
