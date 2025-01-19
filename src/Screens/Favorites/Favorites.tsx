import { View } from "react-native";
import React, { useState } from "react";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import SigninAndSignupBtn from "@/src/Components/SigninAndSignupBtns/SigninAndSignupBtn";
import FavoriteResidentialRentals from "./Components/PropertyTypes/FavoriteResidentialRentals";
import PropertyTypeList from "@/src/Components/PropertyTypeList/PropertyTypeList";
import TotalProperties from "@/src/Components/TotalProperties/TotalProperties";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import FavoriteResidentialsForSale from "./Components/PropertyTypes/FavoriteResidentialsForSale";
import FavoriteCommercialsForSale from "./Components/PropertyTypes/FavoriteCommercialsForSale";
import FavoriteCommercialRentals from "./Components/PropertyTypes/FavoriteCommercialRentals";
import FavoriteLand from "./Components/PropertyTypes/FavoriteLand";
import FavoriteStands from "./Components/PropertyTypes/FavoriteStands";

const Favorites: INoPropsReactComponent = () => {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [activePropertyType, setActivePropertyType] = useState<IPropertyType>(
    PropertyTypesEnum.ResidentialRentals
  );
  const { accessToken } = useAppSelector((state) => state.user.value);
  return (
    <Screen>
      {!accessToken && <SigninAndSignupBtn screenType={"favorites"} />}
      {accessToken && (
        <View style={{ flex: 1, gap: 10 }}>
          <PropertyTypeList
            activePropertyType={activePropertyType}
            setActivePropertyType={setActivePropertyType}
          />
          <TotalProperties
            totalProperties={totalProperties}
            activePropertyType={activePropertyType}
          />
          {activePropertyType === PropertyTypesEnum.ResidentialRentals && (
            <FavoriteResidentialRentals
              setTotalproperties={setTotalProperties}
            />
          )}
          {activePropertyType === PropertyTypesEnum.ResidentialForSale && (
            <FavoriteResidentialsForSale
              setTotalproperties={setTotalProperties}
            />
          )}
          {activePropertyType === PropertyTypesEnum.CommercialForSale && (
            <FavoriteCommercialsForSale
              setTotalproperties={setTotalProperties}
            />
          )}
          {activePropertyType === PropertyTypesEnum.CommercialRentals && (
            <FavoriteCommercialRentals
              setTotalproperties={setTotalProperties}
            />
          )}
          {activePropertyType === PropertyTypesEnum.Land && (
            <FavoriteLand setTotalproperties={setTotalProperties} />
          )}
          {activePropertyType === PropertyTypesEnum.Stands && (
            <FavoriteStands setTotalproperties={setTotalProperties} />
          )}
        </View>
      )}
    </Screen>
  );
};

export default Favorites;
