import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import ThemedText from "../ThemedText/ThemedText";
import Row from "../Row/Row";
import { gray, red } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import { shortenString } from "@/src/Utils/Funcs";
import GetLocationModal from "../Modals/Location/GetLocation/GetLocationModal";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import MapModal from "../Modals/Map/MapModal";

type Props = {
  borderColor: string;
};

const PropertyLocationInput: React.FC<Props> = ({
  borderColor
}) => {
  const [openLocationModal, setOpenLocationModal] = useState<boolean>(false);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const location = useAppSelector((state) => state.mapLocation.value);

  const processDisplayName = (diplayPlace: string) => {
    return diplayPlace.split(",")[0] + "," + diplayPlace.split(",")[1];
  };

  const getPropertyInputValue = () => {
    if (location.lat && location.lon) {
      return shortenString(processDisplayName(location.display_name), 37);
    } else return "Enter Property Location";
  };

  return (
    <View style={styles.container}>
      <Row style={styles.row}>
        <ThemedText type="regular">Property Location</ThemedText>
        <View style={{ marginTop: 5 }}>
          <FontAwesome5 name="star-of-life" size={7} color={red} />
        </View>
      </Row>
      <Pressable
        style={[
          styles.inputContainer,
          {
            borderColor,
          },
        ]}
        onPress={() => setOpenLocationModal(true)}
      >
        <Text style={styles.text}>{getPropertyInputValue()}</Text>
      </Pressable>
      <GetLocationModal
        isModalVisible={openLocationModal}
        handleCancel={() => setOpenLocationModal(false)}
        setOpenMapModal={setOpenMapModal}
      />
      <MapModal
        isModalOpen={openMapModal}
        closeModal={() => setOpenMapModal(false)}
      />
    </View>
  );
};

export default PropertyLocationInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
  inputContainer: {
    width: "100%",
    height: 57,
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 10,
    justifyContent: "center",
  },
  row: {
    width: "100%",
    gap: 5,
    marginBottom: -3,
  },
  text: {
    fontFamily: family,
    fontSize: small,
    color: gray,
  },
});
