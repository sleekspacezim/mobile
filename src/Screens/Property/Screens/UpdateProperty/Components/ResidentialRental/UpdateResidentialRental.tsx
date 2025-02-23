import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { addMapLocation } from "@/src/Redux/Slices/MapLocationSlice/MapLocationSlice";
import { primary } from "@/src/Theme/Colors";
import { usePropertyContext } from "@/src/Context/PropertyContext";
import PropertyTypeScreenWrapper from "../../Shared/PropertyTypeScreenWrapper";

type Props = {
  propertyId: number;
};
const UpdateResidentialRental: React.FC<Props> = ({ propertyId }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const location = useAppSelector((state) => state.mapLocation.value);
  const { rentalResidentialProperty } = usePropertyContext();

  const [generalInfoFormError, setGeneralInfoFormError] =
    useState<IGeneralInfoFormError>("");

  const [interiorInfoFormError, setInteriorInfoFormError] =
    useState<IInteriorInfoFormError>("");

  const [exteriorInfoFormError, setExteriorInfoFormError] =
    useState<IExteriorInfoFormError>("");

  const [propertyGeneralDetails, setPropertyGeneralDetails] =
    useState<IResidentialRentalGeneralInfo>({
      currency: rentalResidentialProperty
        ? rentalResidentialProperty.currency
        : "US$",
      numberOfRoomsToLet: rentalResidentialProperty
        ? rentalResidentialProperty.numberOfRoomsToLet.toString()
        : "",
      totalNumberOfRooms: rentalResidentialProperty
        ? rentalResidentialProperty.numberOfRooms.toString()
        : "",
      rentAmount: rentalResidentialProperty
        ? rentalResidentialProperty.rentAmount.toString()
        : "",
      sizeNumber: rentalResidentialProperty
        ? rentalResidentialProperty.sizeNumber.toString()
        : "",
      sizeDimensions: rentalResidentialProperty
        ? rentalResidentialProperty.sizeDimensions
        : "m²",
      type: rentalResidentialProperty ? rentalResidentialProperty.type : "",
      storeys: rentalResidentialProperty
        ? rentalResidentialProperty.storeys.toString()
        : "",
      yearBuilt: rentalResidentialProperty
        ? rentalResidentialProperty.yearBuilt === 0
          ? ""
          : rentalResidentialProperty.yearBuilt.toString()
        : "",
      location: rentalResidentialProperty
        ? rentalResidentialProperty.propertyLocation
        : undefined,
    });

  const [propertyInteriorInfo, setPropertyInteriorInfo] =
    useState<IResidentialRentalInteriorInfo>({
      bedrooms: rentalResidentialProperty
        ? rentalResidentialProperty.bedrooms.toString()
        : "",
      bathrooms: rentalResidentialProperty
        ? rentalResidentialProperty.bathrooms.toString()
        : "",
      isTiled: rentalResidentialProperty
        ? rentalResidentialProperty.isTiled
        : false,
      hasCeiling: rentalResidentialProperty
        ? rentalResidentialProperty.hasCeiling
        : false,
      isPlustered: rentalResidentialProperty
        ? rentalResidentialProperty.isPlustered
        : false,
      isPainted: rentalResidentialProperty
        ? rentalResidentialProperty.isPainted
        : false,
      hasElectricity: rentalResidentialProperty
        ? rentalResidentialProperty.hasElectricity
        : false,
      hasWater: rentalResidentialProperty
        ? rentalResidentialProperty.hasWater
        : false,
      otherInteriorFeatures: rentalResidentialProperty
        ? rentalResidentialProperty.otherInteriorFeatures.join(",")
        : "",
    });

  const [propertyExteriorInfo, setPropertyExteriorInfo] =
    useState<IResidentialRentalExteriorInfo>({
      numberOfGarages: rentalResidentialProperty
        ? rentalResidentialProperty.numberOfGarages.toString()
        : "",
      hasSwimmingPool: rentalResidentialProperty
        ? rentalResidentialProperty.hasSwimmingPool
        : false,
      isPaved: rentalResidentialProperty
        ? rentalResidentialProperty.isPaved
        : false,
      hasBoreHole: rentalResidentialProperty
        ? rentalResidentialProperty.hasBoreHole
        : false,
      typeOfExteriorSecurity: rentalResidentialProperty
        ? rentalResidentialProperty.typeOfExteriorSecurity
        : "",
      otherExteriorFeatures: rentalResidentialProperty
        ? rentalResidentialProperty.otherExteriorFeatures.join(",")
        : "",
    });

  const [otherPropertyInfo, setOtherPropertyInfo] =
    useState<IResidentialRentalOtherInfo>({
      tenantRequirements: rentalResidentialProperty
        ? rentalResidentialProperty.tenantRequirements.join(",")
        : "",
      marketingStatement: rentalResidentialProperty
        ? rentalResidentialProperty.marketingStatement
        : "",
      images: rentalResidentialProperty ? rentalResidentialProperty.media : [],
    });

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
      location.lat
        ? location
        : {
            display_address: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.displayName
              : "",
            display_name: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.displayName
              : "",
            display_place: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.displayName
              : "",
            address: {
              city: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.city
                : "",
              country: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.country
                : "",
              country_code: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.countryCode
                : "",
              county: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.county
                : "",
              state: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.province
                : "",
              surburb: rentalResidentialProperty
                ? rentalResidentialProperty.propertyLocation.surburb
                : "",
            },
            type: "",
            boundingbox: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.boundingbox
              : [],
            lat: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.lat
              : "",
            licence: "",
            lon: rentalResidentialProperty
              ? rentalResidentialProperty.propertyLocation.lon
              : "",
            osm_id: "",
            osm_type: "",
            class: "",
            place_id: "",
          }
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
      setIsUpdating(false);
    },
  });

  const handleSubmitProperty = () => {
    setIsUpdating(true);
    // const propertyToBeSubmitted: IResidentialRentalPropertyCreation =
    //   createPropertyToBeSubmitted(
    //     propertyGeneralDetails,
    //     propertyInteriorInfo,
    //     propertyExteriorInfo,
    //     otherPropertyInfo,
    //     manager,
    //     location
    //   );
    // submitPropertyMutation.mutate({
    //   property: propertyToBeSubmitted,
    //   accessToken,
    // });
  };

  const handleCloseSucessModal = () => {
    setPageNumber(1);
    // setOtherPropertyInfo(otherPropertyInfoInitialState);
    // setPropertyExteriorInfo(exteriorPropertyInfoInitialState);
    // setPropertyInteriorInfo(interiorPropertyInfoInitialState);
    // setPropertyGeneralDetails(generalPropertyInfoIntialState);
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
          isAddImagesBtnDisabled={isUpdating}
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
            isDisabled={isUpdating}
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
          title={isUpdating ? "loading" : pageNumber === 4 ? "submit" : "next"}
          isDisabled={isUpdating ? true : false}
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

export default UpdateResidentialRental;

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
