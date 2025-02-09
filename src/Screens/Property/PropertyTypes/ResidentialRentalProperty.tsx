import {
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { getResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { propertyTypeStyles } from "../Components/Shared/Styles";
import HttpError from "@/src/Components/HttpError/HttpError";
import {
  activeOpacityOfTouchableOpacity,
  BUTTON_MAX_WIDTH,
  PropertyTypesEnum,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import ImageContainer from "../Components/ImageContainer/ImageContainer";
import ExteriorInteriorFeatures from "../Components/ExteriorInteriorFeatures/ExteriorInteriorFeatures";
import Location from "../Components/Location/Location";
import Manager from "../Components/Manager/Manager";
import Features from "../Components/OverView/Features";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  green,
  lighterPrimary,
  primary,
  pureWhite,
  red,
  white,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import Loader from "../Components/Loader/Loader";
import { deleteResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Mutations/Property/Residential/ForRental";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { getManagerContactNumber } from "@/src/Utils/Funcs";
import { IManagerContactNumber } from "@/src/GlobalTypes/Manager/ManagerTypes";
import Row from "@/src/Components/Row/Row";
import FavoriteContainer from "@/src/Components/FavoriteContainer/FavoriteContainer";
import ThreeDots from "@/src/Components/ThreeDots/ThreeDots";
import { usePropertyContext } from "@/src/Context/PropertyContext";
import { propertyScreenStyles } from "./Shared/Styles";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import Contacts from "../Components/Contacts/ContactManager";
import ContactDetails from "../Components/Contacts/ContactManager";
import ContactManager from "../Components/Contacts/ContactManager";
import ButtonList from "../Components/ButtonList/ButtonList";

type Props = {
  propertyId: number;
};

const ResidentialRentalProperty: React.FC<Props> = ({ propertyId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);
  const { accessToken, id } = useAppSelector((state) => state.user.value);
  const { rentalResidentialProperty, setRentalResidentialProperty } =
    usePropertyContext();

  const fetchProperty = () => {
    setHttpError("");
    getResidentialRentalPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setRentalResidentialProperty(response);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const refreshProperty = () => {
    setIsRefreshing(true);
    setHttpError("");
    getResidentialRentalPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setRentalResidentialProperty(response);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsRefreshing(false));
  };

  const handleRefresh = () => {
    setRentalResidentialProperty(undefined);
    refreshProperty();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteResidentialRentalPropertyHttpFunc,
    onSuccess: (_data) => {
      setOpenSuccessModal(true);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setDeleteError(error.response?.data?.error);
      } else setDeleteError("Something went wrong");
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteMutation.mutate({ propertyId, accessToken });
  };

  const navigate = () =>
    router.push({
      pathname: "/property/update/" + propertyId,
      params: {
        propertyType: PropertyTypesEnum.ResidentialRentals,
      },
    });

  return (
    <View style={propertyScreenStyles.container}>
      {isLoading && <Loader />}
      {httpError && (
        <View
          style={{
            flex: 1,
            paddingTop: 0,
          }}
        >
          <HttpError
            retryFunc={() => {
              setHttpError("");
              setIsLoading(true);
              fetchProperty();
            }}
          />
        </View>
      )}
      {!isLoading && rentalResidentialProperty && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={propertyTypeStyles.container}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={theme === "dark" ? pureWhite : primary}
              tintColor={primary}
              colors={[theme === "dark" ? primary : pureWhite]}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <ImageContainer
            propertyType={PropertyTypesEnum.ResidentialRentals}
            media={rentalResidentialProperty.media}
          />
          <Row style={propertyScreenStyles.optionsContainer}>
            {rentalResidentialProperty.manager.userId != id && (
              <FavoriteContainer
                propertyId={rentalResidentialProperty.id}
                isPropertyFavorite={rentalResidentialProperty.isFavorite}
                propertyType={PropertyTypesEnum.ResidentialRentals}
              />
            )}
            <ThreeDots
              propertyId={propertyId}
              isFavorite={rentalResidentialProperty.isFavorite}
              propertyType={PropertyTypesEnum.ResidentialRentals}
              managerId={rentalResidentialProperty.managerId}
              userId={rentalResidentialProperty.manager.userId}
              type="property"
            />
          </Row>
          <Features
            propertyType={PropertyTypesEnum.ResidentialRentals}
            property={rentalResidentialProperty}
          />
          <Location location={rentalResidentialProperty.propertyLocation} />
          {rentalResidentialProperty.otherInteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={rentalResidentialProperty.otherInteriorFeatures}
              type="Interior"
            />
          )}
          {rentalResidentialProperty.otherExteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={rentalResidentialProperty.otherExteriorFeatures}
              type="Exterior"
            />
          )}
          <Manager manager={rentalResidentialProperty.manager} />
          {id === rentalResidentialProperty.manager.userId && (
            <ButtonList
              isDeleting={isDeleting}
              setOpenDeleteConfirmationModal={setOpenDeleteConfirmationModal}
              navigate={navigate}
            />
          )}
        </ScrollView>
      )}
      {rentalResidentialProperty && (
        <ContactManager manager={rentalResidentialProperty.manager} />
      )}
      <MessageModal
        handleCancel={() => setDeleteError("")}
        message={"failed to delete this property"}
        isModalVisible={deleteError ? true : false}
        type="error"
        header="Delete Failed"
      />
      <MessageModal
        handleCancel={() => {
          setOpenSuccessModal(false);
          router.back();
        }}
        message={"Property deleted successfully"}
        isModalVisible={openSuccessModal}
        type="success"
        header="Delete Successful"
      />
      <MessageModal
        handleCancel={() => setOpenDeleteConfirmationModal(false)}
        isModalVisible={openDeleteConfirmationModal}
        message="Are your sure you want to delete this property"
        header="Delete Property?"
        type="confirmation"
        handleConfirm={handleDelete}
      />
    </View>
  );
};

export default ResidentialRentalProperty;
