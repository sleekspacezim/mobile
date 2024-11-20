import { StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import ThemedText from "../ThemedText/ThemedText";

type Props = {
  images: ImagePicker.ImagePickerAsset[];
};

const SelectedPropertyImageList: React.FC<Props> = ({ images }) => {
  return (
    <View style={styles.constainer}>
      <ThemedText type="regular">{`Selected Images: ${images.length}`}</ThemedText>
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={styles.picture}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectedPropertyImageList;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
  },
  imagesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  picture: {
    width: 90,
    height: 80,
    borderRadius: 5,
  },
});
