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
import StandInformation from "./CardInformation/Components/Stand";
import LandInformation from "./CardInformation/Components/Land";
import CommercialForSaleInformation from "./CardInformation/Components/CommercialForSale";
import CommercialRentalsInformation from "./CardInformation/Components/CommercialRentals";
import ResidentialForSaleInformation from "./CardInformation/Components/ResidentialForSale";
import ResidentialRentalsInformation from "./CardInformation/Components/ResidentialRentalsInformation";
import { propertyCardTabletWidth } from "./Constants/Constants";

type Props =
  | {
      type: PropertyTypesEnum.ResidentialRentals;
      property: IResidentialRentalPropertyWithManager;
    }
  | {
      type: PropertyTypesEnum.ResidentialForSale;
      property: IResidentialPropertyForSaleWithManager;
    }
  | {
      type: PropertyTypesEnum.CommercialForSale;
      property: ICommercialPropertyForSaleWithManager;
    }
  | {
      type: PropertyTypesEnum.CommercialRentals;
      property: ICommercialRentalPropertyWithManager;
    }
  | {
      type: PropertyTypesEnum.Stands;
      property: IStandPropertyWithManager;
    }
  | {
      type: PropertyTypesEnum.Land;
      property: ILandPropertyWithManager;
    };

const PropertyCard: React.FC<Props> = ({ type, property }) => {
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
        <StandInformation property={property} />
      )}
      {type === PropertyTypesEnum.Land && (
        <LandInformation property={property} />
      )}
      {type === PropertyTypesEnum.CommercialForSale && (
        <CommercialForSaleInformation property={property} />
      )}
      {type === PropertyTypesEnum.CommercialRentals && (
        <CommercialRentalsInformation property={property} />
      )}
      {type === PropertyTypesEnum.ResidentialForSale && (
        <ResidentialForSaleInformation property={property} />
      )}
      {type === PropertyTypesEnum.ResidentialRentals && (
        <ResidentialRentalsInformation property={property} />
      )}
    </View>
  );
};

export default PropertyCard;
