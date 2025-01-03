import { Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, pureWhite } from "@/src/Theme/Colors";
import {
  harareMapRegion,
  searchPropertyLocationTutorialText,
} from "@/src/Utils/Constants";
import MessageModal from "../MessageModal";
import Map from "../../Map/Map";
import { IMapCoordinates } from "../../Map/Types/MapTypes";
import { numberToString } from "@/src/Utils/Funcs";
import { locationReverseGeoCodingHttpFunc } from "@/src/HttpServices/Mutations/LocationIQ/LocationIQHttpFuncs";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";

type Props = {
  isModalOpen: boolean;
  closeModal: IVoidFunc;
};

const MapModal: React.FC<Props> = ({ isModalOpen, closeModal }) => {
  const { location } = useAppSelector((state) => state.user.value);
  const [coordinates, setCoordinates] = useState<IMapCoordinates>({
    latitude: location?.lat ? +location.lat : harareMapRegion.latitude,
    longitude: location?.lat ? +location.lon : harareMapRegion.longitude,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationHttpError, setLocationHttpError] = useState<string>("");
  const dipatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);

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
      closeModal();
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
    closeModal();
  };

  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={closeModal}
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? dark.background : pureWhite },
        ]}
      >
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
          handleCloseMap={closeModal}
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
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
