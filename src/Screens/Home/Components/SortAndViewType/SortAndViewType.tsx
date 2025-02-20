import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { primary, gray, dark, white, pureWhite } from "@/src/Theme/Colors";
import { IPropertiesViewType } from "../../Types/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { family, small } from "@/src/Theme/Font";
import SortPropertiesModal from "@/src/Components/Modals/SortProperties/SortPropertiesModal";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  propertiesViewType: IPropertiesViewType;
  activePropertyType: IPropertyType;
  setPropertiesViewType: React.Dispatch<
    React.SetStateAction<IPropertiesViewType>
  >;
};

const SortAndViewType: React.FC<Props> = ({
  propertiesViewType,
  activePropertyType,
  setPropertiesViewType,
}) => {
  const [openSortPropertiesModal, setOpenSortPropertiesModal] =
    useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const iconSize = 24;
  const { width } = useWindowDimensions();

  const togglePropertiesViewType = () => {
    if (propertiesViewType === "list") setPropertiesViewType("map");
    else setPropertiesViewType("list");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? dark.darkGray : pureWhite,
          right: (width - 170) / 2,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.sortOrMap}
        onPress={togglePropertiesViewType}
      >
        {propertiesViewType === "list" ? (
          <MaterialCommunityIcons
            name="map-outline"
            size={iconSize}
            color={primary}
          />
        ) : (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={iconSize}
            color={primary}
          />
        )}
        <Text
          style={[
            styles.textStyles,
            { color: theme === "dark" ? white : gray },
          ]}
        >
          {propertiesViewType === "list" ? "map" : "list"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setOpenSortPropertiesModal(true)}
        disabled={propertiesViewType === "map" ? true : false}
        style={[
          styles.sortOrMap,
          { borderLeftWidth: 1, borderLeftColor: gray },
        ]}
      >
        <MaterialCommunityIcons name="sort" size={iconSize} color={primary} />
        <Text
          style={[
            styles.textStyles,
            { color: theme === "dark" ? white : gray },
          ]}
        >
          sort
        </Text>
      </TouchableOpacity>
      {openSortPropertiesModal && (
        <SortPropertiesModal
          handleCancel={() => setOpenSortPropertiesModal(false)}
          isModalVisible={openSortPropertiesModal}
          propertyType={activePropertyType}
        />
      )}
    </View>
  );
};

export default SortAndViewType;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    height: 40,
    borderRadius: 20,
    elevation: 10,
    width: 170,
  },
  sortOrMap: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingVertical: 2,
  },
  textStyles: {
    fontFamily: family,
    fontSize: small,
  },
});
