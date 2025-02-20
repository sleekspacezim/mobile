import { StyleSheet } from "react-native";
import React from "react";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import ThreeDots from "@/src/Components/ThreeDots/ThreeDots";
import FavoriteContainer from "../../../../FavoriteContainer/FavoriteContainer";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  userId: number;
  isFavorite: boolean;
  type: string;
  id: number;
  managerId: number;
  propertyType:IPropertyType
  propertyUniqueId: number;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const TypeDotsAndFavorite: React.FC<Props> = ({
  type,
  userId,
  id,
  isFavorite,
  managerId,
  propertyType,
  propertyUniqueId,
  setTotalProperties
}) => {
  const user = useAppSelector((state) => state.user.value);
  return (
    <Row style={styles.container}>
      <ThemedText type="subHeader">{type}</ThemedText>
      <Row style={{ gap: 5, alignItems: "center" }}>
        {user.id !== userId && (
          <FavoriteContainer
            propertyId={id}
            isPropertyFavorite={isFavorite}
            propertyType={propertyType}
            propertyUniqueId={propertyUniqueId}
            setTotalProperties={setTotalProperties}
          />
        )}
        <ThreeDots
          propertyId={id}
          managerId={managerId}
          propertyType={propertyType}
          type="property"
          isFavorite={isFavorite}
          userId={userId}
          propertyUniqueId={propertyUniqueId}
        />
      </Row>
    </Row>
  );
};

export default TypeDotsAndFavorite;

const styles = StyleSheet.create({
  container:{ justifyContent: "space-between", alignItems: "center" }
});
