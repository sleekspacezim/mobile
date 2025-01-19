import { useWindowDimensions, View } from "react-native";
import React from "react";

import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import StandInformation from "./CardInformation/Components/StandInformation";
import LandInformation from "./CardInformation/Components/LandInformation";
import CommercialForSaleInformation from "./CardInformation/Components/CommercialForSale";
import CommercialRentalsInformation from "./CardInformation/Components/CommercialRentalsInformation";
import ResidentialForSaleInformation from "./CardInformation/Components/ResidentialForSaleInformation";
import ResidentialRentalsInformation from "./CardInformation/Components/ResidentialRentalsInformation";
import { propertyCardTabletWidth } from "./Constants/Constants";

type Props =
  | {
      type: PropertyTypesEnum.ResidentialRentals;
      property: IResidentialRentalPropertyWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    }
  | {
      type: PropertyTypesEnum.ResidentialForSale;
      property: IResidentialPropertyForSaleWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    }
  | {
      type: PropertyTypesEnum.CommercialForSale;
      property: ICommercialPropertyForSaleWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    }
  | {
      type: PropertyTypesEnum.CommercialRentals;
      property: ICommercialRentalPropertyWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    }
  | {
      type: PropertyTypesEnum.Stands;
      property: IStandPropertyWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    }
  | {
      type: PropertyTypesEnum.Land;
      property: ILandPropertyWithManager;
      isOnfavoritesScreen?: boolean;
      setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
    };

const PropertyCard: React.FC<Props> = ({
  type,
  property,
  isOnfavoritesScreen,
  setTotalProperties
}) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width:
          width > SCREEN_BREAK_POINT ? propertyCardTabletWidth : width - 10,
        borderRadius: 10,
      }}
    >
      <ImageCarousel media={property.media} propertyType={type} />
      {type === PropertyTypesEnum.Stands && (
        <StandInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
      {type === PropertyTypesEnum.Land && (
        <LandInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
      {type === PropertyTypesEnum.CommercialForSale && (
        <CommercialForSaleInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
      {type === PropertyTypesEnum.CommercialRentals && (
        <CommercialRentalsInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
      {type === PropertyTypesEnum.ResidentialForSale && (
        <ResidentialForSaleInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
      {type === PropertyTypesEnum.ResidentialRentals && (
        <ResidentialRentalsInformation
          property={property}
          isOnfavoritesScreen={isOnfavoritesScreen}
          setTotalProperties={setTotalProperties}
        />
      )}
    </View>
  );
};

export default PropertyCard;
