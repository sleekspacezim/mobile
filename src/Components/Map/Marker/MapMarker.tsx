import React from "react";
import { Marker } from "react-native-maps";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { IMapCoordinates } from "../Types/MapTypes";
import { primary } from "@/src/Theme/Colors";

type Props = {
  coordinates: IMapCoordinates;
  color?: string;
  onPressFunc?: IVoidFunc;
  draggable?: boolean;
  onDragFunc?: (coords: IMapCoordinates) => void;
};

const MapMarker: React.FC<Props> = ({
  coordinates,
  onPressFunc,
  onDragFunc,
  draggable,
  color,
}) => {
  const [marker, setMarker] = React.useState({
    latitude: -34.397,
    longitude: 150.644,
  });
  return (
    <Marker
      coordinate={coordinates}
      draggable={draggable ? draggable : false}
      onPress={onPressFunc}
      onDragEnd={
        onDragFunc
          ? ({ nativeEvent: { coordinate } }) => onDragFunc(coordinate)
          : undefined
      }
    >
      <MaterialCommunityIcons
        name="map-marker"
        size={32}
        color={color ? color : primary}
      />
    </Marker>
  );
};

export default MapMarker;
