import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import ThemedText from "@/src/Components/ThemedText/ThemedText";
import {
  primary,
  pureWhite,
  dark,
  light,
  gray,
  white,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import { removeUserProfilePictureHttpFunc } from "@/src/HttpServices/Mutations/User/ProfilePictureHttpFuncs";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";
import { removeManagerProfilePicture } from "@/src/HttpServices/Mutations/Manager/ProfilePictureHttFuncs";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";
import MessageModal from "../../MessageModal";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  type: "profile-Photo" | "property-Photo";
  uri: string;
  openCamera: () => Promise<void>;
  openGallery: () => Promise<void>;
  handleCloseModal: IVoidFunc;
  belongsTo?: "manager" | "user";
};

const GrantedPermissionView: React.FC<Props> = ({
  type,
  openCamera,
  openGallery,
  uri,
  belongsTo,
  handleCloseModal,
}) => {
  const [isRemoveImageLoading, setIsRemoveImageLoading] =
    useState<boolean>(false);
  const [isGalleryLoading, setIsGalleryLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [updateError, setUpdateError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const user = useAppSelector((state) => state.user.value);
  const manager = useAppSelector((state) => state.managerAccount.value);
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const iconSize = 27;
  const color = primary;

  useUpdateUser(userData);

  const removeUserProfileImageMutation = useMutation({
    mutationFn: removeUserProfilePictureHttpFunc,
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
    onSettled: () => setIsRemoveImageLoading(false),
  });

  const removeManagerProfileImageMutation = useMutation({
    mutationFn: removeManagerProfilePicture,
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
    onSettled: () => setIsRemoveImageLoading(false),
  });

  const removeImage = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (belongsTo === "manager") {
      setIsRemoveImageLoading(true);
      removeManagerProfileImageMutation.mutate({
        accessToken: user.accessToken,
        managerId: manager.id,
        managerProfilePicture: {
          id: manager.profilePicture.id,
          fileType: manager.profilePicture.fileType,
          contentType: manager.profilePicture.contentType,
          name: manager.profilePicture.name,
          managerId: manager.profilePicture.managerId,
          image: manager.profilePicture.uri,
          size: manager.profilePicture.size,
        },
      });
    }
    if (belongsTo === "user") {
      setIsRemoveImageLoading(true);
      removeUserProfileImageMutation.mutate({
        accessToken: user.accessToken,
        profilePictureId: user.profilePicture.id,
      });
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    handleCloseModal();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: width > 500 ? (uri ? 300 : 280) : 250,
          backgroundColor: theme === "light" ? pureWhite : dark.background,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="images" size={30} color={white} />
      </View>
      <ThemedText type="header">
        {type === "profile-Photo" ? "Profile Photo" : "Property Photos"}
      </ThemedText>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={openCamera}
          disabled={isGalleryLoading || isRemoveImageLoading ? true : false}
          activeOpacity={activeOpacityOfTouchableOpacity}
          style={[
            styles.mediaOption,
            {
              backgroundColor:
                theme === "light" ? light.darkGray : dark.darkGray,
            },
          ]}
        >
          <Feather name="camera" size={iconSize} color={color} />
          <Text style={styles.mediaOptionText}>camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            type === "property-Photo" && setIsGalleryLoading(true);
            openGallery();
          }}
          activeOpacity={activeOpacityOfTouchableOpacity}
          disabled={isGalleryLoading || isRemoveImageLoading ? true : false}
          style={[
            styles.mediaOption,
            {
              backgroundColor:
                theme === "light" ? light.darkGray : dark.darkGray,
            },
          ]}
        >
          {isGalleryLoading ? (
            <ButtonSpinner backGroundColor={primary} />
          ) : (
            <>
              <AntDesign name="picture" size={iconSize} color={color} />
              <Text style={styles.mediaOptionText}>gallery</Text>
            </>
          )}
        </TouchableOpacity>
        {uri && (
          <TouchableOpacity
            onPress={(e: GestureResponderEvent) => {
              removeImage(e);
            }}
            disabled={isGalleryLoading || isRemoveImageLoading ? true : false}
            style={[
              styles.mediaOption,
              {
                backgroundColor:
                  theme === "light" ? light.darkGray : dark.darkGray,
              },
            ]}
          >
            {isRemoveImageLoading ? (
              <ButtonSpinner backGroundColor={primary} />
            ) : (
              <>
                <AntDesign name="delete" size={iconSize} color={color} />
                <Text style={styles.mediaOptionText}>remove</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
      <MessageModal
        isModalVisible={openSuccessModal}
        header="Removal Successful"
        message="your profile picture was removed successfully, it will take a few moments to reflect."
        type="success"
        handleCancel={handleCloseSuccessModal}
      />
      <MessageModal
        isModalVisible={updateError ? true : false}
        header="Update Failed!"
        message={updateError}
        type="error"
        handleCancel={() => {
          setUpdateError("");
          handleCloseModal();
        }}
      />
    </View>
  );
};

export default GrantedPermissionView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderTopWidth: 3,
    borderTopColor: primary,
    paddingBottom: 15,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 150,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  mediaOption: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 65,
    borderRadius: 7,
    paddingTop: 6,
  },
  mediaOptionText: {
    fontFamily: family,
    fontSize: small,
    color: gray,
  },
  iconContainer: {
    position: "absolute",
    top: -25,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
  },
});
