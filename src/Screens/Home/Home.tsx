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
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { setActivePropertyType } from "@/src/Redux/Slices/ActivePropertyTypeSlice/ActiveProperty";

const Home: INoPropsReactComponent = () => {
  const activePropertyType = useAppSelector((state)=>state.activePropertyType.value)
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
