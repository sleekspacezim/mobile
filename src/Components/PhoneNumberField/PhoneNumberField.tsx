import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import ThemedText from "../ThemedText/ThemedText";
import { dark, gray, light, red, white } from "@/src/Theme/Colors";
import { IPhoneNumberDetails } from "@/src/Screens/Account/Screens/Preferences/Profile/Screens/Types";
import Row from "../Row/Row";
import { MAX_INPUT_WIDTH, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

type Props = {
  setPhoneNumberDetails: React.Dispatch<
    React.SetStateAction<IPhoneNumberDetails>
  >;
  label: string;
  setIsNumberValid: React.Dispatch<React.SetStateAction<boolean>>;
  isNumberValid: boolean;
  initialValue: string;
  phoneNumberDetails: IPhoneNumberDetails;
  isRequired?: boolean;
};

const PhoneNumberField: React.FC<Props> = ({
  setPhoneNumberDetails,
  label,
  setIsNumberValid,
  isNumberValid,
  initialValue,
  phoneNumberDetails,
  isRequired,
}) => {
  const [value, setValue] = useState(initialValue);
  const phoneInputRef = useRef<PhoneInput>(null);
  const { width } = useWindowDimensions();
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    const getNumber =
      phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero();
    const state = phoneInputRef.current?.state;
    if (value) {
      const checkValid = phoneInputRef.current?.isValidNumber(value);
      setIsNumberValid(checkValid ? checkValid : false);
      setPhoneNumberDetails({
        ...phoneNumberDetails,
        number: getNumber ? getNumber.number : initialValue,
        countryCode: state
          ? state.code
            ? state.code
            : phoneNumberDetails.countryCode
          : phoneNumberDetails.countryCode,
        countryAbbrv: state
          ? state.countryCode
          : phoneNumberDetails.countryAbbrv,
      });
    } else {
      setIsNumberValid(true);
      setPhoneNumberDetails({
        ...phoneNumberDetails,
        number: getNumber ? getNumber.number : initialValue,
        countryCode: state ? (state.code ? state.code : "") : "",
        countryAbbrv: state ? state.countryCode : "ZW",
      });
    }
  }, [value]);

  return (
    <View
      style={[
        styles.container,
        { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
      ]}
    >
      <Row style={styles.labelContainer}>
        <ThemedText type="regular">{label}</ThemedText>
        {isRequired && (
          <View style={{ marginTop: 5 }}>
            <FontAwesome5 name="star-of-life" size={7} color={red} />
          </View>
        )}
      </Row>
      <PhoneInput
        ref={phoneInputRef}
        defaultValue={
          value.split(
            phoneNumberDetails.countryCode ? phoneNumberDetails.countryCode : ""
          )[1]
        }
        defaultCode={phoneNumberDetails.countryAbbrv}
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setValue(text);
        }}
        containerStyle={{
          width: "100%",
          borderRadius: 7,
          borderWidth: 1,
          borderColor: isNumberValid ? gray : "red",
          backgroundColor: "transparent",
        }}
        textContainerStyle={[styles.textContainer, { borderLeftColor: gray }]}
        textInputStyle={{ color: theme === "light" ? light.text : dark.text }}
        codeTextStyle={{ color: theme === "light" ? light.text : dark.text }}
        textInputProps={{
          cursorColor: gray,
          autoComplete: "off",
          autoCorrect: false,
        }}
        renderDropdownImage={
          <AntDesign
            name="caretdown"
            size={14}
            color={theme === "light" ? dark.darkGray : white}
          />
        }
        withDarkTheme={theme === "light" ? false : true}
      />
    </View>
  );
};

export default PhoneNumberField;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  labelContainer: {
    width: "100%",
    gap: 5,
  },
  textContainer: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "transparent",
    borderLeftWidth: 1,
  },
});
