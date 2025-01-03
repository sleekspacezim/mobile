import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { IResidentialRentalOtherInfo } from "../Types/FormTypes";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import InputField from "@/src/Components/InputField/InputField";
import { gray, red } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import SelectedPropertyImageList from "@/src/Screens/PostProperty/Forms/Components/SelectedPropertyImagesList/SelectedPropertyImageList";

type Props = {
  propertyDetails: IResidentialRentalOtherInfo;
  isAddImagesBtnDisabled: boolean;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialRentalOtherInfo>
  >;
};

const OtherInformation: React.FC<Props> = ({
  propertyDetails,
  isAddImagesBtnDisabled,
  setPropertyDetails,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.featuresContainer}>
        <View style={{ width: "100%" }}>
          <ThemedText type="subHeader" styles={{ textAlign: "left" }}>
            Other Information
          </ThemedText>
        </View>
        <View>
          <InputField
            textValue={propertyDetails?.tenantRequirements}
            placeHolder=""
            width={"100%"}
            multiLine
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                tenantRequirements: e,
              })
            }
            height={57}
            contentType="none"
            type="default"
            label="What do you expect or require from tenants?"
            backgroundColor="transparent"
            borderColor={gray}
          />
          <Text style={styles.nbText}>
            *Separate the requirements with a comma.
          </Text>
        </View>
        <View>
          <InputField
            textValue={propertyDetails?.marketingStatement}
            placeHolder=""
            width={"100%"}
            multiLine
            handleOnChangeText={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                marketingStatement: e,
              })
            }
            height={57}
            contentType="none"
            type="default"
            label="Marketing Statement"
            backgroundColor="transparent"
            borderColor={gray}
          />
        </View>
        <SelectedPropertyImageList
          isAddImagesBtnDisabled={isAddImagesBtnDisabled}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
        />
      </View>
    </View>
  );
};

export default OtherInformation;

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
