import { FlatList, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import PagerView from "react-native-pager-view";

import { propertyListType } from "@/src/Utils/Constants";
import PropertyType from "./PropertyType/PropertyType";
import { dark, light } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  children: React.ReactNode[];
  propertyType?: IPropertyType;
};

const PropertiesScreenWrapper: React.FC<Props> = ({
  children,
  propertyType,
}) => {
  const [propertyTypeOpened, setPropertyTypeOpened] = useState<IPropertyType>(
    propertyType ? propertyType : propertyListType[0]
  );
  const pagerRef = useRef<PagerView>(null);
  const flatListRef = useRef<FlatList<IPropertyType>>(null);
  const theme = useAppSelector((state) => state.theme.value);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <View>
        <FlatList
          data={propertyListType}
          ref={flatListRef}
          renderItem={({ item }) => (
            <PropertyType
              type={item}
              onPressFunc={() => {
                setPropertyTypeOpened(item);
                pagerRef.current?.setPage(propertyListType.indexOf(item));
                scrollToIndex(propertyListType.indexOf(item));
              }}
              isHighlighted={item === propertyTypeOpened ? true : false}
            />
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            borderBottomColor:
              theme === "light" ? light.background : dark.darkGray,
            borderBottomWidth: 1,
          }}
        />
      </View>
      <PagerView
        style={styles.container}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => {
          setPropertyTypeOpened(propertyListType[e.nativeEvent.position]);
          scrollToIndex(e.nativeEvent.position);
        }}
      >
        {children.map((child, index) => (
          <View style={styles.page} key={index + 1}>
            {child}
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default PropertiesScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  page: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
