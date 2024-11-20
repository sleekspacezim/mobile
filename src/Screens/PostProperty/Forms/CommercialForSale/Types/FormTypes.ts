import * as ImagePicker from "expo-image-picker";

export type ICommercialForSaleGeneralInfo = {
  numberOfRooms: string;
  price: string;
  currency: ICurrency;
  sizeNumber: string;
  sizeDimensions: string;
  type: string;
  otherType: string;
  storeys: string;
  yearBuilt: string;
  isNegotiable: boolean;
};

export type IGeneralInfoFormError =
  | "storeys"
  | "price"
  | "yearBuilt"
  | ""
  | "propertySize"
  | "numberOfRooms"
  | "type"
  | "location";

export type ICommercialForSaleFeaturesInfo = {
  hasElectricity: boolean;
  hasWater: boolean;
  otherInteriorFeatures: string;
  otherExteriorFeatures: string;
};

export type ICommercialForSaleOtherInfo = {
  marketingStatement: string;
  images: ImagePicker.ImagePickerAsset[];
};
