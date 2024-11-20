import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { MapType, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IMapCoordinates, IMapRegion } from "./Types/MapTypes";
import MapMarker from "./Marker/MapMarker";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  dark,
  gray,
  light,
  primary,
  pureWhite,
  white,
} from "@/src/Theme/Colors";
import { family, medium, small } from "@/src/Theme/Font";
import {
  activeOpacityOfTouchableOpacity,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import ButtonSpinner from "../Spinners/ButtonSpinner";

type Props = {
  type: "get_location" | "property_locations";
  region: IMapRegion;
  tutorialText?: string;
  mapType?: MapType;
  doneBtnIsLoading?: boolean;
  handleCloseMap?: IVoidFunc;
  setLocation?: () => void;
  onDragFunc?: (coords: IMapCoordinates) => void;
  handleDoneFunc?: IVoidFunc;
};

const Map: React.FC<Props> = ({
  type,
  region,
  onDragFunc,
  handleCloseMap,
  handleDoneFunc,
  tutorialText,
  doneBtnIsLoading,
  mapType,
}) => {
  const [showGetLocationTutorial, setShowGetLocationTutorial] =
    useState<boolean>(true);
  const { width } = useWindowDimensions();
  const mapRef = useRef<MapView | undefined>(undefined);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.animateCamera(
          {
            center: {
              latitude: region.latitude,
              longitude: region.longitude,
            },
            pitch: 2,
            zoom: 18,
          },
          { duration: 2000 }
        );
      }, 500);
    }
  }, [mapRef.current, region.latitude, region.longitude]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleCloseMap}
        style={styles.closeMap}
        activeOpacity={activeOpacityOfTouchableOpacity}
      >
        <MaterialCommunityIcons name="window-close" size={24} color="black" />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType={mapType ? mapType : "hybrid"}
        ref={mapRef as React.LegacyRef<MapView>}
      >
        {type === "get_location" && (
          <MapMarker
            draggable={true}
            onDragFunc={onDragFunc}
            coordinates={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        )}
      </MapView>
      {type === "get_location" && showGetLocationTutorial && (
        <View
          style={[
            styles.infoOverLay,
            { width: width > SCREEN_BREAK_POINT ? 400 : "65%" },
          ]}
        >
          <Text style={[styles.hearderTextStyle, { color: dark.background }]}>
            Tutorial
          </Text>
          <Text style={[styles.textStyle, { color: dark.background }]}>
            {tutorialText}
          </Text>
          <TouchableOpacity
            style={[
              styles.infoOverLayCloseBtn,
              { width: width > BUTTON_SIZE_SCREEN_BREAK_POINT ? 250 : "90%" },
            ]}
            onPress={() => setShowGetLocationTutorial(false)}
            activeOpacity={activeOpacityOfTouchableOpacity}
          >
            <Text style={[styles.textStyle, { color: primary }]}>close</Text>
          </TouchableOpacity>
        </View>
      )}
      {type === "get_location" && (
        <TouchableOpacity
          style={styles.btnOverLay}
          onPress={handleDoneFunc}
          disabled={doneBtnIsLoading}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          {doneBtnIsLoading ? (
            <ButtonSpinner backGroundColor={white} />
          ) : (
            <Text style={[styles.textStyle, { color: white }]}>done</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeMap: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: light.darkGray,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  infoOverLay: {
    position: "absolute",
    backgroundColor: light.darkGray,
    alignItems: "center",
    justifyContent: "center",
    color: gray,
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
    top: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  infoOverLayCloseBtn: {
    backgroundColor: pureWhite,
    borderRadius: 7,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: primary,
  },
  btnOverLay: {
    position: "absolute",
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    color: gray,
    borderRadius: 10,
    bottom: 10,
    alignSelf: "center",
    height: 40,
    width: 190,
  },
  hearderTextStyle: {
    fontFamily: family,
    fontSize: medium,
    fontWeight: "bold",
  },
  textStyle: {
    fontFamily: family,
    fontSize: small,
  },
});
