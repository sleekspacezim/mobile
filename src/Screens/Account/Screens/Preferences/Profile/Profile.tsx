import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import ThemedText from "@/src/Components/ThemedText/ThemedText";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import ProfilePicture from "../../../../../Components/ProfilePicture/ProfilePicture";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, light, primary, red } from "@/src/Theme/Colors";
import { styles } from "./Styles";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { createVerificationCodeForSecurityHttpFunc } from "@/src/HttpServices/Mutations/Auth/AuthHttpFunctions";
import { deleteUserHttpFunc } from "@/src/HttpServices/Mutations/User/UserHttpFunctions";
import {
  getContactNumber,
  processLocationDisplayName,
  saveSecureValue,
  shortenString,
} from "@/src/Utils/Funcs";
import {
  BUTTON_MAX_WIDTH,
  emptyUser,
  expoSecureValueKeyNames,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import { addAccessToken } from "@/src/Redux/Slices/UserSlice/User";
import SigninAndSignupBtn from "@/src/Components/SigninAndSignupBtns/SigninAndSignupBtn";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";

const Profile: INoPropsReactComponent = () => {
  const [openDeleteAccountConfirmation, setOpenDeleteAccountConfirmation] =
    useState<boolean>(false);
  const [openLogoutConfirmation, setOpenLogoutConfirmation] =
    useState<boolean>(false);
  const {
    familyName,
    givenName,
    email,
    contactNumbers,
    location,
    id,
    accessToken,
    profilePicture,
  } = useAppSelector((state) => state.user.value);
  const theme = useAppSelector((state) => state.theme.value);
  const [userData,setUserData] = useState<IUser|null>(null)
  const [resetLoader, setResetLoader] = useState<boolean>(false);
  const [deleteAccountLoader, setDeleteAccountLoader] =
    useState<boolean>(false);
  const [logoutLoader, setLogoutLoader] = useState<boolean>(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] =
    useState<boolean>(false);
  const [openResetSuccessModal, setOpenResetSuccessModal] =
    useState<boolean>(false);
  const [openLogoutSuccessModal, setOpenLogoutSuccessModal] =
    useState<boolean>(false);
  const [deleteAccountError, setdeleteAccountError] = useState<string>("");
  const [logoutError, setLogoutError] = useState<string>("");
  const [resetPasswordError, setResetPasswordError] = useState<string>("");
  const iconSize = 25;
  const iconColor = primary;
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const personalDetails = [
    {
      name: "Email",
      value: shortenString(email, 28),
      icon: <Fontisto name="email" size={iconSize} color={iconColor} />,
    },
    {
      name: "Phone",
      value: getContactNumber("phone", contactNumbers),
      icon: <Feather name="phone" size={iconSize} color={iconColor} />,
    },
    {
      name: "WhatsApp",
      value: getContactNumber("whatsapp", contactNumbers),
      icon: <FontAwesome name="whatsapp" size={iconSize} color={iconColor} />,
    },
    {
      name: "Location",
      value: location ? shortenString(processLocationDisplayName(location.displayName), 20) : "",
      icon: (
        <Ionicons name="location-outline" size={iconSize} color={iconColor} />
      ),
    },
  ];

  useUpdateUser(userData)

  const resetPasswordMutation = useMutation({
    mutationFn: createVerificationCodeForSecurityHttpFunc,
    onSuccess(_data) {
      setOpenResetSuccessModal(true);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setResetPasswordError(error.response?.data?.error);
      } else setResetPasswordError("Something went wrong");
    },
    onSettled: () => {
      setResetLoader(false);
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteUserHttpFunc,
    onSuccess(_data) {
      setUserData(emptyUser)
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

  const handleResetPassword = () => {
    setResetLoader(true);
    resetPasswordMutation.mutate({ email });
  };

  const handleDeleteAccount = () => {
    setOpenDeleteAccountConfirmation(false);
    setDeleteAccountLoader(true);
    deleteAccountMutation.mutate({ id, accessToken });
  };

  const handleLogOut = async () => {
    setOpenLogoutConfirmation(false);
    setLogoutLoader(true);
    try {
      await saveSecureValue(expoSecureValueKeyNames.accessToken, "");
      setUserData(emptyUser)
      setOpenLogoutSuccessModal(true);
    } catch (error) {
      setLogoutError("oops, failed to log you out, please try again.");
    } finally {
      () => setLogoutLoader(false);
    }
  };

  const handleCancelDeleteAccountSuccessModal = () => {
    saveSecureValue(expoSecureValueKeyNames.accessToken, "")
      .then((_) => {
        dispatch(addAccessToken(""));
        setOpenDeleteSuccessModal(false);
      })
      .catch((_) => {
        setdeleteAccountError("oops, failed to log you out, please try again.");
      });
    router.replace("/home");
  };

  return (
    <Screen>
      <StackScreen>
        {!accessToken && <SigninAndSignupBtn screenType="profile" />}
        {accessToken && (
          <View style={styles.container}>
            <View style={styles.userDetails}>
              <ProfilePicture uri={profilePicture.uri} hideCameraOptions />
              <ThemedText type="header">{`${givenName} ${familyName}`}</ThemedText>
              <Text
                style={[
                  styles.emailText,
                  { color: theme === "light" ? light.text : dark.text },
                ]}
              >
                {email}
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
                  Personal Information
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/account/profile/update")}
                >
                  <Text style={styles.editText}>edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoContainer}>
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
            </View>
            <View
              style={[
                styles.btnContainer,
                {
                  width: width > SCREEN_BREAK_POINT ? BUTTON_MAX_WIDTH : "100%",
                },
              ]}
            >
              <TouchableOpacity
                style={styles.resetPasswordBtn}
                onPress={handleResetPassword}
                disabled={resetLoader}
              >
                {resetLoader ? (
                  <ButtonSpinner backGroundColor={primary} />
                ) : (
                  <Text style={styles.resetPasswordText}>Reset Password</Text>
                )}
              </TouchableOpacity>
              {accessToken ? (
                <CustomButton
                  title={"Logout"}
                  onPressFunc={() => setOpenLogoutConfirmation(true)}
                  isDisabled={logoutLoader}
                />
              ) : (
                <CustomButton
                  title="Login"
                  onPressFunc={() => router.push("/login")}
                />
              )}
              <CustomButton
                title={deleteAccountLoader ? "loading" : "Delete Account"}
                color={red}
                onPressFunc={() => setOpenDeleteAccountConfirmation(true)}
                isDisabled={deleteAccountLoader}
              />
            </View>
            <MessageModal
              handleCancel={() => setOpenDeleteAccountConfirmation(false)}
              isModalVisible={openDeleteAccountConfirmation}
              message="Are your sure you want to delete your account?"
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
                "your account was successfully deleted, we hope you will rejoin us soon."
              }
              header="Account Deleted!"
              type="success"
            />
            <MessageModal
              handleCancel={() => setResetPasswordError("")}
              isModalVisible={resetPasswordError ? true : false}
              message={resetPasswordError}
              header="Verification Email Failed!"
              type="error"
            />
            <MessageModal
              handleCancel={() => {
                setOpenResetSuccessModal(false);
                router.push({
                  pathname: `/verification/${id}`,
                  params: {
                    isNewUser: "no",
                  },
                });
              }}
              isModalVisible={openResetSuccessModal}
              message={
                "please check your email for the verification code and finish reseting your password."
              }
              header="Email Sent!"
              type="success"
            />
            <MessageModal
              handleCancel={() => setOpenLogoutConfirmation(false)}
              isModalVisible={openLogoutConfirmation}
              message="Are your sure you want to logout"
              header="Logout?"
              type="confirmation"
              handleConfirm={handleLogOut}
            />
            <MessageModal
              handleCancel={() => {
                setOpenLogoutSuccessModal(false);
                router.replace("/home");
                dispatch(addAccessToken(""));
              }}
              isModalVisible={openLogoutSuccessModal}
              message={
                "you have successfully logged out, please login to have access to all our services."
              }
              header="Logged Out!"
              type="success"
            />
            <MessageModal
              handleCancel={() => setLogoutError("")}
              isModalVisible={logoutError ? true : false}
              message={logoutError}
              header="Logout Failed"
              type="error"
            />
          </View>
        )}
      </StackScreen>
    </Screen>
  );
};

export default Profile;
