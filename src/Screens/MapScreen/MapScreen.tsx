import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/src/Components/Map/Map";
import {
  harareMapRegion,
  searchPropertyLocationTutorialText,
} from "@/src/Utils/Constants";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { IMapCoordinates } from "@/src/Components/Map/Types/MapTypes";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { locationReverseGeoCodingHttpFunc } from "@/src/HttpServices/Mutations/LocationIQ/LocationIQHttpFuncs";
import { useAppSelector, useAppDispatch } from "@/src/Redux/Hooks/Config";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import { numberToString } from "@/src/Utils/Funcs";

const MapScreen = () => {
  const { location } = useAppSelector((state) => state.user.value);
  const [coordinates, setCoordinates] = useState<IMapCoordinates>({
    latitude: location?.lat ? +location.lat : harareMapRegion.latitude,
    longitude: location?.lat ? +location.lon : harareMapRegion.longitude,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationHttpError, setLocationHttpError] = useState<string>("");
  const dipatch = useAppDispatch();
  const { from, propertyType } = useLocalSearchParams();

  const navigateBack = () => {
    if (from === "post property") {
      router.replace({
        pathname: "postproperty",
        params: {
          propertyType,
        },
      });
    }
    if (from === "profile") {
      router.push("/account/profile/location");
    }
  };

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
        lat: numberToString(coordinates.latitude),
        licence: res.data.response.licence,
        lon: numberToString(coordinates.longitude),
        osm_id: res.data.response.osm_id,
        osm_type: res.data.response.osm_type,
        place_id: res.data.response.place_id,
        type: "",
      };
      dipatch(addMapLocation(currentLocation));
      navigateBack();
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
    },
  });

  const handleDone = () => {
    setIsLoading(true);
    reverseGeocodingMutation.mutate({
      lat: coordinates ? numberToString(coordinates?.latitude) : "",
      lon: coordinates ? numberToString(coordinates?.longitude) : "",
    });
  };

  const handleModalCancel = () => {
    setLocationHttpError("");
    navigateBack();
  };

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <Map
          type="get_location"
          region={
            location?.lat
              ? {
                  latitude: +location.lat,
                  longitude: +location.lon,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.03,
                }
              : harareMapRegion
          }
          mapType="hybrid"
          tutorialText={searchPropertyLocationTutorialText}
          handleCloseMap={navigateBack}
          handleDoneFunc={handleDone}
          onDragFunc={setCoordinates}
          doneBtnIsLoading={isLoading}
        />
        <MessageModal
          message="sorry, we could not get your location data, please try again."
          header="Location data retrievial failed!"
          type="error"
          handleCancel={handleModalCancel}
          isModalVisible={locationHttpError ? true : false}
        />
      </SafeAreaView>
    </Screen>
  );
};

export default MapScreen;
