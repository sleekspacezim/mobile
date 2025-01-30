import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ICommercialPropertyForSaleWithManager } from '@/src/GlobalTypes/Property/Commercial/ForSaleTypes';
import { ICommercialRentalPropertyWithManager } from '@/src/GlobalTypes/Property/Commercial/RentalTypes';
import { ILandPropertyWithManager } from '@/src/GlobalTypes/Property/Land/LandTypes';
import { IResidentialPropertyForSaleWithManager } from '@/src/GlobalTypes/Property/Residential/ForSaleTypes';
import { IResidentialRentalPropertyWithManager } from '@/src/GlobalTypes/Property/Residential/RentalTypes';
import { IStandPropertyWithManager } from '@/src/GlobalTypes/Property/Stand/StandTypes';
import { IVoidFunc } from '@/src/GlobalTypes/Types';
import { PropertyTypesEnum } from '@/src/Utils/Constants';

type Props =
  | {
      propertyType: PropertyTypesEnum.ResidentialRentals;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: IResidentialRentalPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.ResidentialForSale;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: IResidentialPropertyForSaleWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.Land;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: ILandPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.Stands;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: IStandPropertyWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialForSale;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: ICommercialPropertyForSaleWithManager;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialRentals;
      isRefreshing: boolean;
      handleRefresh: IVoidFunc;
      data: ICommercialRentalPropertyWithManager;
    };

const MobilePropertyView = (props: Props) => {
  return (
    <View>
      <Text>MobilePropertyView</Text>
    </View>
  )
}

export default MobilePropertyView

const styles = StyleSheet.create({})