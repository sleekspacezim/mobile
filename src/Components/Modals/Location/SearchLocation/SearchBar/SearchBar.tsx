import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import InputField from "@/src/Components/InputField/InputField";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { dark, lightGray, primary } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { MAX_INPUT_WIDTH, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { useSearchLocationHistoryContext } from "@/src/Context/SearchLocationHistoryContext";
import { generateRandomSixDigitNumber } from "@/src/Utils/Funcs";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  handleCancel: IVoidFunc;
  propertyType: IPropertyType;
};

const SearchBar: React.FC<Props> = ({ handleCancel, propertyType }) => {
  const [location, setLocation] = useState<string>("");
  const { searchLocationHistory, setSearchLocationHistory } =
    useSearchLocationHistoryContext();
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();

  const handleEnter = () => {
    setSearchLocationHistory([
      ...searchLocationHistory,
      {
        id: +generateRandomSixDigitNumber(),
        location,
      },
    ]);
    setLocation("");
    handleCancel();
    router.push({
      pathname: "/search",
      params: {
        propertyType,
        location,
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <InputField
          textValue={location}
          handleOnChangeText={setLocation}
          placeHolder="Enter location"
          contentType="location"
          type="location"
          height={45}
          width={"100%"}
          handleOnEnter={handleEnter}
        />
      </View>
      <CustomButton
        title="cancel"
        borderRadius={5}
        onPressFunc={handleCancel}
        height={45}
        width={70}
        color={theme === "dark" ? dark.darkGray : lightGray}
        textColor={primary}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
