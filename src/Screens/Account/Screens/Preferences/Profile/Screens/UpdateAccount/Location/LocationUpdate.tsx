import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import LocationInputField from "@/src/Components/LocationInputField/LocationInputField";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  emptyLocation,
  MAX_INPUT_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import {
  convertLocationToSearchableFormat,
  getLocation,
} from "@/src/Utils/Funcs";
import { family } from "@/src/Theme/Font";
import MyCurrentLocation from "@/src/Components/CurrentLocation/MyCurrentLocation";
import Row from "@/src/Components/Row/Row";
import { primary, red } from "@/src/Theme/Colors";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  createUserLocationHttpFunc,
  updateUserLocationHttpFunc,
} from "@/src/HttpServices/Mutations/User/LocationHttpFunctions";
import { fetchUserData } from "../../../Hooks/fetchUser";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import RegularText from "@/src/Components/RegularText/RegularText";

const LocationUpdate: INoPropsReactComponent = () => {
  const user = useAppSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);
  const [
    unSelectedSuggestedLocationsError,
    setUnSelectedSuggestedLocationsError,
  ] = useState<boolean>(false);
  const mapLocation = useAppSelector((state) => state.mapLocation.value);
  const [location, setLocation] = useState<ISearchLocation | string>(
    user.location
      ? convertLocationToSearchableFormat(user.location)
      : mapLocation
  );
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  useUpdateUser(userData);

  useEffect(() => {
    if (mapLocation.lat && mapLocation.lon) {
      setLocation(mapLocation);
    }
  }, [mapLocation]);

  useEffect(() => {
    if (unSelectedSuggestedLocationsError) {
      setTimeout(() => setUnSelectedSuggestedLocationsError(false), 9000);
    }
  }, [unSelectedSuggestedLocationsError]);

  const locationCreationMutation = useMutation({
    mutationFn: createUserLocationHttpFunc,
    onSuccess(_data) {
      fetchUserData(
        user,
        setUserData,
        setIsLoading,
        setOpenSuccessModal,
        setUpdateError
      );
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else setUpdateError("Something went wrong");
    },
  });

  const locationUpdateMutation = useMutation({
    mutationFn: updateUserLocationHttpFunc,
    onSuccess(_data) {
      fetchUserData(
        user,
        setUserData,
        setIsLoading,
        setOpenSuccessModal,
        setUpdateError
      );
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else setUpdateError("Something went wrong");
    },
    onSettled: () => dispatch(addMapLocation(emptyLocation)),
  });

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    router.back();
  };

  const handleUpdate = () => {
    if (user.location?.id === 0) {
      if (typeof location === "object" || location === "") {
        setIsLoading(true);
        locationCreationMutation.mutate({
          location: {
            displayName: location ? getLocation(location, true) : "",
            lat: location ? location.lat : "",
            lon: location ? location.lon : "",
            userId: user.id,
            city: location ? location.address.city : "",
            country: location ? location.address.country : "",
            countryCode: location ? location.address.country_code : "",
            county: location ? location.address.county : "",
            province: location ? location.address.state : "",
            boundingbox: location ? location.boundingbox : [],
            surburb: location ? location.address.surburb : "",
          },
          accessToken: user.accessToken,
        });
      } else {
        setUnSelectedSuggestedLocationsError(true);
      }
    } else {
      if (typeof location === "object" || location === "") {
        if (
          typeof location === "object" &&
          location.lat === user.location?.lat
        ) {
          setUpdateError(
            "your location is still the same, please search for another location to update your account."
          );
        } else {
          setIsLoading(true);
          locationUpdateMutation.mutate({
            location: {
              displayName: location ? getLocation(location, true) : "",
              lat: location ? location.lat : "",
              lon: location ? location.lon : "",
              userId: user.id,
              city: location ? location.address.city : "",
              country: location ? location.address.country : "",
              countryCode: location ? location.address.country_code : "",
              county: location ? location.address.county : "",
              province: location ? location.address.state : "",
              boundingbox: location ? location.boundingbox : [],
              surburb: location ? location.address.surburb : "",
              id: user.location?.id,
            },
            accessToken: user.accessToken,
          });
        }
      } else {
        setUnSelectedSuggestedLocationsError(true);
      }
    }
  };

  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
          <View
            style={[
              styles.inputWrapper,
              { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
            ]}
          >
            <LocationInputField
              placeHolder="enter your location"
              showLabel
              setLocation={setLocation}
              location={location}
            />
            {unSelectedSuggestedLocationsError && (
              <Text style={styles.errorText}>
                please press the search button on your keyboard and select
                suggested locations, this helps with accuracy.
              </Text>
            )}
            <Row style={styles.row}>
              <MyCurrentLocation setLocation={setLocation} />
              <TouchableOpacity
                style={styles.mapContainer}
                onPress={() =>
                  router.push({
                    pathname: "/map",
                    params: {
                      from: "profile",
                    },
                  })
                }
              >
                <Feather name="map" size={20} color={primary} />
                <ThemedText type="regular">use map</ThemedText>
              </TouchableOpacity>
            </Row>
            <View style={{ width: "100%" }}>
              <RegularText style={{ marginTop: -10 }}>
                We encourage you to use the map for better accuracy.
              </RegularText>
            </View>
          </View>
          <View
            style={[
              styles.btnContainer,
              {
                width:
                  width > BUTTON_SIZE_SCREEN_BREAK_POINT
                    ? BUTTON_MAX_WIDTH
                    : "100%",
              },
            ]}
          >
            <CustomButton
              title={isLoading ? "loading" : "update"}
              onPressFunc={handleUpdate}
              isDisabled={isLoading}
            />
          </View>
          <MessageModal
            isModalVisible={openSuccessModal}
            header="Update Successful"
            message="your location was updated successfully."
            type="success"
            handleCancel={closeSuccessModal}
          />
          <MessageModal
            isModalVisible={updateError ? true : false}
            header="Update Failed"
            message={updateError}
            type="error"
            handleCancel={() => setUpdateError("")}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default LocationUpdate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 20,
    alignItems: "center",
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
  errorText: {
    fontFamily: family,
    color: red,
    fontSize: 13,
    marginTop: -19,
  },
  row: { width: "100%", justifyContent: "space-between", marginTop: -10 },
  mapContainer: {
    flexDirection: "row",
    gap: 5,
  },
  btnContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
