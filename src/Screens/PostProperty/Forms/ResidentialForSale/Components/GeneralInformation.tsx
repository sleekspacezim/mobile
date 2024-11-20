import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import {
  IGeneralInfoFormError,
  IResidentialForSaleGeneralInfo,
} from "../Types/FormTypes";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { family } from "@/src/Theme/Font";
import { gray, red } from "@/src/Theme/Colors";
import CustomPicker from "@/src/Components/CustomPicker/CustomPicker";
import InputField from "@/src/Components/InputField/InputField";
import PropertyLocationInput from "@/src/Components/PropertyLocationInput/PropertyLocationInput";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";

type Props = {
  formError: IGeneralInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IGeneralInfoFormError>>;
  propertyDetails: IResidentialForSaleGeneralInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialForSaleGeneralInfo>
  >;
};

const GeneralInformation: React.FC<Props> = ({
  formError,
  setFormError,
  setPropertyDetails,
  propertyDetails,
}) => {
  const location = useAppSelector((state) => state.mapLocation.value);
  useEffect(() => {
    if (formError) {
      setFormError("");
    }
    if (formError && !location.lat) {
      setFormError("");
    }
  }, [propertyDetails, location]);
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
              textValue={propertyDetails?.price}
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
        <CheckBoxField
          label="Is negotiable"
          value={propertyDetails.isNegotiable}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isNegotiable: value })
          }
        />
        <CustomPicker
          label="Property Type"
          initialValue={propertyDetails.type}
          setValue={(value) =>
            setPropertyDetails({ ...propertyDetails, type: value as string })
          }
          pickerList={[
            {
              label: "Single family home",
              value: "Single family home",
            },
            {
              label: "Multi family complex",
              value: "Multi family complex",
            },
            {
              label: "Boys khaya/Cottage",
              value: "Cottage",
            },
            {
              label: "Apartment/Flat",
              value: "Apartment",
            },
            {
              label: "Duplex",
              value: "Duplex",
            },
            {
              label: "Triplex",
              value: "Triplex",
            },
          ]}
        />

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
              },
              {
                label: "Hectares",
                value: "Ha",
              },
            ]}
          />
        </Row>
        <Row style={styles.row}>
          <View>
            <InputField
              textValue={propertyDetails?.storeys}
              isRequired
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
