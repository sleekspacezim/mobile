import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import Heading from "../Heading/Heading";
import { primary } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import Row from "@/src/Components/Row/Row";
import ProfilePicture from "@/src/Components/ProfilePicture/ProfilePicture";
import ManagerDetails from "./Components/ManagerDetails";
import Divider from "../Divider/Divider";

type Props = {
  manager: IManagerAccount;
};

const Manager: React.FC<Props> = ({ manager, manager: { profilePicture } }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Heading
        title="Property Manager"
        icon={<Fontisto name="person" size={26} color={primary} />}
      />
      {width > SCREEN_BREAK_POINT ? (
        <Row style={{ gap: 35 }}>
          <ProfilePicture
            hideCameraOptions
            uri={profilePicture ? profilePicture.uri : ""}
          />
          <ManagerDetails manager={manager} />
        </Row>
      ) : (
        <View style={{ gap: 5 }}>
          <ProfilePicture
            hideCameraOptions
            uri={profilePicture ? profilePicture.uri : ""}
          />
          <ManagerDetails manager={manager} />
        </View>
      )}
      <Divider />
    </View>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
