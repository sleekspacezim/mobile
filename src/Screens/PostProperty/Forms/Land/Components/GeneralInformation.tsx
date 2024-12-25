import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { family } from "@/src/Theme/Font";
import { red, gray } from "@/src/Theme/Colors";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import CustomPicker from "@/src/Components/CustomPicker/CustomPicker";
import InputField from "@/src/Components/InputField/InputField";
import PropertyLocationInput from "@/src/Components/PropertyLocationInput/PropertyLocationInput";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { IGeneralInfoFormError, ILandGeneralInfo } from "../Types/FormTypes";
import { ICurrency } from "@/src/GlobalTypes/Property/Common";

type Props = {
  formError: IGeneralInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IGeneralInfoFormError>>;
  propertyDetails: ILandGeneralInfo;
  setPropertyDetails: React.Dispatch<React.SetStateAction<ILandGeneralInfo>>;
};

const GeneralInformation: React.FC<Props> = ({
  formError,
  setFormError,
  setPropertyDetails,
  propertyDetails,
}) => {
  const location = useAppSelector((state) => state.mapLocation.value);
  const [showOtherLandTypeInput, setShowOtherLandTypeInput] =
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
      setShowOtherLandTypeInput(true);
    } else {
      setShowOtherLandTypeInput(false);
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
              textValue={propertyDetails.price}
              isRequired
              placeHolder=""
              width={120}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, price: e })
              }
              height={57}
              contentType="none"
              type="number"
              label="Price"
              backgroundColor="transparent"
              borderColor={formError === "price" ? red : gray}
            />
            {formError === "price" && (
              <Text style={styles.errorText}>invalid amount</Text>
            )}
          </View>
        </Row>
        <CustomPicker
          label="Land Type"
          initialValue={propertyDetails.type}
          setValue={(value) =>
            setPropertyDetails({ ...propertyDetails, type: value as string })
          }
          pickerList={[
            {
              label: "Residential",
              value: "Residential",
            },
            {
              label: "Farm",
              value: "Farm",
            },
            {
              label:"Plot",
              value:"Plot"
            },
            {
              label: "Mine",
              value: "Mine",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
        />
        {showOtherLandTypeInput && (
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
              label="Other Land Type"
              backgroundColor="transparent"
              isRequired
              borderColor={formError === "type" ? red : gray}
            />
            {formError === "type" && (
              <Text style={styles.errorText}>invalid land type</Text>
            )}
          </View>
        )}

        <CheckBoxField
          label="Is Negotiable"
          value={propertyDetails.isNegotiable}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isNegotiable: value })
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
              label="Land Size"
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
