import * as ImagePicker from "expo-image-picker";

export type IResidentialRentalGeneralInfo = {
  numberOfRoomsToLet: string;
  totalNumberOfRooms: string;
  rentAmount: string;
  currency: ICurrency;
  sizeNumber: string;
  sizeDimensions: string;
  type: string;
  storeys: string;
  yearBuilt: string;
};

export type IGeneralInfoFormError =
  | "storeys"
  | "rentAmount"
  | "yearBuilt"
  | ""
  | "propertySize"
  | "totalNumberOfpropertyRooms"
  | "numberOfRoomsToLet"
  | "location";


  export type IResidentialRentalInteriorInfo = {
    bedrooms: string;
    bathrooms: string;
    isTiled: boolean;
    hasCeiling: boolean;
    isPlustered: boolean;
    isPainted: boolean;
    hasElectricity: boolean;
    hasWater: boolean;
    otherInteriorFeatures: string;
  };
  
  export type IInteriorInfoFormError =
  "bedrooms"
  | ""
  | "bathrooms"

  export type IResidentialRentalExteriorInfo = {
    numberOfGarages: string;
    hasSwimmingPool: boolean;
    isPaved: boolean;
    hasBoreHole: boolean;
    typeOfExteriorSecurity: string;
    otherExteriorFeatures: string;
  };
  
  export type IExteriorInfoFormError =
  "numberOfGarages"
  | ""

  export type IResidentialRentalOtherInfo = {
    tenantRequirements: string;
    marketingStatement: string;
    images: ImagePicker.ImagePickerAsset[];
  };