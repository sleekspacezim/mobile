import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";

import GeneralInformation from "./Components/GeneralInformation";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  BUTTON_MAX_WIDTH,
  emptyLocation,
} from "@/src/Utils/Constants";
import {
  createPropertyToBeSubmitted,
  exteriorPropertyInfoInitialState,
  generalPropertyInfoIntialState,
  interiorPropertyInfoInitialState,
  otherPropertyInfoInitialState,
  processExteriorPropertyDetails,
  processGeneralPropertyDetails,
  processInteriorPropertyDetails,
} from "./Utilities/Utilis";
import {
  IExteriorInfoFormError,
  IGeneralInfoFormError,
  IInteriorInfoFormError,
  IResidentialRentalExteriorInfo,
  IResidentialRentalGeneralInfo,
  IResidentialRentalInteriorInfo,
  IResidentialRentalOtherInfo,
} from "./Types/FormTypes";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import InteriorInformation from "./Components/InteriorInformation";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import ExteriorInformation from "./Components/ExteriorInformation";
import OtherInformation from "./Components/OtherInformation";
import { postResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Mutations/Property/Residential/ForRental";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { IResidentialRentalPropertyCreation } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import PropertyTypeScreenWrapper from "../Shared/PropertyTypeScreenWrapper";
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import { primary } from "@/src/Theme/Colors";

const ResidentialRental: INoPropsReactComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const location = useAppSelector((state) => state.mapLocation.value);

  const [generalInfoFormError, setGeneralInfoFormError] =
    useState<IGeneralInfoFormError>("");

  const [interiorInfoFormError, setInteriorInfoFormError] =
    useState<IInteriorInfoFormError>("");

  const [exteriorInfoFormError, setExteriorInfoFormError] =
    useState<IExteriorInfoFormError>("");

  const [propertyGeneralDetails, setPropertyGeneralDetails] =
    useState<IResidentialRentalGeneralInfo>(generalPropertyInfoIntialState);

  const [propertyInteriorInfo, setPropertyInteriorInfo] =
    useState<IResidentialRentalInteriorInfo>(interiorPropertyInfoInitialState);

  const [propertyExteriorInfo, setPropertyExteriorInfo] =
    useState<IResidentialRentalExteriorInfo>(exteriorPropertyInfoInitialState);

  const [otherPropertyInfo, setOtherPropertyInfo] =
    useState<IResidentialRentalOtherInfo>(otherPropertyInfoInitialState);

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

  const handleProcessInteriorInfo = () => {
    setInteriorInfoFormError("");
    processInteriorPropertyDetails(
      propertyInteriorInfo,
      setPageNumber,
      propertyGeneralDetails,
      setInteriorInfoFormError
    );
  };

  const handleProcessExteriorInfo = () => {
    setExteriorInfoFormError("");
    processExteriorPropertyDetails(
      propertyExteriorInfo,
      setPageNumber,
      setExteriorInfoFormError
    );
  };

  const submitPropertyMutation = useMutation({
    mutationFn: postResidentialRentalPropertyHttpFunc,
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
    const propertyToBeSubmitted: IResidentialRentalPropertyCreation =
      createPropertyToBeSubmitted(
        propertyGeneralDetails,
        propertyInteriorInfo,
        propertyExteriorInfo,
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
    setPropertyExteriorInfo(exteriorPropertyInfoInitialState);
    setPropertyInteriorInfo(interiorPropertyInfoInitialState);
    setPropertyGeneralDetails(generalPropertyInfoIntialState);
    setOpenSuccessModal(false);
  };

  return (
    <PropertyTypeScreenWrapper>
      <View style={{ width: "100%" }}>
        <ThemedText type="header" styles={{ textAlign: "left" }}>
          Residential Rental Property
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
        <InteriorInformation
          propertyDetails={propertyInteriorInfo}
          setPropertyDetails={setPropertyInteriorInfo}
          formError={interiorInfoFormError}
          setFormError={setInteriorInfoFormError}
        />
      )}
      {pageNumber === 3 && (
        <ExteriorInformation
          propertyDetails={propertyExteriorInfo}
          setPropertyDetails={setPropertyExteriorInfo}
          formError={exteriorInfoFormError}
          setFormError={setExteriorInfoFormError}
        />
      )}
      {pageNumber === 4 && (
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
          title={isLoading ? "loading" : pageNumber === 4 ? "submit" : "next"}
          isDisabled={isLoading ? true : false}
          onPressFunc={
            pageNumber === 1
              ? handleProcessGeneralInfo
              : pageNumber === 2
              ? handleProcessInteriorInfo
              : pageNumber === 3
              ? handleProcessExteriorInfo
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

export default ResidentialRental;

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
