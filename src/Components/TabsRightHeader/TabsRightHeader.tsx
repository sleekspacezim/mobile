import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, gray, primary, pureWhite } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import {
  activeOpacityOfTouchableOpacity,
  imageBlurhash,
} from "@/src/Utils/Constants";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";

type Props = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
};

const TabsRightHeader: React.FC<Props> = () => {
  const [timeStamp, setTimeStamp] = useState<number | null>(null);
  const theme = useAppSelector((state) => state.theme.value);
  const { setIsUserProfileBottomSheetOpen } = useBottomSheetsContext();
  const { accessToken, profilePicture, givenName, familyName } = useAppSelector(
    (state) => state.user.value
  );

  const underLayColor = theme === "light" ? "#DDDBDE" : dark.darkGray;

  useEffect(() => {
    if (profilePicture.uri) {
      setTimeStamp(Date.now());
    }
  }, [profilePicture]);

  return (
    <View style={styles.container}>
      {!accessToken && (
        <TouchableHighlight
          onPress={() => setIsUserProfileBottomSheetOpen(true)}
          underlayColor={underLayColor}
          style={styles.dotsContainer}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} color={gray} />
        </TouchableHighlight>
      )}
      {accessToken && (
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => setIsUserProfileBottomSheetOpen(true)}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          {profilePicture.uri ? (
            <Image
              source={{ uri: `${profilePicture.uri}?timestamp=${timeStamp}` }}
              style={styles.image}
              placeholder={{ blurhash: imageBlurhash }}
            />
          ) : (
            <View style={styles.userInitialsContainer}>
              <Text
                style={styles.userInitialsText}
              >{`${givenName[0].toLocaleUpperCase()}${familyName[0].toLocaleUpperCase()}`}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TabsRightHeader;

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userInitialsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
    height: 36,
    width: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userInitialsText: {
    color: pureWhite,
    fontFamily: family,
    fontSize: small,
  },
});
