import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { IPropertyImageOrVideo } from "@/src/GlobalTypes/Property/Media/ImageOrVideoTypes";
import { white } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import {
  propertyCardBorderRadius,
  propertyCardTabletWidth,
} from "../../Constants/Constants";

type Props = {
  image: IPropertyImageOrVideo;
  index: number;
  total: number;
};

const ImageCard: React.FC<Props> = ({ image, index, total }) => {
  const { width } = useWindowDimensions();
  const widthValue =
    width > SCREEN_BREAK_POINT ? propertyCardTabletWidth : width - 10;

  return (
    <View style={[styles.container, { width: widthValue }]}>
      <ImageBackground
        source={{ uri: image.uri }}
        style={styles.image}
        resizeMode="cover"
        borderTopLeftRadius={propertyCardBorderRadius}
        borderTopRightRadius={propertyCardBorderRadius}
      >
        <View style={[styles.counterContainer]}>
          <Text style={styles.counterText}>{`${index + 1} / ${total}`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: { height: 250, width: "100%" },
  counterContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 40,
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontFamily: family,
    fontSize: 10,
    color: white,
  },
});
