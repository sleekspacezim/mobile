import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import InputField from "@/src/Components/InputField/InputField";
import RangingSlider from "@/src/Components/RangingSlider/RangingSlider";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import Divider from "./Divider";
import { sharedRentFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import { IRentFilter } from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import useRentFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useRentFilterFuncs";

type Props = {
  rentFilterLocalDetails: IRentFilter;
  propertyType: IPropertyType;
  setRentFilterLocalDetails: React.Dispatch<React.SetStateAction<IRentFilter>>;
};

const RentFilter: React.FC<Props> = ({
  rentFilterLocalDetails,
  setRentFilterLocalDetails,
  propertyType,
}) => {
  const maxValue = 3000;

  const { borderColor, rentMax, rentMin, setRentMax, setRentMin } =
    useRentFilterFuncs(
      rentFilterLocalDetails,
      propertyType,
      setRentFilterLocalDetails
    );

  return (
    <View style={styles.container}>
      <Row style={sharedRentFilterStyles.row}>
        <Ionicons name="pricetag-outline" size={25} color={primary} />
        <ThemedText type="header">Rent</ThemedText>
      </Row>
      <View style={sharedRentFilterStyles.sliderContainer}>
        <RegularText>(Min) Rental Amount</RegularText>
        <RangingSlider
          maxValue={maxValue}
          minValue={0}
          onChange={setRentMin}
          value={rentMin()}
          step={10}
        />
      </View>
      <Row style={sharedRentFilterStyles.inputRow}>
        <View>
          <InputField
            textValue={rentMin().toString()}
            placeHolder="0"
            handleOnChangeText={(rent: string) => setRentMin(+rent)}
            contentType="none"
            type="number"
            width={130}
            height={50}
            borderColor={borderColor()}
          />
        </View>
        <ThemedText type="regular">To</ThemedText>
        <View>
          <InputField
            textValue={rentMax().toString()}
            placeHolder="Any"
            handleOnChangeText={(rent: string) => setRentMax(+rent)}
            contentType="none"
            type="number"
            width={130}
            height={50}
            borderColor={borderColor()}
          />
        </View>
      </Row>
      <View style={sharedRentFilterStyles.sliderContainer}>
        <RegularText>(Max) Rental Amount</RegularText>
        <RangingSlider
          maxValue={maxValue}
          minValue={0}
          onChange={setRentMax}
          value={rentMax()}
          step={10}
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <Divider />
      </View>
    </View>
  );
};

export default RentFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
