import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import Bedrooms from "./Components/Bedrooms";
import Bathrooms from "./Components/Bathrooms";
import PriceOrRent from "./Components/PriceOrRent";
import TotalRooms from "./Components/TotalRooms";
import RoomsToRent from "./Components/RoomsToRent";
import Garages from "./Components/Garages";
import Stories from "./Components/Stories";
import YearBuilt from "./Components/YearBuilt";
import Size from "./Components/Size";
import Type from "./Components/Type";
import PostedTime from "./Components/PostedTime";
import PublicUtilities from "./Components/PublicUtilities";
import Negotiability from "./Components/Negotiability";
import Status from "./Components/Status";
import Divider from "../Divider/Divider";
import { primary } from "@/src/Theme/Colors";
import Heading from "../Heading/Heading";
import OtherFeatures from "./Components/OtherFeatures";

type Props =
  | {
      propertyType: PropertyTypesEnum.ResidentialRentals;
      property: IResidentialRentalPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.ResidentialForSale;
      property: IResidentialPropertyForSaleWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.Land;
      property: ILandPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.Stands;
      property: IStandPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialForSale;
      property: ICommercialPropertyForSaleWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialRentals;
      property: ICommercialRentalPropertyWithManager;
    };

const Features: React.FC<Props> = ({ property, propertyType }) => {
  return (
    <View style={styles.container}>
      <Heading
        title="Features"
        icon={
          <MaterialCommunityIcons
            name="eye-circle-outline"
            size={26}
            color={primary}
          />
        }
      />
      <View style={styles.subContainer}>
        {propertyType === PropertyTypesEnum.CommercialRentals ||
        propertyType === PropertyTypesEnum.ResidentialRentals ? (
          <PriceOrRent
            type="Rent"
            amount={property.rentAmount}
            currency={property.currency}
          />
        ) : (
          <PriceOrRent
            type="Price"
            amount={property.price}
            currency={property.currency}
          />
        )}
        {propertyType !== PropertyTypesEnum.CommercialRentals &&
          propertyType !== PropertyTypesEnum.ResidentialRentals && (
            <Negotiability isNegotiable={property.isNegotiable} />
          )}
        {propertyType === PropertyTypesEnum.CommercialRentals && (
          <RoomsToRent
            rooms={property.numberOfRoomsToLet}
            type="Commercial"
            isFullSpace={
              property.isFullSpace ? property.isFullSpace : undefined
            }
          />
        )}
        {propertyType === PropertyTypesEnum.ResidentialRentals && (
          <RoomsToRent
            rooms={property.numberOfRoomsToLet}
            type="Residential"
            isFullHouse={
              property.isFullHouse ? property.isFullHouse : undefined
            }
          />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialRentals ||
          propertyType === PropertyTypesEnum.ResidentialForSale) && (
          <TotalRooms rooms={property.numberOfRooms} />
        )}
        {propertyType === PropertyTypesEnum.ResidentialForSale ||
          (propertyType === PropertyTypesEnum.ResidentialRentals && (
            <Bedrooms bedroomNumber={property.bedrooms} />
          ))}
        {propertyType === PropertyTypesEnum.ResidentialForSale ||
          (propertyType === PropertyTypesEnum.ResidentialRentals && (
            <Bathrooms bathroomNumber={property.bathrooms} />
          ))}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Has Ceiling" property={property.hasCeiling} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Tiled" property={property.isTiled} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Painted" property={property.isPainted} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Paved" property={property.isPaved} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Plustered" property={property.isPlustered} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Pool" property={property.hasSwimmingPool} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <OtherFeatures header="Has Borehole" property={property.hasBoreHole} />
        )}
        {(propertyType === PropertyTypesEnum.ResidentialForSale ||
          propertyType === PropertyTypesEnum.ResidentialRentals) && (
          <Garages garageNumber={property.numberOfGarages} />
        )}
        {propertyType !== PropertyTypesEnum.Stands &&
          propertyType !== PropertyTypesEnum.Land && (
            <PublicUtilities
              hasElectricity={property.hasElectricity}
              hasWater={property.hasWater}
              type="built"
            />
          )}
        {propertyType === PropertyTypesEnum.Land && (
          <PublicUtilities
            hasElectricity={property.areaHasElectricity}
            hasWater={property.hasWater}
            type="non-built"
          />
        )}
        {propertyType === PropertyTypesEnum.Stands && (
          <PublicUtilities
            hasElectricity={property.areaHasElectricity}
            hasWater={property.isServiced}
            type="stand"
          />
        )}
        <Size
          size={property.sizeNumber}
          sizeDimensions={property.sizeDimensions}
        />
        {propertyType !== PropertyTypesEnum.Stands &&
          propertyType !== PropertyTypesEnum.Land && (
            <Stories stories={property.storeys} />
          )}
        {propertyType !== PropertyTypesEnum.Stands &&
          propertyType !== PropertyTypesEnum.Land && (
            <YearBuilt year={property.yearBuilt} />
          )}
        <Type type={property.type} />
        <Status status={property.status} />
        <PostedTime timePosted={property.postedTime} />
      </View>
      <Divider />
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingTop:10
  },
  subContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
});
