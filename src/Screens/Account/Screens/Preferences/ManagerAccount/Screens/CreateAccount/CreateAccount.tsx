import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import {
  BUTTON_MAX_WIDTH,
  MAX_INPUT_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import {
  emailValidator,
  generateRandomSixDigitNumber,
  getContactNumber,
} from "@/src/Utils/Funcs";
import PhoneNumberField from "@/src/Components/PhoneNumberField/PhoneNumberField";
import { IPhoneNumberDetails } from "../../../Profile/Screens/Types";
import { family, small } from "@/src/Theme/Font";
import { gray, red } from "@/src/Theme/Colors";
import InputField from "@/src/Components/InputField/InputField";
import ProfilePicture from "@/src/Components/ProfilePicture/ProfilePicture";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { CreateManager } from "@/src/HttpServices/Mutations/Manager/ManagerHttpFunctions";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";
import MessageModal from "@/src/Components/Modals/MessageModal";
import RegularText from "@/src/Components/RegularText/RegularText";

const CreateAccount = () => {
  const user = useAppSelector((state) => state.user.value);
  const [email, setEmail] = useState<string>(user.email);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isNameValidationError, setIsNameValidationError] =
    useState<boolean>(false);
  const [isEmailValidationError, setIsEmailValidationError] =
    useState<boolean>(false);
  const [phoneNumberDetails, setPhoneNumberDetails] =
    useState<IPhoneNumberDetails>(
      user.contactNumbers.length > 0
        ? {
            number: user.contactNumbers.filter(
              (contact) => contact.type === "phone"
            )[0].number,
            countryAbbrv: user.contactNumbers.filter(
              (contact) => contact.type === "phone"
            )[0].countryAbbrv,
            countryCode: user.contactNumbers.filter(
              (contact) => contact.type === "phone"
            )[0].countryCode,
          }
        : {
            number: "",
            countryCode: "263",
            countryAbbrv: "ZW",
          }
    );
  const [whatsAppNumberDetails, setWhatsAppNumberDetails] =
    useState<IPhoneNumberDetails>(
      user.contactNumbers.length > 0
        ? {
            number: user.contactNumbers.filter(
              (contact) => contact.type === "whatsapp"
            )[0].number,
            countryAbbrv: user.contactNumbers.filter(
              (contact) => contact.type === "whatsapp"
            )[0].countryAbbrv,
            countryCode: user.contactNumbers.filter(
              (contact) => contact.type === "whatsapp"
            )[0].countryCode,
          }
        : {
            number: "",
            countryCode: "263",
            countryAbbrv: "ZW",
          }
    );
  const [httpError, setHttpError] = useState<string>("");
  const [ommissionError, setOmmissionError] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0);
  const [isWhatsAppNumberValid, setIsWhatsAppNumberValid] =
    useState<boolean>(true);
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { accessToken, id } = useAppSelector((state) => state.user.value);

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

  const createManagerAccount = useMutation({
    mutationFn: CreateManager,
    onSuccess: (res) => {
      dispatch(addManagerAccount(res.data.response));
      setIsSuccessModalOpen(true);
    },
    onError: (error: any) => {
      if (error.response?.data?.error !== "") {
        setHttpError(error.response?.data?.error);
      } else {
        setHttpError("Something went wrong");
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const handleCreate = async () => {
    setOmmissionError(false);
    if (
      name &&
      !isNameValidationError &&
      !isEmailValidationError &&
      whatsAppNumberDetails.number &&
      phoneNumberDetails.number &&
      isWhatsAppNumberValid &&
      isPhoneNumberValid
    ) {
      setIsLoading(true);
      createManagerAccount.mutate({
        accessToken,
        manager: {
          name,
          email,
          userId: id,
          profilePicture:
            image && imageBase64
              ? {
                  name: `${generateRandomSixDigitNumber()}${name}`,
                  image: imageBase64,
                  contentType: "image",
                  fileType: imageType,
                  size: imageSize,
                }
              : {
                  name: "",
                  image: "",
                  contentType: "image",
                  fileType: "",
                  size: 0,
                },
          contacts: [
            {
              number: whatsAppNumberDetails.number
                ? whatsAppNumberDetails.number
                : "",
              countryAbbrv: whatsAppNumberDetails.countryAbbrv
                ? whatsAppNumberDetails.countryAbbrv
                : "ZW",
              countryCode: whatsAppNumberDetails.countryCode
                ? whatsAppNumberDetails.countryCode
                : "",
              type: "whatsapp",
            },
            {
              number: phoneNumberDetails.number
                ? phoneNumberDetails.number
                : "",
              countryAbbrv: phoneNumberDetails.countryAbbrv
                ? phoneNumberDetails.countryAbbrv
                : "ZW",
              countryCode: phoneNumberDetails.countryCode
                ? phoneNumberDetails.countryCode
                : "",
              type: "phone",
            },
          ],
        },
      });
    } else {
      setOmmissionError(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
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
            <ProfilePicture
              uri={image}
              setImage={setImage}
              setImageBase64={setImageBase64}
              setImageSize={setImageSize}
              setImageType={setImageType}
            />
            <InputField
              textValue={name}
              placeHolder="company/personal name"
              width={"100%"}
              handleOnChangeText={(e) => setName(e)}
              height={55}
              contentType="givenName"
              type="givenName"
              label="Name"
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
              height={55}
              contentType="emailAddress"
              type="emailAddress"
              label="Email"
              borderColor={isEmailValidationError ? red : gray}
            />
            {isEmailValidationError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  please enter valid email address
                </Text>
              </View>
            )}
            <PhoneNumberField
              setPhoneNumberDetails={setPhoneNumberDetails}
              label="Phone Number"
              initialValue={getContactNumber("phone",user.contactNumbers)}
              isNumberValid={isPhoneNumberValid}
              setIsNumberValid={setIsPhoneNumberValid}
              phoneNumberDetails={phoneNumberDetails}
              isRequired
            />
            {!isPhoneNumberValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  this number is not valid in this country
                </Text>
              </View>
            )}
            <PhoneNumberField
              setPhoneNumberDetails={setWhatsAppNumberDetails}
              label="Whatsapp Number"
              initialValue={getContactNumber("whatsapp",user.contactNumbers)}
              isNumberValid={isWhatsAppNumberValid}
              setIsNumberValid={setIsWhatsAppNumberValid}
              phoneNumberDetails={whatsAppNumberDetails}
              isRequired
            />
            {!isWhatsAppNumberValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  this number is not valid in this country
                </Text>
              </View>
            )}
            {ommissionError && (
              <Text style={styles.ommissionErrorText}>
                please fill all the required fields.
              </Text>
            )}
            <RegularText>
              Remember, this information is what the tenants and buyers will see
              and use when you upload your properties, so make sure it is
              accurate.
            </RegularText>
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
              title={isLoading ? "loading" : "Create Manager Account"}
              onPressFunc={handleCreate}
              isDisabled={isLoading}
            />
          </View>
          <MessageModal
            message={httpError}
            type="error"
            isModalVisible={httpError ? true : false}
            handleCancel={() => setHttpError("")}
          />
          <MessageModal
            header="Account Created!"
            message={
              "you have successfully created a property management account, you can now add properties to our platform."
            }
            type="success"
            isModalVisible={isSuccessModalOpen}
            handleCancel={handleCloseSuccessModal}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 20,
    alignItems: "center",
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  errorText: {
    fontFamily: family,
    color: red,
    fontSize: 13,
    marginTop: -10,
  },
  ommissionErrorText: {
    fontFamily: family,
    color: red,
    fontSize: small,
  },
  row: { width: "100%", justifyContent: "space-between", marginTop: -10 },
  btnContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginTop: 20,
  },
  errorContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: -1,
  },
});
