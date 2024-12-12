import { View } from "react-native";
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
import { PropertyTypesEnum } from "@/src/Utils/Constants";

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
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return addFavoriteCommercialForSalePropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return addFavoriteCommercialRentalPropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return addFavoriteResidentialRentalPropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return addFavoriteResidentialForSalePropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.Land)
      return addLandFavoritePropertyHttpFunc;
    else return addStandFavoritePropertyHttpFunc;
  };

  const removeFavoritePropertyMutationFn = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return removeFavoriteCommercialForSalePropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return removeFavoriteCommercialRentalPropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return removeFavoriteResidentialRentalPropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return removeFavoriteResidentialForSalePropertyHttpFunc;
    else if (propertyType === PropertyTypesEnum.Land)
      return removeLandFavoritePropertyHttpFunc;
    else return removeStandFavoritePropertyHttpFunc;
  };

  const updatePropertyFavorite = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      updateOnSaleCommercialProperties();
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      updateRentalCommercialProperties();
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      updateRentalResidentialProperties();
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      updateOnSaleResidentialProperties();
    else if (propertyType === PropertyTypesEnum.Land) updateLandProperties();
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
