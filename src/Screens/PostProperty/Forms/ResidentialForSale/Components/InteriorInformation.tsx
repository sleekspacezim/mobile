import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import {
  IInteriorInfoFormError,
  IResidentialForSaleInteriorInfo,
} from "../Types/FormTypes";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import InputField from "@/src/Components/InputField/InputField";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { red, gray } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

type Props = {
  formError: IInteriorInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IInteriorInfoFormError>>;
  propertyDetails: IResidentialForSaleInteriorInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialForSaleInteriorInfo>
  >;
};

const InteriorInformation: React.FC<Props> = ({
  formError,
  propertyDetails,
  setFormError,
  setPropertyDetails,
}) => {

  useEffect(() => {
    if (formError) {
      setFormError("");
    }
  }, [propertyDetails]);
  
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.featuresContainer}>
        <View style={{ width: "100%" }}>
          <ThemedText type="subHeader" styles={{ textAlign: "left" }}>
            Interior Information
          </ThemedText>
        </View>
        <Row style={styles.row}>
          <View>
            <InputField
              textValue={propertyDetails?.bedrooms}
              placeHolder=""
              width={100}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, bedrooms: e })
              }
              height={50}
              contentType="none"
              type="number"
              label="Bedrooms"
              backgroundColor="transparent"
              isRequired
              borderColor={formError === "bedrooms" ? red : gray}
            />
            {formError === "bedrooms" && (
              <Text style={styles.errorText}>invalid number</Text>
            )}
          </View>
          <View>
            <InputField
              textValue={propertyDetails?.bathrooms}
              placeHolder=""
              isRequired
              width={100}
              handleOnChangeText={(e) =>
                setPropertyDetails({ ...propertyDetails, bathrooms: e })
              }
              height={50}
              contentType="none"
              type="number"
              label="Bathrooms"
              backgroundColor="transparent"
              borderColor={formError === "bathrooms" ? red : gray}
            />
            {formError === "bathrooms" && (
              <Text style={styles.errorText}>invalid number</Text>
            )}
          </View>
        </Row>
        <CheckBoxField
          label="Has Electricity"
          value={propertyDetails.hasElectricity}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, hasElectricity: value })
          }
        />
        <CheckBoxField
          label="Has Water"
          value={propertyDetails.hasWater}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, hasWater: value })
          }
        />
        <CheckBoxField
          label="Has A Ceiling"
          value={propertyDetails.hasCeiling}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, hasCeiling: value })
          }
        />
        <CheckBoxField
          label="Has Tiles"
          value={propertyDetails.isTiled}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isTiled: value })
          }
        />
        <CheckBoxField
          label="Is Plustered"
          value={propertyDetails.isPlustered}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isPlustered: value })
          }
        />
        <CheckBoxField
          label="Is Painted"
          value={propertyDetails.isPainted}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isPainted: value })
          }
        />
        <View>
          <InputField
            textValue={propertyDetails?.otherInteriorFeatures}
            placeHolder=""
            width={"100%"}
            multiLine
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                otherInteriorFeatures: e,
              })
            }
            height={57}
            contentType="none"
            type="default"
            label="Other Interior Features"
            backgroundColor="transparent"
            borderColor={gray}
          />
          <Text style={styles.nbText}>
            *Please separate the features with a comma.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InteriorInformation;

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
  nbText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
});
