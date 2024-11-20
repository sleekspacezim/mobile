import { Modal, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import GrantedPermissionView from "./Components/GrantedPermissionView";
import DeniedPermissionView from "./Components/DeniedPermissionView";
import { maxPropertyImages } from "@/src/Utils/Constants";

type Props = {
  handleCancel: IVoidFunc;
  isModalVisible: boolean;
  type: "profile-Photo" | "property-Photo";
  uri: string;
  setPropertyImages?: (images:ImagePicker.ImagePickerAsset[])=>void;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  setImageBase64?: React.Dispatch<React.SetStateAction<string>>;
  setMediaType?: React.Dispatch<React.SetStateAction<string>>;
  setMediaSize?: React.Dispatch<React.SetStateAction<number>>;
  belongsTo?: "manager" | "user";
};

const MediaModal: React.FC<Props> = ({
  handleCancel,
  isModalVisible,
  type,
  setImage,
  setImageBase64,
  setMediaSize,
  setMediaType,
  setPropertyImages,
  belongsTo,
  uri,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useAppSelector((state) => state.theme.value);
  const[isLoading,setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    requestPermission();
  }, []);

  const captureMediaInformation = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && setImage && setImageBase64) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 as string);
      if (setMediaSize) {
        setMediaSize(result.assets[0].fileSize ? result.assets[0].fileSize : 0);
        handleCancel();
      }
      if (setMediaType) {
        setMediaType(
          result.assets[0].mimeType ? result.assets[0].mimeType : ""
        );
        handleCancel();
      }
    }
    if (type === "property-Photo" && setPropertyImages) {
      setPropertyImages(result.assets ? result.assets : []);
      handleCancel()
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: type === "profile-Photo" ? true : false,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
      allowsMultipleSelection: type === "profile-Photo" ? false : true,
      selectionLimit: maxPropertyImages,
    });
    captureMediaInformation(result);
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
      allowsMultipleSelection: type === "profile-Photo" ? false : true,
      selectionLimit: maxPropertyImages,
    });
    captureMediaInformation(result);
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCancel}
      transparent
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? "#000000b3" : "#333333b3",
          },
        ]}
      >
        {permission?.status === ImagePicker.PermissionStatus.GRANTED ? (
          <GrantedPermissionView
            openCamera={openCamera}
            openGallery={openGallery}
            type={type}
            uri={uri}
            handleCloseModal={handleCancel}
            belongsTo={belongsTo}
          />
        ) : (
          <DeniedPermissionView handleCancel={handleCancel} />
        )}
        </View>
    </Modal>
  );
};

export default MediaModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
