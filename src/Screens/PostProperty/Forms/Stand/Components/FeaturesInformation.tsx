import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { IStandFeaturesInfo } from "../Types/FormTypes";
import CheckBoxField from "@/src/Components/CheckBox/CheckBoxField";
import InputField from "@/src/Components/InputField/InputField";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, red } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

type Props = {
  propertyDetails: IStandFeaturesInfo;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IStandFeaturesInfo>
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
          label="Area Has Electricity"
          value={propertyDetails.areaHasElectricity}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, areaHasElectricity: value })
          }
        />
        <CheckBoxField
          label="Is Serviced"
          value={propertyDetails.isServiced}
          setChecked={(value: boolean) =>
            setPropertyDetails({ ...propertyDetails, isServiced: value })
          }
        />
        <View>
          <InputField
            textValue={propertyDetails.otherDetails}
            placeHolder=""
            width={"100%"}
            multiLine
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                otherDetails: e,
              })
            }
            height={57}
            contentType="none"
            type="default"
            label="Other Details"
            backgroundColor="transparent"
            borderColor={gray}
          />
          <Text style={styles.nbText}>
            *Please separate the details with a comma.
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
