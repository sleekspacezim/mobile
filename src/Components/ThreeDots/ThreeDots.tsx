import {
  GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, gray } from "@/src/Theme/Colors";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";
import { useSharedContext } from "@/src/Context/SharedContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";

type Props =
  | {
      propertyId: number;
      managerId: number;
      propertyType: IPropertyType;
      type: "property";
      isFavorite: boolean;
    }
  | {
      type: "user";
      userId: number;
    };

const ThreeDots: React.FC<Props> = (props) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { setSelectedProperty } = useSharedContext();
  const { setIsPropertyCardBottomSheetOpen } = useBottomSheetsContext();
  const underLayColor = theme === "light" ? "#DDDBDE" : dark.darkGray;
  return (
    <TouchableHighlight
      onPress={(e: GestureResponderEvent) => {
        e.stopPropagation();
        if (props.type === "property") {
          setSelectedProperty({
            id: props.propertyId,
            managerId: props.managerId,
            type: props.propertyType,
            isFavorite: props.isFavorite,
          });
        }
        setIsPropertyCardBottomSheetOpen(true);
      }}
      underlayColor={underLayColor}
      style={styles.container}
      activeOpacity={activeOpacityOfTouchableOpacity}
    >
      <MaterialCommunityIcons name="dots-vertical" size={22} color={gray} />
    </TouchableHighlight>
  );
};

export default ThreeDots;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: -5,
  },
});
