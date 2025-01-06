import React, { useState } from "react";
import { Animated } from "react-native";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import AnimatedListHeader from "./Components/AnimatedListHeader/AnimatedListHeader";
import ResidentialRentalsList from "./Components/PropertyTypes/ResidentialRentalsList";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { IPropertiesViewType } from "./Types/Types";
import SortAndViewType from "./Components/SortAndViewType/SortAndViewType";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import ResidentialForSaleList from "./Components/PropertyTypes/ResidentialForSaleList";
import CommercialForSaleList from "./Components/PropertyTypes/CommercialForSaleList";
import CommercialRentalsList from "./Components/PropertyTypes/CommercialRentalsList";
import StandsList from "./Components/PropertyTypes/StandsList";
import LandsList from "./Components/PropertyTypes/LandsList";

const Home: INoPropsReactComponent = () => {
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
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
      />
      {activePropertyType === PropertyTypesEnum.ResidentialRentals && (
        <ResidentialRentalsList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
      {activePropertyType === PropertyTypesEnum.ResidentialForSale && (
        <ResidentialForSaleList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
      {activePropertyType === PropertyTypesEnum.CommercialForSale && (
        <CommercialForSaleList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
      {activePropertyType === PropertyTypesEnum.CommercialRentals && (
        <CommercialRentalsList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
      {activePropertyType === PropertyTypesEnum.Stands && (
        <StandsList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
      {activePropertyType === PropertyTypesEnum.Land && (
        <LandsList
          setTotalproperties={setTotalproperties}
          scrollAnimation={scrollAnimation}
        />
      )}
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
