import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import {
  ICommercialRentalFeaturesInfo,
  ICommercialRentalGeneralInfo,
  ICommercialRentalOtherInfo,
  IGeneralInfoFormError,
} from "./Types/FormTypes";
import {
  createPropertyToBeSubmitted,
  generalPropertyInfoIntialState,
  otherPropertyInfoInitialState,
  processGeneralPropertyDetails,
  propertyFeaturesInfoInitialState,
} from "./Utilities/Utils";
import { useAppSelector, useAppDispatch } from "@/src/Redux/Hooks/Config";
import { postCommercialRentalPropertyHttpFunc } from "@/src/HttpServices/Mutations/Property/Commercial/ForRental";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  emptyLocation,
} from "@/src/Utils/Constants";
import { ICommercialRentalPropertyCreation } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import PropertyTypeScreenWrapper from "../Shared/PropertyTypeScreenWrapper";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import GeneralInformation from "./Components/GeneralInformation";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { primary } from "@/src/Theme/Colors";
import FeaturesInformation from "./Components/FeaturesInformation";
import OtherInformation from "./Components/OtherInformation";

const CommercialRental: INoPropsReactComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const location = useAppSelector((state) => state.mapLocation.value);

  const [generalInfoFormError, setGeneralInfoFormError] =
    useState<IGeneralInfoFormError>("");

  const [propertyGeneralDetails, setPropertyGeneralDetails] =
    useState<ICommercialRentalGeneralInfo>(generalPropertyInfoIntialState);

  const [propertyFeaturesInfo, setPropertyFeaturesInfo] =
    useState<ICommercialRentalFeaturesInfo>(propertyFeaturesInfoInitialState);

  const [otherPropertyInfo, setOtherPropertyInfo] =
    useState<ICommercialRentalOtherInfo>(otherPropertyInfoInitialState);

  const manager = useAppSelector((state) => state.managerAccount.value);
  const { accessToken } = useAppSelector((state) => state.user.value);
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const handleProcessGeneralInfo = () => {
    setGeneralInfoFormError("");
    processGeneralPropertyDetails(
      propertyGeneralDetails,
      setPageNumber,
      setGeneralInfoFormError,
      location
    );
  };

  const submitPropertyMutation = useMutation({
    mutationFn: postCommercialRentalPropertyHttpFunc,
    onSuccess(_data) {
      setOpenSuccessModal(true);
      dispatch(addMapLocation(emptyLocation));
    },
    onError(error: any) {
      if (error.response?.data?.error) {
        if (error.response?.data?.error !== "") {
          setSubmitError(error.response?.data?.error);
        } else setSubmitError("Something went wrong");
      } else setSubmitError("Something went wrong");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmitProperty = () => {
    setIsLoading(true);
    const propertyToBeSubmitted: ICommercialRentalPropertyCreation =
      createPropertyToBeSubmitted(
        propertyGeneralDetails,
        propertyFeaturesInfo,
        otherPropertyInfo,
        manager,
        location
      );
    submitPropertyMutation.mutate({
      property: propertyToBeSubmitted,
      accessToken,
    });
  };

  const handleCloseSucessModal = () => {
    setPageNumber(1);
    setOtherPropertyInfo(otherPropertyInfoInitialState);
    setPropertyFeaturesInfo(propertyFeaturesInfoInitialState);
    setPropertyGeneralDetails(generalPropertyInfoIntialState);
    setOpenSuccessModal(false);
  };

  return (
    <PropertyTypeScreenWrapper>
      <View style={{ width: "100%" }}>
        <ThemedText type="header" styles={{ textAlign: "left" }}>
          Commercial Rental Property
        </ThemedText>
      </View>
      {pageNumber === 1 && (
        <GeneralInformation
          propertyDetails={propertyGeneralDetails}
          setPropertyDetails={setPropertyGeneralDetails}
          formError={generalInfoFormError}
          setFormError={setGeneralInfoFormError}
        />
      )}
      {pageNumber === 2 && (
        <FeaturesInformation
          propertyDetails={propertyFeaturesInfo}
          setPropertyDetails={setPropertyFeaturesInfo}
        />
      )}
      {pageNumber === 3 && (
        <OtherInformation
          propertyDetails={otherPropertyInfo}
          isAddImagesBtnDisabled={isLoading}
          setPropertyDetails={setOtherPropertyInfo}
        />
      )}
      <View
        style={[
          {
            width:
              width > BUTTON_SIZE_SCREEN_BREAK_POINT
                ? BUTTON_MAX_WIDTH
                : "100%",
          },
          styles.btnContainer,
        ]}
      >
        {pageNumber > 1 && (
          <OutlinedButton
            title="previous"
            onPressFunc={() => setPageNumber((prev) => prev - 1)}
            isDisabled={isLoading}
            iconPosition="left"
            icon={
              <MaterialIcons
                name="keyboard-double-arrow-left"
                size={24}
                color={primary}
              />
            }
          />
        )}
        <CustomButton
          title={isLoading ? "loading" : pageNumber === 3 ? "submit" : "next"}
          isDisabled={isLoading ? true : false}
          onPressFunc={
            pageNumber === 1
              ? handleProcessGeneralInfo
              : pageNumber === 2
              ? () => setPageNumber((value) => value + 1)
              : handleSubmitProperty
          }
        />
      </View>
      <MessageModal
        handleCancel={() => setSubmitError("")}
        isModalVisible={submitError ? true : false}
        message={submitError}
        header="Submission Failed!"
        type="error"
      />
      <MessageModal
        handleCancel={handleCloseSucessModal}
        isModalVisible={openSuccessModal}
        message={
          "Your property has been successfully submitted, potential tenants can now view it."
        }
        header="Property Submitted!"
        type="success"
      />
    </PropertyTypeScreenWrapper>
  );
};

export default CommercialRental;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
  },
});
