import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import MessageModal from "@/src/Components/Modals/MessageModal";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  BUTTON_MAX_WIDTH,
} from "@/src/Utils/Constants";
import { generateRandomSixDigitNumber } from "@/src/Utils/Funcs";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import ProfilePicture from "@/src/Components/ProfilePicture/ProfilePicture";
import { UpdateManagerProfilePicture } from "@/src/HttpServices/Mutations/Manager/ProfilePictureHttFuncs";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";

const ProfilePictureUpdate: INoPropsReactComponent = () => {
  const [image, setImage] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0);
  const { accessToken } = useAppSelector((state) => state.user.value);
  const manager = useAppSelector((state) => state.managerAccount.value);
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateManagerProfilePicture,
    onSuccess: (res) => {
      dispatch(addManagerAccount(res.data.response));
      setOpenSuccessModal(true);
    },
    onError: (error: any) => {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else {
        setUpdateError("Something went wrong");
      }
    },
  });

  const handleProfilePictureUpdate = () => {
    if (!manager.profilePicture.uri && !image) {
      setUpdateError("please choose a picture to upload!");
    } else if (!manager.profilePicture.uri && image) {
      mutate({
        accessToken,
        managerId: manager.id,
        managerProfilePicture: {
          name: generateRandomSixDigitNumber() + manager.name,
          fileType: imageType,
          contentType: "image",
          image: imageBase64,
          size: imageSize,
          id: manager.profilePicture.id,
          managerId: manager.id,
        },
      });
    } else if (manager.profilePicture.uri && image) {
      mutate({
        accessToken,
        managerId: manager.id,
        managerProfilePicture: {
          id: manager.profilePicture.id,
          name: manager.profilePicture.name,
          fileType: imageType,
          contentType: "image",
          image: imageBase64,
          size: imageSize,
          managerId: manager.profilePicture.managerId,
        },
      });
    } else {
      setUpdateError("please choose a picture to upload!");
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    router.back();
  };

  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <ProfilePicture
              uri={
                image
                  ? image
                  : manager.profilePicture
                  ? manager.profilePicture.uri
                  : ""
              }
              setImage={setImage}
              setImageBase64={setImageBase64}
              setImageSize={setImageSize}
              setImageType={setImageType}
              size="large"
              belongsTo="manager"
            />
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
            <CustomButton
              title={isPending ? "loading" : "update"}
              onPressFunc={handleProfilePictureUpdate}
              isDisabled={isPending}
            />
          </View>
          <MessageModal
            isModalVisible={openSuccessModal}
            header="Account Updated!"
            message="your profile picture was updated successfully, it will take a few moments to reflect."
            type="success"
            handleCancel={handleCloseSuccessModal}
          />
          <MessageModal
            isModalVisible={updateError ? true : false}
            header="Update Failed!"
            message={updateError}
            type="error"
            handleCancel={() => setUpdateError("")}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default ProfilePictureUpdate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    gap: 10,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    flex: 1,
  },
  btnContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginTop: 20,
  },
});
