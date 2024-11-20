import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import InputField from "@/src/Components/InputField/InputField";
import MediaModal from "@/src/Components/Modals/MediaModal/MediaModal";
import SelectedPropertyImageList from "@/src/Components/SelectedPropertyImagesList/SelectedPropertyImageList";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { gray, light, dark, red, white } from "@/src/Theme/Colors";
import { family, small, medium } from "@/src/Theme/Font";
import { maxPropertyImages } from "@/src/Utils/Constants";
import { IResidentialForSaleOtherInfo } from "../Types/FormTypes";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";

type Props = {
  propertyDetails: IResidentialForSaleOtherInfo;
  isAddImagesBtnDisabled: boolean;
  setPropertyDetails: React.Dispatch<
    React.SetStateAction<IResidentialForSaleOtherInfo>
  >;
};

const OtherInformation: React.FC<Props> = ({
  propertyDetails,
  isAddImagesBtnDisabled,
  setPropertyDetails,
}) => {
  const [openMediaModal, setOpenMediaModal] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();

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
        <View style={styles.btnContainer}>
          {propertyDetails.images.length > 0 && (
            <SelectedPropertyImageList images={propertyDetails.images} />
          )}
          {propertyDetails.images.length > 0 && (
            <CustomButton
              title="Delete Images"
              color={red}
              iconPosition="left"
              icon={<AntDesign name="delete" size={24} color={white} />}
              isDisabled={isAddImagesBtnDisabled}
              onPressFunc={() =>
                setPropertyDetails({ ...propertyDetails, images: [] })
              }
            />
          )}
          <CustomButton
            title="Add Property Images"
            textColor={gray}
            color={theme === "light" ? light.background : dark.darkGray}
            iconPosition="left"
            icon={<FontAwesome name="image" size={24} color={gray} />}
            isDisabled={isAddImagesBtnDisabled}
            onPressFunc={() => setOpenMediaModal(true)}
          />
          <Text style={styles.nbText}>
            {`*You can upload a maximum of ${maxPropertyImages} images`}
          </Text>
        </View>
      </View>
      <MediaModal
        isModalVisible={openMediaModal}
        handleCancel={() => setOpenMediaModal(false)}
        type="property-Photo"
        uri=""
        setPropertyImages={(e: ImagePicker.ImagePickerAsset[]) =>
          setPropertyDetails({ ...propertyDetails, images: e })
        }
      />
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
  row: {
    gap: 8,
    width: "100%",
  },
  nbText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addImages: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    borderRadius: 7,
    marginTop: 20,
  },
  text: {
    fontFamily: family,
    marginTop: 5,
    color: gray,
    fontSize: medium,
  },
});
