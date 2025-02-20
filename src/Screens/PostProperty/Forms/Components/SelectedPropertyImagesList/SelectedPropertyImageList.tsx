import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

import ThemedText from "../../../../../Components/ThemedText/ThemedText";
import {
  activeOpacityOfTouchableOpacity,
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  maxPropertyImages,
} from "@/src/Utils/Constants";
import { dark, gray, light, primary, red, white } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import CustomButton from "../../../../../Components/Buttons/Custom/CustomButton";
import MediaModal from "../../../../../Components/Modals/MediaModal/MediaModal";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IStandOtherInfo } from "@/src/Screens/PostProperty/Forms/Stand/Types/FormTypes";
import { ILandOtherInfo } from "@/src/Screens/PostProperty/Forms/Land/Types/FormTypes";
import { IResidentialForSaleOtherInfo } from "@/src/Screens/PostProperty/Forms/ResidentialForSale/Types/FormTypes";
import { IResidentialRentalOtherInfo } from "@/src/Screens/PostProperty/Forms/ResidentialRental/Types/FormTypes";
import { ICommercialForSaleOtherInfo } from "@/src/Screens/PostProperty/Forms/CommercialForSale/Types/FormTypes";
import { ICommercialRentalOtherInfo } from "@/src/Screens/PostProperty/Forms/CommercialRental/Types/FormTypes";
import Row from "../../../../../Components/Row/Row";

type ICustomImageType = {
  uri: string;
  assetId?: string | null;
  width: number;
  height: number;
  type?: "image" | "video";
  fileName?: string | null;
  fileSize?: number;
  exif?: Record<string, any> | null;
  base64?: string | null;
  duration?: number | null;
  mimeType?: string;
  isSelected: boolean;
};

type Props = {
  isAddImagesBtnDisabled: boolean;
  propertyDetails:
    | IStandOtherInfo
    | ILandOtherInfo
    | IResidentialForSaleOtherInfo
    | IResidentialRentalOtherInfo
    | ICommercialForSaleOtherInfo
    | ICommercialRentalOtherInfo;
  setPropertyDetails: (data:any)=>void
};

const SelectedPropertyImageList: React.FC<Props> = ({
  isAddImagesBtnDisabled,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [isImageLongPressed, setIsImageLongPressed] = useState<boolean>(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ICustomImageType[]>([]);
  const [openMediaModal, setOpenMediaModal] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();

  const convertImagePickerTypeToCustomImageType = () => {
    const processedImages: ICustomImageType[] = [];
    propertyDetails.images.forEach((image) => {
      const newImage: ICustomImageType = { ...image, isSelected: false };
      processedImages.push(newImage);
    });
    return processedImages;
  };

  const convertCustomImageTypeToImagePickerType = () => {
    const processedImages: ImagePicker.ImagePickerAsset[] = [];
    selectedImages.forEach((image) => {
      if (!image.isSelected) {
        const newImage: ImagePicker.ImagePickerAsset = {
          uri: image.uri,
          assetId: image.assetId,
          width: image.width,
          height: image.height,
          type: image.type,
          fileName: image.fileName,
          fileSize: image.fileSize,
          exif: image.exif,
          base64: image.base64,
          duration: image.duration,
          mimeType: image.mimeType,
        };
        processedImages.push(newImage);
      }
    });
    return processedImages;
  };

  useEffect(() => {
    setSelectedImages(convertImagePickerTypeToCustomImageType());
  }, [propertyDetails.images]);

  const longPressFunc = (image: ICustomImageType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsImageLongPressed(true);
    setSelectedImages((prevList) => {
      const newList = [...prevList];
      newList.forEach((item) => {
        if (image.uri === item.uri) {
          item.isSelected = !item.isSelected;
        }
      });
      return newList;
    });
  };

  const onPressFunc = (image: ICustomImageType) => {
    if (isImageLongPressed) {
      setSelectedImageUri(image.uri);
      setSelectedImages((prevList) => {
        const newList = [...prevList];
        newList.forEach((item) => {
          if (image.uri === item.uri) {
            item.isSelected = !item.isSelected;
          }
        });
        return newList;
      });
    }
  };

  const deleteSelectedImages = () => {
    setPropertyDetails({
      ...propertyDetails,
      images: convertCustomImageTypeToImagePickerType(),
    });
  };

  const handleCancelSelectedImages = () => {
    setSelectedImages((prevList) => {
      const newList = [...prevList];
      newList.forEach((item) => {
        item.isSelected = false;
      });
      return newList;
    });
    setIsImageLongPressed(false);
  };

  return (
    <View style={styles.constainer}>
      <Row
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom:2
        }}
      >
        <ThemedText type="regular">{`Total Images: ${propertyDetails.images.length}`}</ThemedText>
        {isImageLongPressed && (
          <TouchableOpacity
            activeOpacity={activeOpacityOfTouchableOpacity}
            onPress={handleCancelSelectedImages}
          >
            <Text style={styles.nbText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </Row>
      <View style={styles.imagesContainer}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={activeOpacityOfTouchableOpacity}
            onLongPress={() => longPressFunc(image)}
            onPress={() => onPressFunc(image)}
            style={styles.imageContainer}
          >
            {isImageLongPressed && !image.isSelected && (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color={white}
                style={styles.icon}
              />
            )}
            {isImageLongPressed && image.isSelected && (
              <MaterialIcons
                name="check-box"
                size={24}
                color={primary}
                style={styles.icon}
              />
            )}
            <Image source={{ uri: image.uri }} style={styles.picture} />
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={[
          styles.btnContainer,
          {
            width:
              width > BUTTON_SIZE_SCREEN_BREAK_POINT
                ? BUTTON_MAX_WIDTH
                : "100%",
          },
        ]}
      >
        {isImageLongPressed && (
          <CustomButton
            title="Delete Selected Images"
            color={red}
            iconPosition="left"
            icon={<AntDesign name="delete" size={24} color={white} />}
            isDisabled={isAddImagesBtnDisabled}
            onPressFunc={deleteSelectedImages}
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

export default SelectedPropertyImageList;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    alignItems:'center'
  },
  imagesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  imageContainer: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 2,
  },
  picture: {
    width: 90,
    height: 80,
    borderRadius: 5,
  },
  nbText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
  btnContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: -7,
  },
});
