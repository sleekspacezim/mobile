import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import { dark, pureWhite, red } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import {
  addFavoriteCommercialForSalePropertyHttpFunc,
  addFavoriteCommercialRentalPropertyHttpFunc,
  addFavoriteResidentialRentalPropertyHttpFunc,
  addFavoriteResidentialForSalePropertyHttpFunc,
  addLandFavoritePropertyHttpFunc,
  addStandFavoritePropertyHttpFunc,
  removeFavoriteCommercialForSalePropertyHttpFunc,
  removeFavoriteCommercialRentalPropertyHttpFunc,
  removeFavoriteResidentialRentalPropertyHttpFunc,
  removeFavoriteResidentialForSalePropertyHttpFunc,
  removeLandFavoritePropertyHttpFunc,
  removeStandFavoritePropertyHttpFunc,
} from "@/src/HttpServices/Mutations/Property/Favorites/FavoritesHttpFuncs";
import useUpdatePropertyFavorite from "../../../Hooks/useUpdatePropertyFavorite";
import MessageModal from "@/src/Components/Modals/MessageModal";

type Props = {
  propertyId: number;
  isPropertyFavorite: boolean;
  propertyType: IPropertyType;
};

type IPropertyLoading = {
  propertyId: number;
  isLoading: boolean;
};

const FavoriteContainer: React.FC<Props> = ({
  propertyId,
  isPropertyFavorite,
  propertyType,
}) => {
  const [loader, setLoader] = useState<IPropertyLoading>({
    isLoading: true,
    propertyId: 0,
  });
  const [httpError, setHttpError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);
  const { accessToken, id } = useAppSelector((state) => state.user.value);

  const {
    updateLandProperties,
    updateOnSaleCommercialProperties,
    updateOnSaleResidentialProperties,
    updateRentalCommercialProperties,
    updateRentalResidentialProperties,
    updateStandProperties,
  } = useUpdatePropertyFavorite(loader.propertyId);

  const addFavoritePropertyMutationFn = () => {
    if (propertyType === "Commercial ForSale")
      return addFavoriteCommercialForSalePropertyHttpFunc;
    else if (propertyType === "Commercial Rentals")
      return addFavoriteCommercialRentalPropertyHttpFunc;
    else if (propertyType === "Residential Rentals")
      return addFavoriteResidentialRentalPropertyHttpFunc;
    else if (propertyType === "Residential ForSale")
      return addFavoriteResidentialForSalePropertyHttpFunc;
    else if (propertyType === "Land") return addLandFavoritePropertyHttpFunc;
    else return addStandFavoritePropertyHttpFunc;
  };

  const removeFavoritePropertyMutationFn = () => {
    if (propertyType === "Commercial ForSale")
      return removeFavoriteCommercialForSalePropertyHttpFunc;
    else if (propertyType === "Commercial Rentals")
      return removeFavoriteCommercialRentalPropertyHttpFunc;
    else if (propertyType === "Residential Rentals")
      return removeFavoriteResidentialRentalPropertyHttpFunc;
    else if (propertyType === "Residential ForSale")
      return removeFavoriteResidentialForSalePropertyHttpFunc;
    else if (propertyType === "Land") return removeLandFavoritePropertyHttpFunc;
    else return removeStandFavoritePropertyHttpFunc;
  };

  const updatePropertyFavorite = () => {
    if (propertyType === "Commercial ForSale")
      updateOnSaleCommercialProperties();
    else if (propertyType === "Commercial Rentals")
      updateRentalCommercialProperties();
    else if (propertyType === "Residential Rentals")
      updateRentalResidentialProperties();
    else if (propertyType === "Residential ForSale")
      updateOnSaleResidentialProperties();
    else if (propertyType === "Land") updateLandProperties();
    else return updateStandProperties();
  };

  const addFavoritePropertyMutation = useMutation({
    mutationFn: addFavoritePropertyMutationFn(),
    onSuccess(_data) {
      updatePropertyFavorite();
    },
    onError(error: any) {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setHttpError(error.response?.data?.error);
        } else setHttpError("Something went wrong");
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setLoader({
        isLoading: false,
        propertyId: 0,
      });
    },
  });

  const removeFavoritePropertyMutation = useMutation({
    mutationFn: removeFavoritePropertyMutationFn(),
    onSuccess(_data) {
      updatePropertyFavorite();
    },
    onError(error: any) {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setHttpError(error.response?.data?.error);
        } else setHttpError("Something went wrong");
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setLoader({
        isLoading: false,
        propertyId: 0,
      });
    },
  });

  const toggleFavorite = () => {
    setLoader({
      isLoading: true,
      propertyId: propertyId,
    });
    isPropertyFavorite
      ? removeFavoritePropertyMutation.mutate({
          favouritePropertyId: propertyId,
          accessToken,
          userId: id,
        })
      : addFavoritePropertyMutation.mutate({
          favouritePropertyId: propertyId,
          accessToken,
          userId: id,
        });
  };
  return (
    <>
      {accessToken ? (
        loader.isLoading && loader.propertyId === propertyId ? (
          <View>
            <ButtonSpinner
              backGroundColor={theme === "dark" ? pureWhite : dark.background}
            />
          </View>
        ) : isPropertyFavorite ? (
          <MaterialCommunityIcons
            name="heart"
            color={red}
            size={22}
            onPress={toggleFavorite}
          />
        ) : (
          <MaterialCommunityIcons
            name="cards-heart-outline"
            color={red}
            size={22}
            onPress={toggleFavorite}
          />
        )
      ) : null}
      {httpError && (
        <MessageModal
          type="error"
          handleCancel={() => setHttpError("")}
          header="Failed to add to your favorites!"
          isModalVisible={httpError ? true : false}
          message={httpError}
        />
      )}
    </>
  );
};

export default FavoriteContainer;

const styles = StyleSheet.create({});
