import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
} from "@/src/Utils/Constants";
import { family } from "@/src/Theme/Font";
import { gray, light, lighterPrimary, primary } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

type Props = {
  setPropertyType: React.Dispatch<React.SetStateAction<IPropertyType>>;
  propertyType: IPropertyType;
};

const PropertyTypesFilterList: React.FC<Props> = ({
  setPropertyType,
  propertyType,
}) => {
  const flatlistRef = useRef<FlatList | null>(null);
  const theme = useAppSelector((state) => state.theme.value);
  const propertyTypeList: IPropertyType[] = [
    PropertyTypesEnum.ResidentialRentals,
    PropertyTypesEnum.ResidentialForSale,
    PropertyTypesEnum.CommercialRentals,
    PropertyTypesEnum.CommercialForSale,
    PropertyTypesEnum.Stands,
    PropertyTypesEnum.Land,
  ];

  const scrollToIndex = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
  };

  const iconSize = 35;

  const propertyIcon = (type: IPropertyType) => {
    if (type === PropertyTypesEnum.CommercialForSale)
      return (
        <FontAwesome6
          name="building-columns"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
    else if (type === PropertyTypesEnum.CommercialRentals)
      return (
        <MaterialCommunityIcons
          name="office-building"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
    else if (type === PropertyTypesEnum.Land)
      return (
        <MaterialIcons
          name="landscape"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
    else if (type === PropertyTypesEnum.ResidentialForSale)
      return (
        <FontAwesome
          name="home"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
    else if (type === PropertyTypesEnum.ResidentialRentals)
      return (
        <MaterialCommunityIcons
          name="home-city"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
    else
      return (
        <Entypo
          name="inbox"
          size={iconSize}
          color={
            type === propertyType
              ? primary
              : theme === "dark"
              ? "gray"
              : light.darkGray
          }
        />
      );
  };

  return (
    <View style={styles.container}>
      <ThemedText type="header" styles={{ marginLeft: 10 }}>
        Property Type
      </ThemedText>
      <FlatList
        data={propertyTypeList}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={activeOpacityOfTouchableOpacity}
            style={[
              styles.typeContainer,
              {
                borderColor: item === propertyType ? primary : gray,
                backgroundColor:
                  item === propertyType ? lighterPrimary : "transparent",
              },
            ]}
            onPress={() => {
              scrollToIndex(propertyTypeList.indexOf(item));
              setPropertyType(item);
            }}
          >
            {propertyIcon(item)}
            <Text
              style={[
                styles.text,
                { color: item === propertyType ? primary : gray },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PropertyTypesFilterList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    gap: 10,
    marginBottom:10
  },
  typeContainer: {
    paddingTop: 5,
    height: 95,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    fontFamily: family,
    fontSize: 12,
  },
});
