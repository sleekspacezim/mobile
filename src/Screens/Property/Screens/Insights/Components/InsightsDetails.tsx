import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { IPropertyInsights } from "@/src/GlobalTypes/Property/Insights/InsightsTypes";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import RegularText from "@/src/Components/RegularText/RegularText";
import { dark, gray, green, light, lightGray, red } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  insights: IPropertyInsights;
};

const InsightsDetails: React.FC<Props> = ({ insights }) => {
  const theme = useAppSelector((state) => state.theme.value);
  const iconSize = 24;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <Ionicons
              name="eye-sharp"
              size={iconSize}
              color={theme === "dark" ? lightGray : light.darkGray}
            />
            <ThemedText type="subHeader">Views:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>{insights.views}</RegularText>
        </Row>
        <RegularText>
          This shows the number of times your property was clicked and its
          details viewed.
        </RegularText>
      </View>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <MaterialCommunityIcons
              name="share"
              size={iconSize}
              color="purple"
            />
            <ThemedText type="subHeader">Shared:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>{insights.shared}</RegularText>
        </Row>
        <RegularText>
          This shows the number of times your property was shared across
          multiple apps.
        </RegularText>
      </View>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <MaterialIcons name="favorite" size={iconSize} color={red} />
            <ThemedText type="subHeader">Added to favorites:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>
            {insights.addedToFavourites}
          </RegularText>
        </Row>
        <RegularText>
          This shows how many times your property was added as a favorite.
        </RegularText>
      </View>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <MaterialIcons name="phone-in-talk" size={iconSize} color={gray} />
            <ThemedText type="subHeader">Call Attempts:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>
            {insights.callAttempts}
          </RegularText>
        </Row>
        <RegularText>
          This shows how many times possible tenants or buyers called or
          attempted to call you.
        </RegularText>
      </View>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <MaterialCommunityIcons
              name="email"
              size={iconSize}
              color="orange"
            />
            <ThemedText type="subHeader">Email attempts:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>
            {insights.emailAttempts}
          </RegularText>
        </Row>
        <RegularText>
          This shows how many times possible tenants or buyers emailed or
          attempted to email you.
        </RegularText>
      </View>
      <View
        style={[
          styles.subContainer,
          { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
        ]}
      >
        <Row style={styles.rowContainer}>
          <Row style={styles.rowSubContainer}>
            <MaterialCommunityIcons
              name="whatsapp"
              size={iconSize}
              color={green}
            />
            <ThemedText type="subHeader">WhatsApp Attempts:</ThemedText>
          </Row>
          <RegularText style={{ marginTop: 5 }}>
            {insights.whatsAppAttempts}
          </RegularText>
        </Row>
        <RegularText>
          This shows how many times possible tenants or buyers sent a whatsapp
          text or attempted to whatsapp you.
        </RegularText>
      </View>
    </View>
  );
};

export default InsightsDetails;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  subContainer: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  rowContainer: {
    gap: 10,
    alignItems: "center",
  },
  rowSubContainer: {
    gap: 5,
    alignItems: "center",
  },
});
