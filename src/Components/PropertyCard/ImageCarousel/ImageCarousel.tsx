import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";

import { IPropertyImageOrVideo } from "@/src/GlobalTypes/Property/Media/ImageOrVideoTypes";
import ImageCard from "./ImageCard/ImageCard";
import { propertyCardBorderRadius } from "../Constants/Constants";

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

const ImageCarousel: React.FC<Props> = ({ media, propertyType }) => {
  const placeholderImage = () => {
    if (propertyType === "Commercial ForSale") return commercialForsaleImage;
    else if (propertyType === "Commercial Rentals")
      return commercialRentalImage;
    else if (propertyType === "Land") return landImage;
    else if (propertyType === "Residential ForSale")
      return residentialForsaleImage;
    else if (propertyType === "Residential Rentals")
      return residentialRentalImage;
    else return standImage;
  };

  return (
    <View style={{ width: "100%" }}>
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ index, item }) => (
            <ImageCard image={item} index={index} total={media.length} />
          )}
        />
      ) : (
        <Image
          source={placeholderImage()}
          style={styles.image}
          contentFit="cover"
        />
      )}
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  image: {
    height: 250,
    borderTopLeftRadius: propertyCardBorderRadius,
    borderTopRightRadius: propertyCardBorderRadius,
  },
});
