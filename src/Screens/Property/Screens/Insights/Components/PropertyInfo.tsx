import { StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { IPropertyType, IStatus } from "@/src/GlobalTypes/Property/Common";
import { imageBlurhash, PropertyTypesEnum } from "@/src/Utils/Constants";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

const residentialRentalImage = require("@/assets/images/forent.jpg");
const residentialForsaleImage = require("@/assets/images/forsale.jpg");
const commercialRentalImage = require("@/assets/images/commercial_forent.jpg");
const commercialForsaleImage = require("@/assets/images/commercial_forsale.jpg");
const landImage = require("@/assets/images/land.jpeg");
const standImage = require("@/assets/images/stand_forsale.jpg");

type Props = {
  image: string;
  propertyType: IPropertyType;
  type: string;
  status: IStatus;
  postedTime: string;
};

const PropertyInfo: React.FC<Props> = ({
  image,
  postedTime,
  propertyType,
  status,
  type,
}) => {
  const getImage = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return commercialForsaleImage;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return commercialRentalImage;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return residentialForsaleImage;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return residentialRentalImage;
    else if (propertyType === PropertyTypesEnum.Stands) return standImage;
    else return landImage;
  };
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : getImage()}
        placeholder={{ blurhash: imageBlurhash }}
        style={styles.imageStyles}
      />
      <View>
        <ThemedText type="regular">{type}</ThemedText>
        <ThemedText type="regular">{status}</ThemedText>
        <ThemedText type="regular">{postedTime}</ThemedText>
      </View>
    </View>
  );
};

export default PropertyInfo;

const styles = StyleSheet.create({
  container: {
    marginTop:5,
    gap: 10,
    flexDirection: "row",
  },
  imageStyles: {
    width: 120,
    height: 90,
    borderRadius: 10,
  },
});
