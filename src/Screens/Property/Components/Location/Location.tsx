import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { IPropertyLocation } from "@/src/GlobalTypes/Property/Location/LocationTypes";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import {
  activeOpacityOfTouchableOpacity,
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import MapModal from "@/src/Components/Modals/Map/MapModal";
import Heading from "../Heading/Heading";
import { lighterPrimary, primary } from "@/src/Theme/Colors";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import { iconSize, rowContainerStyles } from "../Shared/Styles";
import { family, small } from "@/src/Theme/Font";
import Divider from "../Divider/Divider";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { getPropertyLocationSurburb } from "@/src/Utils/Funcs";

type Props = {
  location: IPropertyLocation;
};

const Location: React.FC<Props> = ({
  location: {
    lat,
    lon,
    displayName,
    city,
    country,
    countryCode,
    county,
    surburb,
    province,
  },
}) => {
  const [openMap, setOpenMap] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View style={styles.container}>
      <Heading
        title="Property location"
        icon={<Entypo name="location" size={26} color={primary} />}
      />
      <View style={styles.subContainer}>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <Ionicons
              name={theme === "dark" ? "location-outline" : "location"}
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <RegularText
            style={{ maxWidth: width > SCREEN_BREAK_POINT ? "100%" : "90%" }}
          >
            {displayName ? displayName : "---"}
          </RegularText>
        </Row>
        <Row
          style={{
            gap: 5,
            alignItems: width > SCREEN_BREAK_POINT ? "center" : "flex-start",
          }}
        >
          <IconContainer>
            <MaterialCommunityIcons
              name="home-group"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Surburb:</ThemedText>
            <RegularText
              style={{ maxWidth: width > SCREEN_BREAK_POINT ? "100%" : "75%" }}
            >
              {surburb
                ? surburb
                : getPropertyLocationSurburb(displayName, city)}
            </RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialCommunityIcons
              name={theme === "dark" ? "city-variant-outline" : "city-variant"}
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">City:</ThemedText>
            <RegularText>{city ? city : "---"}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialIcons name="landscape" size={iconSize} color={primary} />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Constituency:</ThemedText>
            <RegularText>{county ? county : "---"}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialIcons name="landscape" size={iconSize} color={primary} />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Province:</ThemedText>
            <RegularText>{province ? province : "---"}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            {theme === "dark" ? (
              <FontAwesome6 name="flag" size={iconSize} color={primary} />
            ) : (
              <FontAwesome name="flag" size={iconSize} color={primary} />
            )}
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Country:</ThemedText>
            <RegularText>{country ? country : "---"}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialCommunityIcons
              name="text-short"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Country code:</ThemedText>
            <RegularText>{countryCode ? countryCode : "---"}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialCommunityIcons
              name="latitude"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Latitude:</ThemedText>
            <RegularText>{Number(lat).toFixed(8)}</RegularText>
          </Row>
        </Row>
        <Row style={rowContainerStyles.rowContainer}>
          <IconContainer>
            <MaterialCommunityIcons
              name="longitude"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">Longitude:</ThemedText>
            <RegularText>{Number(lon).toFixed(8)}</RegularText>
          </Row>
        </Row>
      </View>
      <View
        style={[
          styles.btnContainer,
          {
            width:
              width > BUTTON_SIZE_SCREEN_BREAK_POINT
                ? BUTTON_MAX_WIDTH
                : "100%",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={activeOpacityOfTouchableOpacity}
          style={styles.btn}
          onPress={() => setOpenMap(true)}
        >
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={24}
            color={primary}
          />
          <Text style={styles.btnText}>View on Map</Text>
        </TouchableOpacity>
      </View>
      {openMap && (
        <MapModal isModalOpen={openMap} closeModal={() => setOpenMap(false)} />
      )}
      <Divider />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },
  subContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
  row: {
    gap: 7,
    alignItems: "center",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lighterPrimary,
    flexDirection: "row",
    gap: 5,
    borderRadius: 15,
    height: 45,
    borderWidth: 1,
    width: "100%",
    borderColor: primary,
  },
  btnText: {
    fontFamily: family,
    fontSize: small,
    color: primary,
  },
});
