import { ICurrency } from "@/src/GlobalTypes/Property/Common";
import * as ImagePicker from "expo-image-picker";

export type ICommercialRentalGeneralInfo = {
  numberOfRooms: string;
  rentAmount: string;
  currency: ICurrency;
  numberOfRoomsToLet:string,
  sizeNumber: string;
  sizeDimensions: string;
  type: string;
  otherType: string;
  storeys: string;
  yearBuilt: string;
  isFullSpace: boolean;
};

export type IGeneralInfoFormError =
  | "storeys"
  | "rentAmount"
  | "yearBuilt"
  | ""
  | "propertySize"
  | "numberOfRooms"
  |"roomsToLet"
  | "type"
  | "location";

export type ICommercialRentalFeaturesInfo = {
  hasElectricity: boolean;
  hasWater: boolean;
  otherInteriorFeatures: string;
  otherExteriorFeatures: string;
};

export type ICommercialRentalOtherInfo = {
  tenantRequirements: string;
  marketingStatement: string;
  images: ImagePicker.ImagePickerAsset[];
};
