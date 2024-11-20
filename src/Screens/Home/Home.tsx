import React, { useState } from "react";
import { Animated } from "react-native";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import AnimatedListHeader from "./Components/AnimatedListHeader/AnimatedListHeader";
import ResidentialRentalsList from "./Components/PropertyTypes/ResidentialRentalsList";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IPropertiesViewType } from "./Types/Types";
import SortAndViewType from "./Components/SortAndViewType/SortAndViewType";

const Home: INoPropsReactComponent = () => {
  const [activePropertyType, setActivePropertyType] = useState<IPropertyType>(
    PropertyTypesEnum.ResidentialRentals
  );
  const [propertiesViewType, setPropertiesViewType] =
    useState<IPropertiesViewType>("list");
  const [totalProperties, setTotalproperties] = useState<number>(0);
  const [scrollAnimation] = useState(new Animated.Value(0));
  return (
    <Screen>
      <AnimatedListHeader
        activePropertyType={activePropertyType}
        totalProperties={totalProperties}
        scrollAnimation={scrollAnimation}
        setActivePropertyType={setActivePropertyType}
      />
      <ResidentialRentalsList
        setTotalproperties={setTotalproperties}
        scrollAnimation={scrollAnimation}
      />
      {totalProperties > 0 && (
        <SortAndViewType
          propertiesViewType={propertiesViewType}
          activePropertyType={activePropertyType}
          setPropertiesViewType={setPropertiesViewType}
        />
      )}
    </Screen>
  );
};

export default Home;
