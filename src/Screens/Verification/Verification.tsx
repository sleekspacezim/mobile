import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import InputField from "@/src/Components/InputField/InputField";
import { INoPropsReactComponent, IStringOrNull } from "@/src/GlobalTypes/Types";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { family, small } from "@/src/Theme/Font";
import { red, primary, gray } from "@/src/Theme/Colors";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  resendVerificationCodeHttpFunc,
  verificationCodeForSecurityHttpFunc,
  verifyCodeForNativeUserRegistrationHttpFunc,
} from "@/src/HttpServices/Mutations/Auth/AuthHttpFunctions";
import { processLocalQueryParam, saveSecureValue } from "@/src/Utils/Funcs";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  expoSecureValueKeyNames,
  MAX_INPUT_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import { useAppDispatch } from "@/src/Redux/Hooks/Config";
import { updatePayWall } from "@/src/Redux/Slices/payWallSlice/PayWallState";

const Verification: INoPropsReactComponent = () => {
  const { id, isNewUser } = useLocalSearchParams();
  const processedIsNewUser = processLocalQueryParam(isNewUser);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);
  const [
    showResendVerificationCodeSuccess,
    setShowResendVerificationCodeSuccess,
  ] = useState<boolean>(false);
  const [isVerificationLoading, setIsVerificationLoading] =
    useState<boolean>(false);
  const [isVerificationSuccessful, setIsVerificationSuccesful] =
    useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [typingError, setTypingError] = useState<IStringOrNull>(null);
  const [httpError, setHttpError] = useState<string>("");
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch()

  useUpdateUser(userData);
  useEffect(() => {
    if (verificationCode && verificationCode.length < 6)
      setTypingError("verification code should be 6 digits");
    else setTypingError(null);
  }, [verificationCode]);

  useEffect(() => {
    if (showResendVerificationCodeSuccess)
      setTimeout(() => setShowResendVerificationCodeSuccess(false), 3000);
  }, [showResendVerificationCodeSuccess]);

  const verifyCodeForSecurityMutation = useMutation({
    mutationFn: verificationCodeForSecurityHttpFunc,
    onSuccess(data) {
      router.push(`/resetPassword/${data.data.userId}`);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setHttpError(error.response?.data?.error);
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setVerificationCode("");
      setIsVerificationLoading(false);
    },
  });

  const verifyCodeForNativeUserRegistrationMutation = useMutation({
    mutationFn: verifyCodeForNativeUserRegistrationHttpFunc,
    onSuccess(data) {
      saveSecureValue(
        expoSecureValueKeyNames.accessToken,
        JSON.stringify(data.data.response.accessToken)
      )
        .then((_data) => {
          setUserData(data.data.response);
          dispatch(updatePayWall(data.data.hasPayWall))
          setIsVerificationSuccesful(true);
        })
        .catch((e) => {
          console.log("accessToken error ", e);
        })
        .finally(() => setIsVerificationLoading(false));
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setHttpError(error.response?.data?.error);
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setVerificationCode("");
      setIsVerificationLoading(false);
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendVerificationCodeHttpFunc,
    onSuccess(_data) {
      setShowResendVerificationCodeSuccess(true);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setHttpError(error.response?.data?.error);
      } else setHttpError("Something went wrong");
    },
    onSettled: () => {
      setIsResendLoading(false);
    },
  });

  const handleVerification = () => {
    if (!typingError && verificationCode) {
      setIsVerificationLoading(true);
      if (processedIsNewUser === "no") {
        verifyCodeForSecurityMutation.mutate({
          userId: id ? +id : 0,
          verificationCode: +verificationCode,
        });
      } else {
        verifyCodeForNativeUserRegistrationMutation.mutate({
          userId: id ? +id : 0,
          verificationCode: +verificationCode,
        });
      }
    }
  };

  const handleResendCode = () => {
    setIsResendLoading(true);
    resendMutation.mutate(id ? +id : 0);
  };

  const handleAlertCancel = () => {
    setHttpError("");
  };
  const handleSuccessModalClose = () => {
    setIsVerificationSuccesful(false);
    router.dismissAll();
    router.replace("/home");
  };
  return (
    <Screen>
      <StackScreen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={[
              styles.container,
              { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
            ]}
          >
            <ThemedText
              type="header"
              styles={{ textAlign: "center", marginTop: 10 }}
            >
              Code Verification
            </ThemedText>
            <ThemedText type="regular">
              Please enter your verification code
            </ThemedText>
            <InputField
              width={"100%"}
              height={50}
              handleOnChangeText={(e) => setVerificationCode(e)}
              textValue={verificationCode}
              label="Code"
              type="number"
              handleOnEnter={handleVerification}
              contentType="none"
              placeHolder=""
              borderColor={typingError ? red : gray}
            />
            {typingError && <Text style={styles.errorText}>{typingError}</Text>}
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={isVerificationLoading || isResendLoading ? true : false}
              style={styles.linkContainer}
            >
              {isResendLoading ? (
                <ButtonSpinner />
              ) : (
                <Text style={styles.resendText}>Resend Code</Text>
              )}
            </TouchableOpacity>
            <View style={[
                styles.btnWrapper,
                {
                  width:
                    width > BUTTON_SIZE_SCREEN_BREAK_POINT
                      ? BUTTON_MAX_WIDTH
                      : "100%",
                },
              ]}>
              <CustomButton
                title={isVerificationLoading ? "loading" : "Verify"}
                onPressFunc={handleVerification}
                isDisabled={
                  isVerificationLoading || isResendLoading ? true : false
                }
              />
            </View>
          </View>
          {httpError && (
            <MessageModal
              handleCancel={handleAlertCancel}
              message={httpError}
              isModalVisible={httpError ? true : false}
              type="error"
              header="Server Error"
            />
          )}
          <MessageModal
            isModalVisible={showResendVerificationCodeSuccess}
            message="please check your email for verification code"
            type="success"
            header="Email Sent!"
            handleCancel={() => setShowResendVerificationCodeSuccess(false)}
          />
          <MessageModal
            isModalVisible={isVerificationSuccessful}
            message={
              processedIsNewUser === "no"
                ? "your verification was successful, you may continue."
                : "congratulations, your account has been successfully created, welcome to Sleek Space."
            }
            type="success"
            header={
              processedIsNewUser === "no"
                ? "Verification Successful!"
                : "Account Created!"
            }
            handleCancel={handleSuccessModalClose}
          />
        </ScrollView>
      </StackScreen>
    </Screen>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingBottom: 15,
    gap: 10,
  },
  errorText: {
    color: red,
    fontFamily: family,
    fontSize: small,
    marginTop: -5,
  },
  resendText: {
    color: primary,
    fontFamily: family,
    fontSize: small,
  },
  linkContainer: {
    paddingVertical: 8,
    width: 120,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    alignSelf: "center",
  },
  btnWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf:"center"
  },
});
