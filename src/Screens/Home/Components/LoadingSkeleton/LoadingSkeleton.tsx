import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import SkeletonLoader from "@/src/Components/SkeletonLoader/SkeletonLoader";
import { animatedHeaderHeight } from "../../Utils/Constants";

const LoadingSkeleton: INoPropsReactComponent = () => {
  const cardsList = [1, 2, 3,4];
  const { width } = useWindowDimensions();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        width: width,
        
      }}
    >
      <View style={styles.container}>
        {cardsList.map((card) => (
          <View
            style={[
              styles.card,
              { width: 340 },
            ]}
            key={card}
          >
            <SkeletonLoader
              style={{ width: "100%", height: 200, borderRadius: 7 }}
            />
            <View style={styles.cardSubContainer}>
              <SkeletonLoader
                style={{ width: "70%", height: 20, borderRadius: 7 }}
              />
              <SkeletonLoader
                style={{ width: "100%", height: 20, borderRadius: 7 }}
              />
              <SkeletonLoader
                style={{ width: "100%", height: 20, borderRadius: 7 }}
              />
              <SkeletonLoader
                style={{ width: "100%", height: 20, borderRadius: 7 }}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LoadingSkeleton;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 10,
    width: "100%",
    paddingTop:animatedHeaderHeight,
    justifyContent: "center",
    alignItems: "center",
    flexWrap:"wrap",
    flexDirection:"row"
  },
  card: {
    gap: 10,
  },
  cardSubContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
