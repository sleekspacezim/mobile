import { RefreshControl, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { getResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { propertyTypeStyles } from "../Components/Shared/Styles";
import HttpError from "@/src/Components/HttpError/HttpError";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import ImageContainer from "../Components/ImageContainer/ImageContainer";
import ExteriorInteriorFeatures from "../Components/ExteriorInteriorFeatures/ExteriorInteriorFeatures";
import Location from "../Components/Location/Location";
import Manager from "../Components/Manager/Manager";
import Features from "../Components/OverView/Features";
import { primary, pureWhite } from "@/src/Theme/Colors";
import Loader from "../Components/Loader/Loader";
import { deleteResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Mutations/Property/Residential/ForRental";
import MessageModal from "@/src/Components/Modals/MessageModal";
import Row from "@/src/Components/Row/Row";
import FavoriteContainer from "@/src/Components/FavoriteContainer/FavoriteContainer";
import ThreeDots from "@/src/Components/ThreeDots/ThreeDots";
import { usePropertyContext } from "@/src/Context/PropertyContext";
import { propertyScreenStyles } from "./Shared/Styles";
import ContactManager from "../Components/Contacts/ContactManager";
import ButtonList from "../Components/ButtonList/ButtonList";
import { updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Mutations/Property/Insights/InsightsHttpFunc";
import useUpdateProperties from "../Hooks/useUpdateProperties";

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
  const { removeDeletedProperty } = useUpdateProperties(
    PropertyTypesEnum.ResidentialRentals,
    propertyId
  );
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
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setRentalResidentialProperty(undefined);
    refreshProperty();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteResidentialRentalPropertyHttpFunc,
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
        propertyType: PropertyTypesEnum.ResidentialRentals,
      },
    });

  const navigateToPropertyInsights = () =>
    router.push({
      pathname: "/property/insights/" + rentalResidentialProperty?.uniqueId,
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
                propertyUniqueId={rentalResidentialProperty.uniqueId}
              />
            )}
            <ThreeDots
              propertyId={propertyId}
              isFavorite={rentalResidentialProperty.isFavorite}
              propertyType={PropertyTypesEnum.ResidentialRentals}
              managerId={rentalResidentialProperty.managerId}
              userId={rentalResidentialProperty.manager.userId}
              propertyUniqueId={rentalResidentialProperty.uniqueId}
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
          <Manager
            manager={rentalResidentialProperty.manager}
            propertyUniqueId={rentalResidentialProperty.uniqueId}
          />
          {id === rentalResidentialProperty.manager.userId && (
            <ButtonList
              isDeleting={isDeleting}
              setOpenDeleteConfirmationModal={setOpenDeleteConfirmationModal}
              navigateToPropertyInsights={navigateToPropertyInsights}
              updateProperty={updateProperty}
            />
          )}
        </ScrollView>
      )}
      {rentalResidentialProperty && (
        <ContactManager
          manager={rentalResidentialProperty.manager}
          propertyUniqueId={rentalResidentialProperty.uniqueId}
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

export default ResidentialRentalProperty;
