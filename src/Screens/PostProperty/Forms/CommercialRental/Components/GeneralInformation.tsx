import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import {
  ICommercialRentalGeneralInfo,
  IGeneralInfoFormError,
} from "../Types/FormTypes";
import { family } from "@/src/Theme/Font";
import { gray, red } from "@/src/Theme/Colors";
import CustomPicker from "@/src/Components/CustomPicker/CustomPicker";
import InputField from "@/src/Components/InputField/InputField";
import PropertyLocationInput from "@/src/Components/PropertyLocationInput/PropertyLocationInput";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import { ICurrency } from "@/src/GlobalTypes/Property/Common";

type Props = {
  formError: IGeneralInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IGeneralInfoFormError>>;
  propertyDetails: ICommercialRentalGeneralInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<ICommercialRentalGeneralInfo>
  >;
};

const GeneralInformation: React.FC<Props> = ({
  formError,
  setFormError,
  setPropertyDetails,
  propertyDetails,
}) => {
  const location = useAppSelector((state) => state.mapLocation.value);
  const [showOtherPropertyTypeInput, setShowOtherPropertyTypeInput] =
    useState<boolean>(false);

  useEffect(() => {
    if (formError) {
      setFormError("");
    }
    if (formError && !location.lat) {
      setFormError("");
    }
  }, [propertyDetails, location]);

  useEffect(() => {
    if (propertyDetails.type === "Other") {
      setShowOtherPropertyTypeInput(true);
    } else {
      setShowOtherPropertyTypeInput(false);
    }
  }, [propertyDetails.type]);

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.featuresContainer}>
        <View style={{ width: "100%" }}>
          <ThemedText type="subHeader" styles={{ textAlign: "left" }}>
            General Information
          </ThemedText>
        </View>
        <Row style={styles.row}>
          <CustomPicker
            label="Currency"
            initialValue={propertyDetails.currency}
            width={140}
            setValue={(value) =>
              setPropertyDetails({
                ...propertyDetails,
                currency: value as ICurrency,
              })
            }
            pickerList={[
              {
                label: "USD",
                value: "US$",
              },
              {
                label: "Rands",
                value: "R",
              },
              {
                label: "ZIG",
                value: "ZIG",
              },
            ]}
          />
          <View>
            <InputField
              textValue={propertyDetails?.rentAmount}
              isRequired
              placeHolder=""
              width={120}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, rentAmount: e })
              }
              height={57}
              contentType="none"
              type="number"
              label="Rent per month"
              backgroundColor="transparent"
              borderColor={formError === "rentAmount" ? red : gray}
            />
            {formError === "rentAmount" && (
              <Text style={styles.errorText}>invalid amount</Text>
            )}
          </View>
        </Row>
        <CustomPicker
          label="Property Type"
          initialValue={propertyDetails.type}
          setValue={(value) =>
            setPropertyDetails({ ...propertyDetails, type: value as string })
          }
          pickerList={[
            {
              label: "Shop",
              value: "Shop",
            },
            {
              label: "Land",
              value: "Land",
            },
            {
              label: "Building",
              value: "Building",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
        />
        {showOtherPropertyTypeInput && (
          <View>
            <InputField
              textValue={propertyDetails.otherType}
              placeHolder=""
              width={"100%"}
              handleOnChangeText={(e) =>
                setPropertyDetails({
                  ...propertyDetails,
                  otherType: e,
                })
              }
              height={57}
              contentType="none"
              type="default"
              label="Other Property Type"
              backgroundColor="transparent"
              isRequired
              borderColor={formError === "type" ? red : gray}
            />
            {formError === "type" && (
              <Text style={styles.errorText}>invalid property type</Text>
            )}
          </View>
        )}
        <View>
          <InputField
            textValue={propertyDetails?.numberOfRooms}
            placeHolder=""
            width={160}
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                numberOfRooms: e,
              })
            }
            height={57}
            contentType="none"
            type="number"
            label="Number of rooms"
            backgroundColor="transparent"
            borderColor={formError === "numberOfRooms" ? red : gray}
          />
          {formError === "numberOfRooms" && (
            <Text style={styles.errorText}>invalid size</Text>
          )}
        </View>

        <CheckBoxField
          label="Is FullSpace"
          value={propertyDetails.isFullSpace}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isFullSpace: value })
          }
        />

        <View>
          <PropertyLocationInput
            borderColor={formError === "location" ? red : gray}
            propertType={PropertyTypesEnum.ResidentialRentals}
          />
          {formError === "location" && (
            <Text style={styles.errorText}>invalid location</Text>
          )}
        </View>
        <Row style={styles.row}>
          <View>
            <InputField
              textValue={propertyDetails?.sizeNumber}
              placeHolder=""
              width={90}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, sizeNumber: e })
              }
              height={57}
              contentType="none"
              type="number"
              label="Property Size"
              backgroundColor="transparent"
              borderColor={formError === "propertySize" ? red : gray}
            />
            {formError === "propertySize" && (
              <Text style={styles.errorText}>invalid size</Text>
            )}
          </View>
          <CustomPicker
            label="Dimensions"
            initialValue={propertyDetails.sizeDimensions}
            width={190}
            setValue={(value) =>
              setPropertyDetails({
                ...propertyDetails,
                sizeDimensions: value as string,
              })
            }
            pickerList={[
              {
                label: "Square meters",
                value: "m²",
              },
              {
                label: "Acres",
                value: "Acres",
              }
            ]}
          />
        </Row>
        <Row style={styles.row}>
          <View>
            <InputField
              textValue={propertyDetails.storeys}
              placeHolder=""
              width={100}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, storeys: e })
              }
              height={57}
              contentType="none"
              type="number"
              label="Storeys"
              backgroundColor="transparent"
              borderColor={formError === "storeys" ? red : gray}
            />
            {formError === "storeys" && (
              <Text style={styles.errorText}>invalid size</Text>
            )}
          </View>
          <View>
            <InputField
              textValue={propertyDetails?.yearBuilt}
              placeHolder=""
              width={100}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, yearBuilt: e })
              }
              height={57}
              contentType="none"
              type="number"
              label="Year built"
              backgroundColor="transparent"
              borderColor={formError === "yearBuilt" ? red : gray}
            />
            {formError === "yearBuilt" && (
              <Text style={styles.errorText}>invalid year</Text>
            )}
          </View>
        </Row>
      </View>
    </View>
  );
};

export default GeneralInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  featuresContainer: {
    width: "100%",
    gap: 10,
  },
  row: {
    gap: 8,
    width: "100%",
  },
  errorText: {
    fontFamily: family,
    color: red,
    fontSize: 10,
  },
  pressable: {
    height: 57,
    width: 100,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 7,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
