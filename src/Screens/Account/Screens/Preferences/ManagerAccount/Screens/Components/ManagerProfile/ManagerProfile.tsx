import { Fontisto, Feather, FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import ProfilePicture from "@/src/Components/ProfilePicture/ProfilePicture";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import MessageModal from "@/src/Components/Modals/MessageModal";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { light, dark, primary, red } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT, BUTTON_MAX_WIDTH } from "@/src/Utils/Constants";
import {
  getManagerContactNumber,
  handleLayout,
  shortenString,
} from "@/src/Utils/Funcs";
import { styles } from "./Styles";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { deleteManager } from "@/src/HttpServices/Mutations/Manager/ManagerHttpFunctions";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";

const ManagerProfile: INoPropsReactComponent = () => {
  const user = useAppSelector((state) => state.user.value);
  const [deleteAccountLoader, setDeleteAccountLoader] =
    useState<boolean>(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] =
    useState<boolean>(false);
  const [deleteAccountError, setdeleteAccountError] = useState<string>("");
  const [detailsViewHeight, setDetailsViewHeight] = useState<number>(0);
  const [infoViewHeight, setInfoViewHeight] = useState<number>(0);
  const [openDeleteAccountConfirmation, setOpenDeleteAccountConfirmation] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const manager = useAppSelector((state) => state.managerAccount.value);
  const iconSize = 25;
  const iconColor = primary;
  const { width, height } = useWindowDimensions();

  const personalDetails = [
    {
      name: "Email",
      value: manager.email ? shortenString(manager.email, 28) : "-----",
      icon: <Fontisto name="email" size={iconSize} color={iconColor} />,
    },
    {
      name: "Phone",
      value: getManagerContactNumber(manager.contacts, "phone"),
      icon: <Feather name="phone" size={iconSize} color={iconColor} />,
    },
    {
      name: "WhatsApp",
      value: getManagerContactNumber(manager.contacts, "whatsapp"),
      icon: <FontAwesome name="whatsapp" size={iconSize} color={iconColor} />,
    },
  ];

  const deleteAccountMutation = useMutation({
    mutationFn: deleteManager,
    onSuccess(_data) {
      setOpenDeleteSuccessModal(true);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setdeleteAccountError(error.response?.data?.error);
      } else setdeleteAccountError("Something went wrong");
    },
    onSettled: () => {
      setDeleteAccountLoader(false);
    },
  });

  const handleDeleteAccount = () => {
    setOpenDeleteAccountConfirmation(false);
    setDeleteAccountLoader(true);
    deleteAccountMutation.mutate({
      id: manager.id ? manager.id : 0,
      accessToken: user.accessToken,
    });
  };

  const handleCancelDeleteAccountSuccessModal = () => {
    dispatch(
      addManagerAccount({
        id: 0,
        name: "",
        email: "",
        contacts: [],
        userId: 0,
        profilePicture: null,
      })
    );
    router.replace("/account");
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.managerDetails}
        onLayout={(e) => handleLayout(e, setDetailsViewHeight)}
      >
        <ProfilePicture
          uri={manager.profilePicture ? manager.profilePicture.uri : ""}
          hideCameraOptions
        />
        <ThemedText type="header">{shortenString(manager.name, 30)}</ThemedText>
        <Text
          style={[
            styles.emailText,
            { color: theme === "light" ? light.text : dark.text },
          ]}
        >
          {manager.email
            ? manager.email
            : "your account does not have an email, please press edit and add one."}
        </Text>
      </View>
      <View
        style={[
          styles.wrapper,
          { width: width > SCREEN_BREAK_POINT ? 600 : "100%" },
        ]}
      >
        <View style={styles.row}>
          <Text
            style={[
              styles.subHeaderText,
              { color: theme === "light" ? light.text : dark.text },
            ]}
          >
            Manager Account Information
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/account/manager/update")}
          >
            <Text style={styles.editText}>edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.infoContainer}
          onLayout={(e) => handleLayout(e, setInfoViewHeight)}
        >
          {personalDetails.map(({ name, value, icon }) => (
            <View
              style={[
                styles.personalDetail,
                {
                  backgroundColor:
                    theme === "light" ? light.background : dark.darkGray,
                },
              ]}
              key={name}
            >
              <View style={styles.personalDetailIconAndText}>
                {icon}
                <ThemedText type="regular">{name}</ThemedText>
              </View>
              <ThemedText type="regular">{value}</ThemedText>
            </View>
          ))}
        </View>
        <View
          style={[
            styles.btnContainer,
            {
              width: width > SCREEN_BREAK_POINT ? BUTTON_MAX_WIDTH : "100%",
              height: height - (infoViewHeight + detailsViewHeight + 140),
            },
          ]}
        >
          <CustomButton
            title={"View My Properties"}
            color={primary}
            onPressFunc={() => router.push("account/manager/properties")}
            isDisabled={deleteAccountLoader}
          />
          <CustomButton
            title={deleteAccountLoader ? "loading" : "Delete Manager Account"}
            color={red}
            onPressFunc={() => setOpenDeleteAccountConfirmation(true)}
            isDisabled={deleteAccountLoader}
          />
        </View>
        <MessageModal
          handleCancel={() => setOpenDeleteAccountConfirmation(false)}
          isModalVisible={openDeleteAccountConfirmation}
          message="Are your sure you want to delete your property management account"
          header="Delete Account?"
          type="confirmation"
          handleConfirm={handleDeleteAccount}
        />
        <MessageModal
          handleCancel={() => setdeleteAccountError("")}
          isModalVisible={deleteAccountError ? true : false}
          message={deleteAccountError}
          header="Delete Failed"
          type="error"
        />
        <MessageModal
          handleCancel={handleCancelDeleteAccountSuccessModal}
          isModalVisible={openDeleteSuccessModal}
          message={
            "your property management account was successfully deleted, we hope you will create another soon."
          }
          header="Account Deleted!"
          type="success"
        />
      </View>
    </View>
  );
};

export default ManagerProfile;
