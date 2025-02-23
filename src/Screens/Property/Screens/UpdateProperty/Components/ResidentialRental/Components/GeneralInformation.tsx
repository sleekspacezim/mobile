import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import CustomPicker from "@/src/Components/CustomPicker/CustomPicker";
import InputField from "@/src/Components/InputField/InputField";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { red, gray } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import {
  IGeneralInfoFormError,
  IResidentialRentalGeneralInfo,
} from "../Types/FormTypes";
import PropertyLocationInput from "@/src/Components/PropertyLocationInput/PropertyLocationInput";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { ICurrency } from "@/src/GlobalTypes/Property/Common";

type Props = {
  formError: IGeneralInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IGeneralInfoFormError>>;
  propertyDetails: IResidentialRentalGeneralInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialRentalGeneralInfo>
  >;
};

const GeneralInformation: React.FC<Props> = ({
  propertyDetails,
  setPropertyDetails,
  formError,
  setFormError,
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
              label: "Duplex",
              value: "Duplex",
            },
            {
              label: "Triplex",
              value: "Triplex",
            },
            {
              label: "Flat",
              value: "Flat",
            },
          ]}
        />
        <CustomPicker
          label="Number of rooms to Let"
          initialValue={propertyDetails.numberOfRoomsToLet}
          setValue={(value) =>
            setPropertyDetails({
              ...propertyDetails,
              numberOfRoomsToLet: value as string,
            })
          }
          pickerList={[
            {
              label: "One",
              value: "1",
            },
            {
              label: "Two",
              value: "2",
            },
            {
              label: "Three",
              value: "3",
            },
            {
              label: "Four",
              value: "4",
            },
            {
              label: "Five",
              value: "5",
            },
            {
              label: "Six",
              value: "6",
            },
            {
              label: "Full house",
              value: "fullHouse",
            },
          ]}
        />

        <View>
          <InputField
            textValue={propertyDetails?.totalNumberOfRooms}
            placeHolder=""
            width={160}
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                totalNumberOfRooms: e,
              })
            }
            height={57}
            contentType="none"
            type="number"
            label="Total number of rooms"
            backgroundColor="transparent"
            isRequired
            borderColor={
              formError === "totalNumberOfpropertyRooms" ? red : gray
            }
          />
          {formError === "totalNumberOfpropertyRooms" && (
            <Text style={styles.errorText}>invalid size</Text>
          )}
        </View>

        <View>
          <PropertyLocationInput
            borderColor={formError === "location" ? red : gray}
            propertyLocationValue={propertyDetails.location?.displayName}
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
