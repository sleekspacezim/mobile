import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IPropertyImageOrVideo } from "@/src/GlobalTypes/Property/Media/ImageOrVideoTypes";
import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import ImageCard from "./ImageCard/ImageCard";
import { dark, lightGray } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  media: IPropertyImageOrVideo[];
  propertyType: IPropertyType;
};

const residentialRentalImage = require("@/assets/images/forent.jpg");
const residentialForsaleImage = require("@/assets/images/forsale.jpg");
const commercialRentalImage = require("@/assets/images/commercial_forent.jpg");
const commercialForsaleImage = require("@/assets/images/commercial_forsale.jpg");
const landImage = require("@/assets/images/land.jpeg");
const standImage = require("@/assets/images/stand_forsale.jpg");

const ImageContainer: React.FC<Props> = ({ propertyType, media }) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const placeholderImage = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return commercialForsaleImage;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return commercialRentalImage;
    else if (propertyType === PropertyTypesEnum.Land) return landImage;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return residentialForsaleImage;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return residentialRentalImage;
    else return standImage;
  };
  const borderColor = theme === "dark" ? dark.darkGray : lightGray
  const height = width > SCREEN_BREAK_POINT ? 400 : 350
  return (
    <View style={[styles.image,{
      borderColor: borderColor,
      height: height,
    }]}>
      {media.length > 0 ? (
        <FlatList
          data={media}
          horizontal
          snapToEnd
          snapToAlignment="center"
          pagingEnabled
          scrollEnabled
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ index, item }) => (
            <ImageCard image={item} index={index} total={media.length} />
          )}
        />
      ) : (
        <Image
          source={placeholderImage()}
          style={{height:height}}
          contentFit="contain"
        />
      )}
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  image: {
    borderRadius:10,
    borderWidth: 1,
  }
});
