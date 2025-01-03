import { StyleSheet, View } from "react-native";
import React from "react";

import InputField from "@/src/Components/InputField/InputField";
import SelectedPropertyImageList from "@/src/Screens/PostProperty/Forms/Components/SelectedPropertyImagesList/SelectedPropertyImageList";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray } from "@/src/Theme/Colors";
import { IStandOtherInfo } from "../Types/FormTypes";

type Props = {
  propertyDetails: IStandOtherInfo;
  isAddImagesBtnDisabled: boolean;
  setPropertyDetails: React.Dispatch<React.SetStateAction<IStandOtherInfo>>;
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
  }
});
