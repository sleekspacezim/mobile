import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { family } from "@/src/Theme/Font";
import { white } from "@/src/Theme/Colors";
import { IPropertyImageOrVideo } from "@/src/GlobalTypes/Property/Media/ImageOrVideoTypes";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

type Props = {
  image: IPropertyImageOrVideo;
  index: number;
  total: number;
};

const ImageCard: React.FC<Props> = ({ image, index, total }) => {
  const { width } = useWindowDimensions();
  const widthValue = width - 10;
  return (
    <View style={[styles.container, { width: widthValue }]}>
      <ImageBackground
        source={{ uri: image.uri }}
        style={{ height: width > SCREEN_BREAK_POINT ? 400 : 350 }}
        resizeMode="contain"
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
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
  image: { height: 350 },
  counterContainer: {
    position: "absolute",
    top: 10,
    right: 20,
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
