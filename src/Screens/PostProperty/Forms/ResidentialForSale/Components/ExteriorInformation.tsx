import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import {
  IExteriorInfoFormError,
  IResidentialForSaleExteriorInfo,
} from "../Types/FormTypes";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import CustomPicker from "@/src/Components/CustomPicker/CustomPicker";
import InputField from "@/src/Components/InputField/InputField";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { red, gray } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

type Props = {
  formError: IExteriorInfoFormError;
  setFormError: React.Dispatch<React.SetStateAction<IExteriorInfoFormError>>;
  propertyDetails: IResidentialForSaleExteriorInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialForSaleExteriorInfo>
  >;
};

const ExteriorInformation: React.FC<Props> = ({
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
            Exterior Information
          </ThemedText>
        </View>
        <View>
          <InputField
            textValue={propertyDetails?.numberOfGarages}
            placeHolder=""
            width={200}
            handleOnChangeText={(e) =>
              setPropertyDetails({ ...propertyDetails, numberOfGarages: e })
            }
            height={50}
            contentType="none"
            type="number"
            label="Number Of Garages"
            backgroundColor="transparent"
            isRequired
            borderColor={formError === "numberOfGarages" ? red : gray}
          />
          {formError === "numberOfGarages" && (
            <Text style={styles.errorText}>invalid number</Text>
          )}
        </View>
        <CustomPicker
          label="Exterior Security Type"
          initialValue={propertyDetails.typeOfExteriorSecurity}
          setValue={(value) =>
            setPropertyDetails({
              ...propertyDetails,
              typeOfExteriorSecurity: value as string,
            })
          }
          pickerList={[
            {
              label: "Jira Wall",
              value: "Jira Wall",
            },
            {
              label: "Fence",
              value: "Fence",
            },
            {
              label: "Hedge",
              value: "Hedge",
            },
            {
              label: "Fence And Jira wall",
              value: "Fence And Jira wall",
            },
            {
              label: "Hedge And Jira wall",
              value: "Hedge And Jira wall",
            },
            {
              label: "Fence And hedge",
              value: "Fence And hedge",
            },
            {
              label: "All 3 combined",
              value: "Fence, Hedge And Jira wall",
            },
            {
              label: "None",
              value: "None",
            },
          ]}
        />
        <CheckBoxField
          label="Has A Borehole"
          value={propertyDetails.hasBoreHole}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, hasBoreHole: value })
          }
        />
        <CheckBoxField
          label="Is Paved"
          value={propertyDetails.isPaved}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isPaved: value })
          }
        />
        <CheckBoxField
          label="Has A Swimming Pool"
          value={propertyDetails.hasSwimmingPool}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, hasSwimmingPool: value })
          }
        />
        <View>
          <InputField
            textValue={propertyDetails?.otherExteriorFeatures}
            placeHolder=""
            width={"100%"}
            multiLine
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                otherExteriorFeatures: e,
              })
            }
            height={57}
            contentType="none"
            type="default"
            label="Other Exterior Features"
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

export default ExteriorInformation;

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
