import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import SearchLocationModal from "@/src/Components/Modals/Location/SearchLocation/SearchLocationModal";

type Props = {
  propertyType: IPropertyType;
};

const Header: React.FC<Props> = ({ propertyType }) => {
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  return (
    <Row style={styles.container}>
      <HeaderIcon iconName="arrow-back" onPressFunc={() => router.back()} />
      <ThemedText type="header">Search results</ThemedText>
      <HeaderIcon
        iconName="search-outline"
        onPressFunc={() => setOpenSearchModal(true)}
      />
      {openSearchModal && (
        <SearchLocationModal
          isModalVisible={openSearchModal}
          handleCancel={() => setOpenSearchModal(false)}
          propertyType={propertyType}
        />
      )}
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingTop: 10,
  },
});
