import * as ImagePicker from "expo-image-picker";

export type IStandGeneralInfo = {
  price: string;
  currency: ICurrency;
  sizeNumber: string;
  sizeDimensions: string;
  type: string;
  otherType: string;
  isNegotiable: boolean;
  level: string;
  otherLevel: string;
};

export type IGeneralInfoFormError =
  | "price"
  | ""
  | "propertySize"
  | "type"
  | "level"
  | "location";

export type IStandFeaturesInfo = {
  areaHasElectricity: boolean;
  isServiced: boolean;
  otherDetails: string;
};

export type IStandOtherInfo = {
  marketingStatement: string;
  images: ImagePicker.ImagePickerAsset[];
};
