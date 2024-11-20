import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import ButtonSpinner from "../../Spinners/ButtonSpinner";
import { dark, gray, light, primary, red } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { family, medium, small } from "@/src/Theme/Font";
import Row from "../../Row/Row";
import { getLocation } from "@/src/Utils/Funcs";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  suggestions: ISearchLocation[] | null;
  isLoading: boolean;
  setLocation: React.Dispatch<React.SetStateAction<string | ISearchLocation>>;
  setTextInputValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpenSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuggestedLocations: React.FC<Props> = ({
  suggestions,
  isLoading,
  setLocation,
  setTextInputValue,
  setOpenSuggestions,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const handleLocationPress = (location: ISearchLocation) => {
    setLocation(location);
    setTextInputValue(getLocation(location));
    setOpenSuggestions(false);
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ButtonSpinner backGroundColor={primary} />
      ) : (
        <View>
          <Row style={styles.row}>
            <Text style={styles.locationHeader}>Please Choose location:</Text>
            <TouchableOpacity
              onPress={() => setOpenSuggestions(false)}
              activeOpacity={activeOpacityOfTouchableOpacity}
            >
              <Text style={styles.clearText}>clear</Text>
            </TouchableOpacity>
          </Row>
          {suggestions?.map((location, index) => (
            <TouchableOpacity
              key={index}
              style={styles.locationContainer}
              onPress={() => handleLocationPress(location)}
              activeOpacity={activeOpacityOfTouchableOpacity}
            >
              <Text
                style={[
                  styles.locationText,
                  { color: theme === "light" ? light.text : dark.text },
                ]}
              >
                {location.display_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SuggestedLocations;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 5,
    borderRadius: 7,
    gap: 1,
  },
  row: {
    justifyContent: "space-between",
    width: "100%",
  },
  clearText: {
    color: red,
    fontFamily: family,
    fontSize: small,
    textDecorationLine: "underline",
  },
  locationContainer: {
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 7,
    borderBottomWidth: 1,
    borderBottomColor: gray,
    paddingVertical: 5,
  },
  locationHeader: {
    fontFamily: family,
    color: primary,
    fontSize: medium,
    fontWeight: "bold",
  },
  locationText: {
    fontFamily: family,
    fontSize: small,
  },
});
