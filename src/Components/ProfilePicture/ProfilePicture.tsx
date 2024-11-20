import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite } from "@/src/Theme/Colors";
import MediaModal from "@/src/Components/Modals/MediaModal/MediaModal";
import { imageBlurhash } from "@/src/Utils/Constants";

const ProfilePicture: React.FC<{
  uri: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  setImageBase64?: React.Dispatch<React.SetStateAction<string>>;
  setImageType?: React.Dispatch<React.SetStateAction<string>>;
  setImageSize?: React.Dispatch<React.SetStateAction<number>>;
  hideCameraOptions?: boolean;
  size?: "large" | "small";
  belongsTo?:"manager"|"user"
}> = ({
  uri,
  setImage,
  hideCameraOptions,
  size,
  setImageBase64,
  setImageSize,
  setImageType,
  belongsTo
}) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const [timeStamp, setTimeStamp] = useState<number | null>(null);
  
  useEffect(() => {
    if (uri) {
      setTimeStamp(Date.now());
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={
          uri
            ? { uri: uri + `?timestamp=${timeStamp}` }
            : require("./Images/emptyProfile.jpg")
        }
        placeholder={{ blurhash: imageBlurhash }}
        style={[
          styles.image,
          {
            height: size === "large" ? 200 : 140,
            width: size === "large" ? 200 : 140,
            borderRadius: size === "large" ? 100 : 70,
          },
        ]}
      />
      {!hideCameraOptions && (
        <Pressable
          style={[
            styles.cameraIcon,
            {
              backgroundColor: theme === "light" ? "#372b47" : "#1f1926",
              bottom: size === "large" ? 10 : 0,
            },
          ]}
          onPress={() => setOpenEditModal(true)}
        >
          <Feather name="camera" size={24} color={pureWhite} />
        </Pressable>
      )}
      {!hideCameraOptions && (
        <MediaModal
          isModalVisible={openEditModal}
          handleCancel={() => setOpenEditModal(false)}
          type="profile-Photo"
          belongsTo={belongsTo}
          uri={uri}
          setImage={setImage}
          setImageBase64={setImageBase64}
          setMediaSize={setImageSize}
          setMediaType={setImageType}
        />
      )}
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  cameraIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
