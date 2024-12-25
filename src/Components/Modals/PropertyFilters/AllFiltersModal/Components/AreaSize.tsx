import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import { IPropertySize } from "@/src/GlobalTypes/Types";
import InputField from "@/src/Components/InputField/InputField";
import Divider from "./Divider";
import { propertySizeDimensions } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import { sharedAreaSizeFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";

type Props = {
  propertySize: IPropertySize;
  setPropertySize: React.Dispatch<React.SetStateAction<IPropertySize>>;
};

const AreaSize: React.FC<Props> = ({ propertySize, setPropertySize }) => {
  return (
    <View style={styles.container}>
      <Row style={sharedAreaSizeFilterStyles.row}>
        <MaterialCommunityIcons name="view-grid" size={25} color={primary} />
        <ThemedText type="header">Area Size</ThemedText>
      </Row>
      <View>
        <InputField
          label="Size"
          textValue={propertySize.figure}
          placeHolder="0"
          handleOnChangeText={(figure: string) =>
            setPropertySize({ ...propertySize, figure })
          }
          contentType="none"
          type="number"
          width={200}
          height={50}
          borderColor={gray}
        />
      </View>
      <View style={sharedAreaSizeFilterStyles.dimensionContainer}>
        {propertySizeDimensions.map((dimension) => (
          <TouchableOpacity
            key={dimension}
            onPress={() => setPropertySize({ ...propertySize, dimension })}
            style={[
              sharedAreaSizeFilterStyles.dimension,
              {
                backgroundColor:
                  propertySize.dimension === dimension
                    ? lighterPrimary
                    : "transparent",
                borderColor:
                  propertySize.dimension === dimension ? primary : gray,
              },
            ]}
          >
            <Text
              style={[
                sharedAreaSizeFilterStyles.dimensionText,
                {
                  color: propertySize.dimension === dimension ? primary : gray,
                },
              ]}
            >
              {dimension === "m²" ? "Square Meters" : dimension}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{marginTop:5}}>
      <Divider/>
      </View>
    </View>
  );
};

export default AreaSize;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
