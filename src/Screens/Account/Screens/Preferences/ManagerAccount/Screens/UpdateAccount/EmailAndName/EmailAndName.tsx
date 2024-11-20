import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import { family, small } from "@/src/Theme/Font";
import { gray, red } from "@/src/Theme/Colors";
import {
  SCREEN_BREAK_POINT,
  MAX_INPUT_WIDTH,
  BUTTON_MAX_WIDTH,
  managerAccountUpdateMsg,
} from "@/src/Utils/Constants";
import InputField from "@/src/Components/InputField/InputField";
import { emailValidator } from "@/src/Utils/Funcs";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { UpdateManager } from "@/src/HttpServices/Mutations/Manager/ManagerHttpFunctions";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";
import MessageModal from "@/src/Components/Modals/MessageModal";
import RegularText from "@/src/Components/RegularText/RegularText";

const EmailAndName: INoPropsReactComponent = () => {
  const manager = useAppSelector((state) => state.managerAccount.value);
  const [email, setEmail] = useState<string | undefined>(manager.email);
  const [name, setName] = useState<string | undefined>(manager.name);
  const [updateError, setUpdateError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [ommissionError, setOmmissionError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNameValidationError, setIsNameValidationError] =
    useState<boolean>(false);
  const [isEmailValidationError, setIsEmailValidationError] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (email !== "") {
      emailValidator(setIsEmailValidationError, email);
    } else {
      setIsEmailValidationError(false);
    }
  }, [email]);

  useEffect(() => {
    if (name !== "" || !name) {
      if (name && name.length < 4) {
        setIsNameValidationError(true);
      } else {
        setIsNameValidationError(false);
      }
    } else {
      setIsNameValidationError(false);
    }
  }, [name]);

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateManager,
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

  const handleUpdate = () => {
    setOmmissionError(false);
    if (!isEmailValidationError && !isNameValidationError && name) {
      mutate({
        accessToken,
        managerId: manager.id,
        managerEmailAndNameUpdates: {
          name,
          email: email ? email : "",
        },
      });
    } else {
      setOmmissionError(true);
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
          <View
            style={[
              styles.inputWrapper,
              { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
            ]}
          >
            <InputField
              textValue={name}
              placeHolder="name"
              width={"100%"}
              handleOnChangeText={(e) => setName(e)}
              height={50}
              contentType="givenName"
              type="givenName"
              label="Personal/Company Name"
              borderColor={isNameValidationError ? red : gray}
              isRequired
            />
            {isNameValidationError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  please enter atleast 4 characters
                </Text>
              </View>
            )}
            <InputField
              textValue={email}
              placeHolder="email"
              width={"100%"}
              handleOnChangeText={(e) => setEmail(e)}
              height={50}
              contentType="emailAddress"
              type="emailAddress"
              label="Personal/Company Email"
              borderColor={isEmailValidationError ? red : gray}
            />
            {isEmailValidationError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  please enter valid email address
                </Text>
              </View>
            )}
            {ommissionError && (
              <Text style={styles.ommissionErrorText}>
                please fill all the required fields.
              </Text>
            )}
            <RegularText>{managerAccountUpdateMsg}</RegularText>
          </View>
          <View
            style={[
              {
                width: width > SCREEN_BREAK_POINT ? BUTTON_MAX_WIDTH : "100%",
              },
              styles.btnContainer,
            ]}
          >
            <CustomButton
              title={isPending ? "loading" : "update"}
              onPressFunc={handleUpdate}
              isDisabled={isPending}
            />
          </View>
          <MessageModal
            message={updateError}
            type="error"
            isModalVisible={updateError ? true : false}
            handleCancel={() => setUpdateError("")}
          />
          <MessageModal
            header="Account Updated!"
            message={
              "you have successfully updated your management account details. Please note, all your properties will be updated with this new information."
            }
            type="success"
            isModalVisible={openSuccessModal}
            handleCancel={handleCloseSuccessModal}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default EmailAndName;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 20,
    alignItems: "center",
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    gap: 20,
    marginTop: 30,
    flex: 1,
  },
  errorText: {
    fontFamily: family,
    color: red,
    fontSize: 13,
    marginTop: -19,
  },
  row: { width: "100%", justifyContent: "space-between", marginTop: -10 },
  errorContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: -1,
  },
  ommissionErrorText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
  btnContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginTop: 20,
  },
});
