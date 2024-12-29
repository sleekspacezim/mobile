import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import SearchBar from "./SearchBar/SearchBar";
import { dark, gray, lightGray, pureWhite, red } from "@/src/Theme/Colors";
import Row from "@/src/Components/Row/Row";
import { useSearchLocationHistoryContext } from "@/src/Context/SearchLocationHistoryContext";
import RegularText from "@/src/Components/RegularText/RegularText";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { family, large } from "@/src/Theme/Font";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { shortenString } from "@/src/Utils/Funcs";
import {
  activeOpacityOfTouchableOpacity,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import EmptySearchHistory from "./EmptySearchHistory/EmptySearchHistory";
import PropertyTypeList from "@/src/Components/PropertyTypeList/PropertyTypeList";

type Props = {
  handleCancel: IVoidFunc;
  isModalVisible: boolean;
  propertyType: IPropertyType;
};

const SearchLocationModal: React.FC<Props> = ({
  handleCancel,
  isModalVisible,
  propertyType,
}) => {
  const [activePropertyType, setActivePropertyType] =
    useState<IPropertyType>(propertyType);
  const { width } = useWindowDimensions();
  const { searchLocationHistory, setSearchLocationHistory } =
    useSearchLocationHistoryContext();
  const theme = useAppSelector((state) => state.theme.value);
  const underLayColor = theme === "light" ? lightGray : dark.darkGray;

  const navigateToSearchResults = (history: {
    id: number;
    location: string | undefined;
  }) => {
    handleCancel();
    router.push({
      pathname: "/search",
      params: {
        propertyType: activePropertyType,
        location: history.location,
      },
    });
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCancel}
      animationType="fade"
      presentationStyle="fullScreen"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === "dark" ? dark.background : pureWhite,
          },
        ]}
      >
        <SearchBar
          handleCancel={handleCancel}
          propertyType={activePropertyType}
        />
        <PropertyTypeList />
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchLocationHistory.length > 0 ? (
            <View style={{paddingHorizontal: 10}}>
              <Row style={styles.recentSearchesContainer}>
                <ThemedText
                  type="subHeader"
                  styles={{
                    textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                  }}
                >
                  Recent Searches
                </ThemedText>
                <CustomButton
                  title="clear all"
                  onPressFunc={() => setSearchLocationHistory([])}
                  textColor={red}
                  color="transparent"
                  width={70}
                  height={25}
                />
              </Row>
              {searchLocationHistory.map((history) => (
                <TouchableHighlight
                  key={history.id}
                  underlayColor={underLayColor}
                  style={[
                    styles.touchable,
                    { borderBottomWidth: 1, borderBottomColor: underLayColor },
                  ]}
                  onPress={() => navigateToSearchResults(history)}
                >
                  <View
                    style={[styles.innerTouchable, { flexDirection: "row" }]}
                  >
                    <RegularText>
                      {width > SCREEN_BREAK_POINT
                        ? history.location
                        : shortenString(history.location as string, 30)}
                    </RegularText>
                    <TouchableOpacity
                      activeOpacity={activeOpacityOfTouchableOpacity}
                      onPress={() =>
                        setSearchLocationHistory((historyList) =>
                          historyList.filter((item) => item.id !== history.id)
                        )
                      }
                    >
                      <AntDesign
                        name="closecircle"
                        size={24}
                        color={theme === "light" ? "gray" : gray}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          ) : (
            <EmptySearchHistory />
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    paddingVertical: 10,
    //paddingHorizontal: 10,
    gap: 15,
  },
  recentSearchesContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 5,
  },
  header: {
    fontFamily: family,
    fontSize: large,
    color: gray,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  touchable: {
    width: "100%",
    height: 45,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 2,
  },
  innerTouchable: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
