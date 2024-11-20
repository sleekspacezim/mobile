import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import ProfilePicture from "@/src/Components/ProfilePicture/ProfilePicture";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import { generateRandomSixDigitNumber } from "@/src/Utils/Funcs";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import {
  createUserProfilePictureHttpFunc,
  updateUserProfilePictureHttpFunc,
} from "@/src/HttpServices/Mutations/User/ProfilePictureHttpFuncs";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";

const ProfilePictureUpdate: INoPropsReactComponent = () => {
  const [image, setImage] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);
  const user = useAppSelector((state) => state.user.value);
  const { width } = useWindowDimensions();
  useUpdateUser(userData);

  const profilePictureCreationMutation = useMutation({
    mutationFn: createUserProfilePictureHttpFunc,
    onSuccess: (res) => {
      setUserData(res.data.response);
      setOpenSuccessModal(true);
    },
    onError: (error: any) => {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else {
        setUpdateError("Something went wrong");
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const profilePictureUpdateMutation = useMutation({
    mutationFn: updateUserProfilePictureHttpFunc,
    onSuccess: (res) => {
      setUserData(res.data.response);
      setOpenSuccessModal(true);
    },
    onError: (error: any) => {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else {
        setUpdateError("Something went wrong");
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const handlePictureUpdate = async () => {
    if (!user.profilePicture.uri && !image) {
      setUpdateError("please choose a picture to upload!");
    } else if (!user.profilePicture.uri && image) {
      setIsLoading(true);
      profilePictureCreationMutation.mutate({
        accessToken: user.accessToken,
        profilePicture: {
          userId: user.id,
          contentType: "image",
          fileType: imageType,
          size: imageSize,
          name: `${generateRandomSixDigitNumber()}${user.id}`,
          image: imageBase64,
        },
      });
    } else if (user.profilePicture.uri && image) {
      setIsLoading(true);
      profilePictureUpdateMutation.mutate({
        accessToken: user.accessToken,
        profilePicture: {
          id: user.profilePicture.id,
          userId: user.profilePicture.userId,
          contentType: "image",
          fileType: imageType,
          size: imageSize,
          name: user.profilePicture.name,
          image: imageBase64,
        },
      });
    } else {
      setUpdateError("please choose a picture to upload!");
    }
  };

  const closeSuccessModal = () => {
    router.back();
    setOpenSuccessModal(false);
  };

  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <ProfilePicture
              uri={image ? image : user.profilePicture.uri}
              setImage={setImage}
              setImageBase64={setImageBase64}
              setImageSize={setImageSize}
              setImageType={setImageType}
              size="large"
              belongsTo="user"
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
              title={isLoading ? "loading" : "update"}
              onPressFunc={handlePictureUpdate}
              isDisabled={isLoading}
            />
          </View>
          <MessageModal
            isModalVisible={openSuccessModal}
            header="Update Successful"
            message="your profile picture was updated successfully, it will take a few moments to reflect."
            type="success"
            handleCancel={closeSuccessModal}
          />
          <MessageModal
            isModalVisible={updateError ? true : false}
            header="Update Failed"
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
