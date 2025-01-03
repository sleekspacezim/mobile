import {
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import {
  commercialStructuralTypes,
  landStructuralTypes,
  standStructuralTypes,
  residentialStructuralTypes,
} from "./Contants";
import { primary } from "@/src/Theme/Colors";

export const propertyStructureTypeOptions = (
  activePropertyType: IPropertyType
) => {
  if (
    activePropertyType === PropertyTypesEnum.CommercialForSale ||
    activePropertyType === PropertyTypesEnum.CommercialRentals
  )
    return commercialStructuralTypes;
  else if (activePropertyType === PropertyTypesEnum.Land)
    return landStructuralTypes;
  else if (activePropertyType === PropertyTypesEnum.Stands)
    return standStructuralTypes;
  else return residentialStructuralTypes;
};

const iconSize = 21;

export const propertyStructureTypeIcon = (propertyStructureType: string) => {
  if (propertyStructureType === "Shop")
    return <Entypo name="shop" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Building")
    return <FontAwesome name="building" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Land" || propertyStructureType === "Plot")
    return <MaterialIcons name="landscape" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Other")
    return (
      <MaterialIcons name="real-estate-agent" size={iconSize} color={primary} />
    );
  else if (propertyStructureType === "Residential")
    return <Ionicons name="home" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Mine")
    return (
      <MaterialCommunityIcons
        name="excavator"
        size={iconSize}
        color={primary}
      />
    );
  else if (propertyStructureType === "Farm")
    return <FontAwesome6 name="cow" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Cottage")
    return <MaterialIcons name="cottage" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Commercial building")
    return (
      <FontAwesome6 name="building-columns" size={iconSize} color={primary} />
    );
  else if (propertyStructureType === "Single family home")
    return <Ionicons name="home" size={iconSize} color={primary} />;
  else if (propertyStructureType === "Multi family complex")
    return (
      <MaterialCommunityIcons
        name="home-group"
        size={iconSize}
        color={primary}
      />
    );
  else if (propertyStructureType === "Flat")
    return (
      <MaterialCommunityIcons
        name="office-building"
        size={iconSize}
        color={primary}
      />
    );
  else if (propertyStructureType === "Factory")
    return <MaterialIcons name="factory" size={iconSize} color={primary} />;
  else
    return <MaterialIcons name="apartment" size={iconSize} color={primary} />;
};
