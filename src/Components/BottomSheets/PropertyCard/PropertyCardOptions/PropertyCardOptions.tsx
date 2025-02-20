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
import useUpdateProperty from "@/src/Screens/Property/Hooks/useUpdateProperty";
import { updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Mutations/Property/Insights/InsightsHttpFunc";

type Props = {
  closeBottomSheetWithoutScrollingToTheBottom: () => void;
};

const PropertyCardOptions: React.FC<Props> = ({
  closeBottomSheetWithoutScrollingToTheBottom,
}) => {
  const [isFavoriteLoading, setIsFavoriteloading] = useState<boolean>(false);
  const [isSharedLoading, setIsSharedloading] = useState<boolean>(false);
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

  const {
    updateLandProperty,
    updateOnSaleCommercialProperty,
    updateOnSaleResidentialProperty,
    updateRentalCommercialProperty,
    updateRentalResidentialProperty,
    updateStandProperty,
  } = useUpdateProperty();

  const updateOnSharePropertyInsightsMutation = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: async () => {
      setIsSharedloading(false);
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
      }, 350);
    },
  });

  const updatePropertyInsightsOnAddFavorite = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: () => {
      addFavoritePropertyMutation.mutate({
        favouritePropertyId: selectedProperty.id,
        accessToken,
        userId: id,
      });
    },
  });

  const updatePropertyInsightsOnRemoveFavorite = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: () => {
      removeFavoritePropertyMutation.mutate({
        favouritePropertyId: selectedProperty.id,
        accessToken,
        userId: id,
      });
    },
  });

  const onShare = async () => {
    setIsSharedloading(true);
    updateOnSharePropertyInsightsMutation.mutate({
      propertyId: selectedProperty.propertyUniqueId,
      data: { insightProperty: "shared" },
    });
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
    if (selectedProperty.type === PropertyTypesEnum.CommercialForSale) {
      updateOnSaleCommercialProperties();
      updateOnSaleCommercialProperty();
    } else if (selectedProperty.type === PropertyTypesEnum.CommercialRentals) {
      updateRentalCommercialProperties();
      updateRentalCommercialProperty();
    } else if (selectedProperty.type === PropertyTypesEnum.ResidentialRentals) {
      updateRentalResidentialProperties();
      updateRentalResidentialProperty();
    } else if (selectedProperty.type === PropertyTypesEnum.ResidentialForSale) {
      updateOnSaleResidentialProperties();
      updateOnSaleResidentialProperty();
    } else if (selectedProperty.type === PropertyTypesEnum.Land) {
      updateLandProperties();
      updateLandProperty();
    } else {
      updateStandProperties();
      updateStandProperty();
    }
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
      setIsFavoriteloading(false);
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
      setIsFavoriteloading(false);
    },
  });

  const contentWithFavorites = [
    {
      name: isSharedLoading ? "" : "Share",
      icon: isSharedLoading ? (
        <Row style={{ gap: 20 }}>
          <MaterialCommunityIcons
            name="share-outline"
            size={iconSize}
            color={iconColor}
          />
          <ActivityIndicator
            size={"small"}
            color={theme === "dark" ? dark.text : light.text}
          />
        </Row>
      ) : (
        <MaterialCommunityIcons
          name="share-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
      onPressFunc: onShare,
    },
    {
      name: isFavoriteLoading
        ? ""
        : selectedProperty.isFavorite
        ? "remove from favorites"
        : "Add to favorites",
      icon: isFavoriteLoading ? (
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
        setIsFavoriteloading(true);
        selectedProperty.isFavorite
          ? updatePropertyInsightsOnRemoveFavorite.mutate({
              propertyId: selectedProperty.propertyUniqueId,
              data: { insightProperty: "removedFromFavourites" },
            })
          : updatePropertyInsightsOnAddFavorite.mutate({
              propertyId: selectedProperty.propertyUniqueId,
              data: { insightProperty: "addedToFavourites" },
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
      name: isSharedLoading ? "" : "Share",
      icon: isSharedLoading ? (
        <Row style={{ gap: 20 }}>
          <MaterialCommunityIcons
            name="share-outline"
            size={iconSize}
            color={iconColor}
          />
          <ActivityIndicator
            size={"small"}
            color={theme === "dark" ? dark.text : light.text}
          />
        </Row>
      ) : (
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
          disabled={isFavoriteLoading}
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
