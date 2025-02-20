import { View, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { usePropertyContext } from "@/src/Context/PropertyContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { getStandPropertyHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { deleteStandHttpFunc } from "@/src/HttpServices/Mutations/Property/Stands/StandsHttpFuncs";
import FavoriteContainer from "@/src/Components/FavoriteContainer/FavoriteContainer";
import HttpError from "@/src/Components/HttpError/HttpError";
import MessageModal from "@/src/Components/Modals/MessageModal";
import Row from "@/src/Components/Row/Row";
import ThreeDots from "@/src/Components/ThreeDots/ThreeDots";
import { updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Mutations/Property/Insights/InsightsHttpFunc";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite, primary } from "@/src/Theme/Colors";
import ButtonList from "../Components/ButtonList/ButtonList";
import ContactManager from "../Components/Contacts/ContactManager";
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

const Stand: React.FC<Props> = ({ propertyId }) => {
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
    PropertyTypesEnum.Stands,
    propertyId
  );
  const { standProperty, setStandProperty } = usePropertyContext();

  const fetchProperty = () => {
    setHttpError("");
    getStandPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setStandProperty(response);
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
    getStandPropertyHttpFunc({
      propertyId,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
    })
      .then(({ data: { response } }) => {
        setStandProperty(response);
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
    setStandProperty(undefined);
    refreshProperty();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteStandHttpFunc,
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
        propertyType: PropertyTypesEnum.Stands,
      },
    });

  const navigateToPropertyInsights = () =>
    router.push({
      pathname: "/property/insights/" + standProperty?.uniqueId,
      params: {
        propertyType: PropertyTypesEnum.Stands,
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
      {!isLoading && standProperty && (
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
            propertyType={PropertyTypesEnum.Stands}
            media={standProperty.media}
          />
          <Row style={propertyScreenStyles.optionsContainer}>
            {standProperty.manager.userId != id && (
              <FavoriteContainer
                propertyId={standProperty.id}
                isPropertyFavorite={standProperty.isFavorite}
                propertyType={PropertyTypesEnum.Stands}
                propertyUniqueId={standProperty.uniqueId}
              />
            )}
            <ThreeDots
              propertyId={propertyId}
              isFavorite={standProperty.isFavorite}
              propertyType={PropertyTypesEnum.Stands}
              managerId={standProperty.managerId}
              userId={standProperty.manager.userId}
              propertyUniqueId={standProperty.uniqueId}
              type="property"
            />
          </Row>
          <Features
            propertyType={PropertyTypesEnum.Stands}
            property={standProperty}
          />
          <Location location={standProperty.propertyLocation} />
          <Manager
            manager={standProperty.manager}
            propertyUniqueId={standProperty.uniqueId}
          />
          {id === standProperty.manager.userId && (
            <ButtonList
              isDeleting={isDeleting}
              setOpenDeleteConfirmationModal={setOpenDeleteConfirmationModal}
              navigateToPropertyInsights={navigateToPropertyInsights}
              updateProperty={updateProperty}
            />
          )}
        </ScrollView>
      )}
      {standProperty && (
        <ContactManager
          manager={standProperty.manager}
          propertyUniqueId={standProperty.uniqueId}
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

export default Stand;
