import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { dark, gray, lightGray, red } from "@/src/Theme/Colors";
import { useSearchLocationHistoryContext } from "@/src/Context/SearchLocationHistoryContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import EmptySearchHistory from "@/src/Components/Modals/Location/SearchLocation/EmptySearchHistory/EmptySearchHistory";
import RegularText from "@/src/Components/RegularText/RegularText";
import { family, large } from "@/src/Theme/Font";
import { shortenString } from "@/src/Utils/Funcs";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";

const History: INoPropsReactComponent = () => {
  const { searchLocationHistory, setSearchLocationHistory } =
    useSearchLocationHistoryContext();
  const theme = useAppSelector((state) => state.theme.value);
  const underLayColor = theme === "light" ? lightGray : dark.darkGray;
  const { width } = useWindowDimensions();
  
  const navigateToSearchResults = (history: {
    id: number;
    location: string | undefined;
  }) => {
    router.push({
      pathname: "/search",
      params: {
        PropertyType: PropertyTypesEnum.ResidentialRentals,
        location: history.location,
      },
    });
  };

  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchLocationHistory.length > 0 ? (
              <View>
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
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: underLayColor,
                      },
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
      </StackScreen>
    </Screen>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
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
