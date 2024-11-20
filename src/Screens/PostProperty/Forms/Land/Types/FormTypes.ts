import * as ImagePicker from "expo-image-picker";

export type ILandGeneralInfo = {
  price: string;
  currency: ICurrency;
  sizeNumber: string;
  sizeDimensions: string;
  type: string;
  otherType: string;
  isNegotiable: boolean;
};

export type IGeneralInfoFormError =
  | "price"
  | ""
  | "propertySize"
  | "type"
  | "location";

export type ILandFeaturesInfo = {
  areaHasElectricity: boolean;
  hasWater: boolean;
  otherDetails: string;
};

export type ILandOtherInfo = {
  marketingStatement: string;
  images: ImagePicker.ImagePickerAsset[];
};
