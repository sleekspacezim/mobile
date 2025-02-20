import { View, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { usePropertyContext } from "@/src/Context/PropertyContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { getCommercialRentalPropertyHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Mutations/Property/Insights/InsightsHttpFunc";
import { deleteCommercialRentalPropertyHttpFunc } from "@/src/HttpServices/Mutations/Property/Commercial/ForRental";
import FavoriteContainer from "@/src/Components/FavoriteContainer/FavoriteContainer";
import HttpError from "@/src/Components/HttpError/HttpError";
import MessageModal from "@/src/Components/Modals/MessageModal";
import Row from "@/src/Components/Row/Row";
import ThreeDots from "@/src/Components/ThreeDots/ThreeDots";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite, primary } from "@/src/Theme/Colors";
import ButtonList from "../Components/ButtonList/ButtonList";
import ContactManager from "../Components/Contacts/ContactManager";
import ExteriorInteriorFeatures from "../Components/ExteriorInteriorFeatures/ExteriorInteriorFeatures";
import ImageContainer from "../Components/ImageContainer/ImageContainer";
import Loader from "../Components/Loader/Loader";
import Manager from "../Components/Manager/Manager";
import Features from "../Components/OverView/Features";
import { propertyTypeStyles } from "../Components/Shared/Styles";
import useUpdateProperties from "../Hooks/useUpdateProperties";
import { propertyScreenStyles } from "./Shared/Styles";
import Location from "../Components/Location/Location";

type Props = {
  propertyId: number;
};

const CommercialRentalProperty: React.FC<Props> = ({ propertyId }) => {
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
  const { removeDeletedProperty } = useUpdateProperties(
    PropertyTypesEnum.CommercialRentals,
    propertyId
  );
  const { rentalCommercialProperty, setRentalCommercialProperty } =
    usePropertyContext();
  const fetchProperty = () => {
    setHttpError("");
    getCommercialRentalPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setRentalCommercialProperty(response);
        if (response.manager.userId !== id) {
          updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc({
            propertyId: response.uniqueId,
            data: { insightProperty: "views" },
          })
            .then((_data) => {
              setIsLoading(false);
            })
            .catch((error: any) => {
              if (error.response?.data?.error) {
                if (error.response?.data?.error !== "") {
                  setHttpError(error.response?.data?.error);
                } else setHttpError("Something went wrong");
              } else setHttpError("Something went wrong");
            })
            .finally(() => setIsLoading(false));
        }
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
    getCommercialRentalPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setRentalCommercialProperty(response);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setRentalCommercialProperty(undefined);
    refreshProperty();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCommercialRentalPropertyHttpFunc,
    onSuccess: (_data) => {
      removeDeletedProperty();
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
    setOpenDeleteConfirmationModal(false);
    setIsDeleting(true);
    deleteMutation.mutate({ propertyId, accessToken });
  };

  const updateProperty = () =>
    router.push({
      pathname: "/property/update/" + propertyId,
      params: {
        propertyType: PropertyTypesEnum.CommercialRentals,
      },
    });

  const navigateToPropertyInsights = () =>
    router.push({
      pathname: "/property/insights/" + rentalCommercialProperty?.uniqueId,
      params: {
        propertyType: PropertyTypesEnum.CommercialRentals,
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
      {!isLoading && rentalCommercialProperty && (
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
            propertyType={PropertyTypesEnum.CommercialRentals}
            media={rentalCommercialProperty.media}
          />
          <Row style={propertyScreenStyles.optionsContainer}>
            {rentalCommercialProperty.manager.userId != id && (
              <FavoriteContainer
                propertyId={rentalCommercialProperty.id}
                isPropertyFavorite={rentalCommercialProperty.isFavorite}
                propertyType={PropertyTypesEnum.CommercialRentals}
                propertyUniqueId={rentalCommercialProperty.uniqueId}
              />
            )}
            <ThreeDots
              propertyId={propertyId}
              isFavorite={rentalCommercialProperty.isFavorite}
              propertyType={PropertyTypesEnum.CommercialRentals}
              managerId={rentalCommercialProperty.managerId}
              userId={rentalCommercialProperty.manager.userId}
              propertyUniqueId={rentalCommercialProperty.uniqueId}
              type="property"
            />
          </Row>
          <Features
            propertyType={PropertyTypesEnum.CommercialRentals}
            property={rentalCommercialProperty}
          />
          <Location location={rentalCommercialProperty.propertyLocation} />
          {rentalCommercialProperty.otherInteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={rentalCommercialProperty.otherInteriorFeatures}
              type="Interior"
            />
          )}
          {rentalCommercialProperty.otherExteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={rentalCommercialProperty.otherExteriorFeatures}
              type="Exterior"
            />
          )}
          <Manager
            manager={rentalCommercialProperty.manager}
            propertyUniqueId={rentalCommercialProperty.uniqueId}
          />
          {id === rentalCommercialProperty.manager.userId && (
            <ButtonList
              isDeleting={isDeleting}
              setOpenDeleteConfirmationModal={setOpenDeleteConfirmationModal}
              navigateToPropertyInsights={navigateToPropertyInsights}
              updateProperty={updateProperty}
            />
          )}
        </ScrollView>
      )}
      {rentalCommercialProperty && (
        <ContactManager
          manager={rentalCommercialProperty.manager}
          propertyUniqueId={rentalCommercialProperty.uniqueId}
        />
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

export default CommercialRentalProperty;
