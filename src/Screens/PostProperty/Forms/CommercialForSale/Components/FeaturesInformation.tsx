import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ICommercialForSaleFeaturesInfo } from "../Types/FormTypes";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import InputField from "@/src/Components/InputField/InputField";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, red } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

type Props = {
  propertyDetails: ICommercialForSaleFeaturesInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<ICommercialForSaleFeaturesInfo>
  >;
};

const FeaturesInformation: React.FC<Props> = ({
  propertyDetails,
  setPropertyDetails,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.featuresContainer}>
        <View style={{ width: "100%" }}>
          <ThemedText type="subHeader" styles={{ textAlign: "left" }}>
            Features Information
          </ThemedText>
        </View>
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
        <View>
          <InputField
            textValue={propertyDetails.otherInteriorFeatures}
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
        <View>
          <InputField
            textValue={propertyDetails.otherExteriorFeatures}
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

export default FeaturesInformation;

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
  nbText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
});
