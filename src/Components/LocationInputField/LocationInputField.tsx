import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { light, dark, gray } from "@/src/Theme/Colors";
import ThemedText from "../ThemedText/ThemedText";
import SuggestedLocations from "./SuggestedLocations/SuggestedLocations";
import MessageModal from "../Modals/MessageModal";
import { shortenString } from "@/src/Utils/Funcs";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { locationAutoCompleteHttpFunc } from "@/src/HttpServices/Mutations/LocationIQ/LocationIQHttpFuncs";

type Props = {
  placeHolder: string;
  isFocused?: boolean;
  showLabel?: boolean;
  setLocation: React.Dispatch<React.SetStateAction<ISearchLocation | string>>;
  location: ISearchLocation | string;
};

const LocationInputField: React.FC<Props> = ({
  isFocused,
  placeHolder,
  showLabel,
  setLocation,
  location,
}) => {
  const user = useAppSelector((state) => state.user.value);
  const [value, setValue] = useState<string | undefined>(
    user.location?.displayName
  );
  const [locationSuggestions, setLocationSuggestions] = useState<
    ISearchLocation[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuggestions, setOpenSuggestions] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);

  const locationAutoCompleteMutation = useMutation({
    mutationFn: locationAutoCompleteHttpFunc,
    onSuccess: (data) => {
      setLocationSuggestions(data.data.response);
      setOpenSuggestions(true);
      setValue("");
    },
    onError(error: any) {
      console.log(error);
      if (error.response?.data?.error !== "") {
        setLocationError(error.response?.data?.error);
      } else setLocationError("Something went wrong");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSearch = () => {
    if (value) {
      setIsLoading(true);
      locationAutoCompleteMutation.mutate({ locationName: value });
    }
  };

  const handleCancelErrorModal = () => {
    setLocationError("");
  };

  useEffect(() => {
    if (location) {
      if (typeof location !== "string")
        setValue(shortenString(location.display_name, 40));
    } else setValue("");
  }, [location]);

  return (
    <View style={[styles.container]}>
      {showLabel && <ThemedText type="regular">Enter your Location</ThemedText>}
      <View>
        {value && value.length < 36 && (
          <EvilIcons
            name="location"
            size={26}
            color={gray}
            style={styles.icon}
          />
        )}
        {!value && (
          <EvilIcons
            name="location"
            size={26}
            color={gray}
            style={styles.icon}
          />
        )}
        <TextInput
          value={shortenString(value ? value : "", 40)}
          onChangeText={(e) => {
            setValue(e);
            setLocation(e);
          }}
          placeholder={placeHolder}
          textContentType={"location"}
          placeholderTextColor={gray}
          autoFocus={isFocused ? isFocused : false}
          onSubmitEditing={handleSearch}
          autoCorrect={false}
          enterKeyHint={"search"}
          keyboardType="default"
          keyboardAppearance={theme === "light" ? "light" : "dark"}
          cursorColor={theme === "light" ? light.text : dark.text}
          style={[
            { color: theme === "light" ? light.text : dark.text },
            {
              borderWidth: 1,
              borderColor: gray,
              backgroundColor:
                theme === "light" ? light.background : dark.darkGray,
            },
            styles.input,
          ]}
        />
      </View>
      {(isLoading || openSuggestions) && (
        <SuggestedLocations
          isLoading={isLoading}
          suggestions={locationSuggestions}
          setLocation={setLocation}
          setTextInputValue={setValue}
          setOpenSuggestions={setOpenSuggestions}
        />
      )}
      <MessageModal
        header="Location Error!"
        message={`Sorry, we could not get the coordinates of ${value}, please try adding more information and make sure it's correctly spelt.`}
        isModalVisible={locationError ? true : false}
        handleCancel={handleCancelErrorModal}
        type="error"
      />
    </View>
  );
};

export default LocationInputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 7,
    gap: 2,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    height: 45,
    width: "100%",
    textAlign: "left",
    paddingLeft: 10,
    borderRadius: 7,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 2,
  },
});
