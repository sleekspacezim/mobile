import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import { getManagerContactNumber } from "@/src/Utils/Funcs";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  activeOpacityOfTouchableOpacity,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";

type Props = {
  manager: IManagerAccount;
};

const ManagerDetails: React.FC<Props> = ({
  manager: { name, contacts, email },
}) => {
  const [openContacts, setOpenContacts] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        { width: width > SCREEN_BREAK_POINT ? 350 : "100%" },
      ]}
    >
      <Row style={rowContainerStyles.rowContainer}>
        <IconContainer>
          <MaterialIcons
            name={theme === "dark" ? "person-outline" : "person"}
            size={iconSize}
            color={primary}
          />
        </IconContainer>
        <Row style={{ gap: 5 }}>
          <ThemedText type="regular">Name:</ThemedText>
          <RegularText>{name}</RegularText>
        </Row>
      </Row>
      <View style={styles.contactsContainer}>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="subHeader">Contact Info</ThemedText>
          {openContacts ? (
            <TouchableOpacity
              style={styles.chervronContainer}
              activeOpacity={activeOpacityOfTouchableOpacity}
              onPress={() => setOpenContacts(false)}
            >
              <MaterialCommunityIcons
                name="chevron-down"
                size={32}
                color={primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.chervronContainer}
              activeOpacity={activeOpacityOfTouchableOpacity}
              onPress={() => setOpenContacts(true)}
            >
              <MaterialCommunityIcons
                name="chevron-up"
                size={32}
                color={primary}
              />
            </TouchableOpacity>
          )}
        </Row>
        {openContacts && (
          <View style={styles.contacts}>
            <Row style={rowContainerStyles.rowContainer}>
              <IconContainer>
                <MaterialCommunityIcons
                  name={theme === "dark" ? "email-outline" : "email"}
                  size={iconSize}
                  color={primary}
                />
              </IconContainer>
              <Row style={{ gap: 5 }}>
                <ThemedText type="regular">Email:</ThemedText>
                <RegularText>{email}</RegularText>
              </Row>
            </Row>
            <Row style={rowContainerStyles.rowContainer}>
              <IconContainer>
                <MaterialCommunityIcons
                  name={"whatsapp"}
                  size={iconSize}
                  color={primary}
                />
              </IconContainer>
              <Row style={{ gap: 5 }}>
                <ThemedText type="regular">WhatsApp:</ThemedText>
                <RegularText>
                  {getManagerContactNumber(contacts, "whatsapp")}
                </RegularText>
              </Row>
            </Row>
            <Row style={rowContainerStyles.rowContainer}>
              <IconContainer>
                <Ionicons
                  name={theme === "dark" ? "call-outline" : "call"}
                  size={iconSize}
                  color={primary}
                />
              </IconContainer>
              <Row style={{ gap: 5 }}>
                <ThemedText type="regular">Call:</ThemedText>
                <RegularText>
                  {getManagerContactNumber(contacts, "phone")}
                </RegularText>
              </Row>
            </Row>
          </View>
        )}
      </View>
    </View>
  );
};

export default ManagerDetails;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  contactsContainer: {
    gap: 10,
    paddingVertical: 5,
  },
  contacts: {
    gap: 10,
  },
  chervronContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
