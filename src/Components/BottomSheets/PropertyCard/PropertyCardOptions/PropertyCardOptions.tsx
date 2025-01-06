import {
  ActivityIndicator,
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { family, medium } from "@/src/Theme/Font";
import { dark, gray } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { light, pureWhite } from "@/src/Theme/Colors";
import {
  addFavoriteCommercialForSalePropertyHttpFunc,
  addFavoriteCommercialRentalPropertyHttpFunc,
  addFavoriteResidentialForSalePropertyHttpFunc,
  addFavoriteResidentialRentalPropertyHttpFunc,
  addLandFavoritePropertyHttpFunc,
  addStandFavoritePropertyHttpFunc,
  removeFavoriteCommercialForSalePropertyHttpFunc,
  removeFavoriteCommercialRentalPropertyHttpFunc,
  removeFavoriteResidentialForSalePropertyHttpFunc,
  removeFavoriteResidentialRentalPropertyHttpFunc,
  removeLandFavoritePropertyHttpFunc,
  removeStandFavoritePropertyHttpFunc,
} from "@/src/HttpServices/Mutations/Property/Favorites/FavoritesHttpFuncs";
import MessageModal from "@/src/Components/Modals/MessageModal";
import useUpdatePropertyFavorite from "@/src/Components/PropertyCard/Hooks/useUpdatePropertyFavorite";
import Row from "@/src/Components/Row/Row";
import { useSharedContext } from "@/src/Context/SharedContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

type Props = {
  closeBottomSheetWithoutScrollingToTheBottom: () => void;
};

const PropertyCardOptions: React.FC<Props> = ({
  closeBottomSheetWithoutScrollingToTheBottom,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const { setOpenReportModal, selectedProperty } = useSharedContext();
  const theme = useAppSelector((state) => state.theme.value);
  const { accessToken, id } = useAppSelector((state) => state.user.value);
  const underLayColor = theme === "light" ? "#DDDBDE" : "#3B3B3B";
  const iconSize = 28;
  const iconColor = gray;
  const pageUrl = `https://r-estate.vercel.app/${selectedProperty.id}`;
  const {
    updateLandProperties,
    updateOnSaleCommercialProperties,
    updateOnSaleResidentialProperties,
    updateRentalCommercialProperties,
    updateRentalResidentialProperties,
    updateStandProperties,
  } = useUpdatePropertyFavorite(selectedProperty.id);

  const onShare = async () => {
    closeBottomSheetWithoutScrollingToTheBottom();
    setTimeout(async () => {
      try {
        await Share.share({
          url: pageUrl,
          message: pageUrl,
        });
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }, 200);
  };

  const addFavoritePropertyMutationFn = () => {
    if (selectedProperty.type === PropertyTypesEnum.CommercialForSale)
      return addFavoriteCommercialForSalePropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.CommercialRentals)
      return addFavoriteCommercialRentalPropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialRentals)
      return addFavoriteResidentialRentalPropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialForSale)
      return addFavoriteResidentialForSalePropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.Land)
      return addLandFavoritePropertyHttpFunc;
    else return addStandFavoritePropertyHttpFunc;
  };

  const removeFavoritePropertyMutationFn = () => {
    if (selectedProperty.type === PropertyTypesEnum.CommercialForSale)
      return removeFavoriteCommercialForSalePropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.CommercialRentals)
      return removeFavoriteCommercialRentalPropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialRentals)
      return removeFavoriteResidentialRentalPropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialForSale)
      return removeFavoriteResidentialForSalePropertyHttpFunc;
    else if (selectedProperty.type === PropertyTypesEnum.Land)
      return removeLandFavoritePropertyHttpFunc;
    else return removeStandFavoritePropertyHttpFunc;
  };

  const updatePropertyFavorite = () => {
    if (selectedProperty.type === PropertyTypesEnum.CommercialForSale)
      updateOnSaleCommercialProperties();
    else if (selectedProperty.type === PropertyTypesEnum.CommercialRentals)
      updateRentalCommercialProperties();
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialRentals)
      updateRentalResidentialProperties();
    else if (selectedProperty.type === PropertyTypesEnum.ResidentialForSale)
      updateOnSaleResidentialProperties();
    else if (selectedProperty.type === PropertyTypesEnum.Land)
      updateLandProperties();
    else return updateStandProperties();
  };

  const addFavoritePropertyMutation = useMutation({
    mutationFn: addFavoritePropertyMutationFn(),
    onSuccess(_data) {
      updatePropertyFavorite();
      closeBottomSheetWithoutScrollingToTheBottom();
    },
    onError(error: any) {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setHttpError(error.response?.data?.error);
        } else setHttpError("Something went wrong");
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const removeFavoritePropertyMutation = useMutation({
    mutationFn: removeFavoritePropertyMutationFn(),
    onSuccess(_data) {
      updatePropertyFavorite();
      closeBottomSheetWithoutScrollingToTheBottom();
    },
    onError(error: any) {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setHttpError(error.response?.data?.error);
        } else setHttpError("Something went wrong");
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const contentWithFavorites = [
    {
      name: "Share",
      icon: (
        <MaterialCommunityIcons
          name="share-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
      onPressFunc: onShare,
    },
    {
      name: isLoading
        ? ""
        : selectedProperty.isFavorite
        ? "remove from favorites"
        : "Add to favorites",
      icon: isLoading ? (
        <Row style={{ gap: 20 }}>
          <MaterialCommunityIcons
            name="heart-plus-outline"
            size={iconSize}
            color={iconColor}
          />
          <ActivityIndicator
            size={"small"}
            color={theme === "dark" ? dark.text : light.text}
          />
        </Row>
      ) : selectedProperty.isFavorite ? (
        <MaterialCommunityIcons
          name="heart-minus-outline"
          size={iconSize}
          color={iconColor}
        />
      ) : (
        <MaterialCommunityIcons
          name="heart-plus-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
      onPressFunc: () => {
        setIsLoading(true);
        selectedProperty.isFavorite
          ? removeFavoritePropertyMutation.mutate({
              favouritePropertyId: selectedProperty.id,
              accessToken,
              userId: id,
            })
          : addFavoritePropertyMutation.mutate({
              favouritePropertyId: selectedProperty.id,
              accessToken,
              userId: id,
            });
      },
    },
    {
      name: "Report",
      icon: <Octicons name="report" size={iconSize} color={iconColor} />,
      onPressFunc: () => {
        closeBottomSheetWithoutScrollingToTheBottom();
        setTimeout(() => {
          setOpenReportModal(true);
        }, 300);
      },
    },
  ];

  const contentListWithoutFavorites = [
    {
      name: "Share",
      icon: (
        <MaterialCommunityIcons
          name="share-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
      onPressFunc: onShare,
    },
    {
      name: "Report",
      icon: <Octicons name="report" size={iconSize} color={iconColor} />,
      onPressFunc: () => {
        closeBottomSheetWithoutScrollingToTheBottom();
        setTimeout(() => {
          setOpenReportModal(true);
        }, 300);
      },
    },
  ];

  const getContentList = () => {
    if (id === selectedProperty.userId || !id)
      return contentListWithoutFavorites;
    else return contentWithFavorites;
  };

  return (
    <View style={styles.bottomSheetContainer}>
      {getContentList().map(({ name, icon, onPressFunc }) => (
        <TouchableHighlight
          key={name}
          disabled={isLoading}
          style={styles.touchable}
          underlayColor={underLayColor}
          onPress={() => {
            onPressFunc();
          }}
        >
          <View style={styles.optionContainer}>
            {icon}
            <Text
              style={[
                styles.text,
                { color: theme === "light" ? light.text : pureWhite },
              ]}
            >
              {name}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
      {httpError && (
        <MessageModal
          type="error"
          handleCancel={() => setHttpError("")}
          header="Failed to add to your favorites!"
          isModalVisible={httpError ? true : false}
          message={httpError}
        />
      )}
    </View>
  );
};

export default PropertyCardOptions;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    gap: 3,
    paddingTop: 7,
    paddingHorizontal: 5,
  },
  touchable: {
    width: "100%",
    height: 45,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 5,
  },
  optionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  text: {
    fontFamily: family,
    fontSize: medium,
    marginTop: 3,
  },
});
