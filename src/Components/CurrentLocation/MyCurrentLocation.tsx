import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { dark, gray, light, primary } from "@/src/Theme/Colors";
import Row from "../Row/Row";
import MessageModal from "../Modals/MessageModal";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { numberToString } from "@/src/Utils/Funcs";
import ThemedText from "../ThemedText/ThemedText";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { locationReverseGeoCodingHttpFunc } from "@/src/HttpServices/Mutations/LocationIQ/LocationIQHttpFuncs";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { family, small } from "@/src/Theme/Font";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  isInModal?: boolean;
  closeModal?: IVoidFunc;
  setLocation?: React.Dispatch<React.SetStateAction<ISearchLocation | string>>;
};

const MyCurrentLocation: React.FC<Props> = ({
  isInModal,
  closeModal,
  setLocation,
}) => {
  const [getDeviceLocation, setGetDeviceLocation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationDeviceError, setLocationDeviceError] =
    useState<boolean>(false);
  const [locationHttpError, setLocationHttpError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);
  const dipatch = useAppDispatch();

  const reverseGeocodingMutation = useMutation({
    mutationFn: locationReverseGeoCodingHttpFunc,
    onSuccess: (res) => {
      let currentLocation: ISearchLocation = {
        address: res.data.response.address,
        boundingbox: res.data.response.boundingbox,
        class: "",
        display_address: "",
        display_name: res.data.response.display_name,
        display_place: res.data.response.display_name.split(",")[0],
        lat: res.data.response.lat,
        licence: res.data.response.licence,
        lon: res.data.response.lon,
        osm_id: res.data.response.osm_id,
        osm_type: res.data.response.osm_type,
        place_id: res.data.response.place_id,
        type: "",
      };
      dipatch(addMapLocation(currentLocation));
      if (setLocation) setLocation(currentLocation);
      if (closeModal) closeModal();
    },
    onError: (error: any) => {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setLocationHttpError(error.response?.data?.error);
        } else setLocationHttpError("Something went wrong");
      } else setLocationHttpError("Something went wrong");
    },
    onSettled: () => {
      setIsLoading(false);
      setGetDeviceLocation(false);
    },
  });

  const deviceLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationDeviceError(true);
      if (closeModal) closeModal();
      return;
    }
    try {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      reverseGeocodingMutation.mutate({
        lat: numberToString(latitude),
        lon: numberToString(longitude),
      });
    } catch (error) {
      setIsLoading(false);
      setLocationDeviceError(true);
    }
  };

  useEffect(() => {
    if (getDeviceLocation) {
      setIsLoading(true);
      deviceLocationPermissions();
    }
  }, [getDeviceLocation]);

  const handleCancelDeviceError = () => {
    setGetDeviceLocation(false);
    setLocationDeviceError(false);
  };

  const handleCancelHttpError = () => {
    setGetDeviceLocation(false);
    setLocationHttpError("");
  };

  return (
    <View>
      {isInModal && (
        <TouchableOpacity
          onPress={() => setGetDeviceLocation(true)}
          activeOpacity={activeOpacityOfTouchableOpacity}
          disabled={isLoading}
          style={[
            styles.mediaOption,
            {
              backgroundColor:
                theme === "light" ? light.darkGray : dark.darkGray,
            },
          ]}
        >
          {isLoading ? (
            <ButtonSpinner backGroundColor={primary} />
          ) : (
            <View style={styles.mediaOptionSubContainer}>
              <FontAwesome name="location-arrow" size={32} color={primary} />
              <Text style={styles.mediaOptionText}>current</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {!isInModal && (
        <TouchableOpacity
          onPress={() => setGetDeviceLocation(true)}
          style={{ paddingLeft: isLoading ? 10 : 0 }}
          disabled={isLoading}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          {isLoading ? (
            <ButtonSpinner backGroundColor={primary} />
          ) : (
            <Row style={styles.row}>
              <FontAwesome name="location-arrow" size={24} color={primary} />
              <ThemedText type="regular">use current location</ThemedText>
            </Row>
          )}
        </TouchableOpacity>
      )}
      <MessageModal
        message="sorry, we do not have permission to get your device location, please allow Sleek Space to have access to your location on your device settings."
        header="Permission Denied!"
        type="error"
        handleCancel={handleCancelDeviceError}
        isModalVisible={locationDeviceError}
      />
      <MessageModal
        message="sorry, we could not get your location data, please try again."
        header="Location data retrievial failed!"
        type="error"
        handleCancel={handleCancelHttpError}
        isModalVisible={locationHttpError ? true : false}
      />
    </View>
  );
};

export default MyCurrentLocation;

const styles = StyleSheet.create({
  container: {},
  row: {
    gap: 5,
  },
  mediaOption: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 65,
    borderRadius: 7,
    paddingTop: 6,
  },
  mediaOptionText: {
    fontFamily: family,
    fontSize: small,
    color: gray,
  },
  mediaOptionSubContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
