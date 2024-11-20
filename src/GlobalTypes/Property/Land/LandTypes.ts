import { IManagerAccount } from "../../Manager/ManagerTypes";
import { IPropertyInsights } from "../Insights/InsightsTypes";
import {
  IPropertyLocation,
  IPropertyLocationCreation,
} from "../Location/LocationTypes";
import {
  IPropertyImageOrVideo,
  IPropertyImageOrVideoCreationOrUpdate,
} from "../Media/ImageOrVideoTypes";

export type ILandProperty = {
  id: number;
  managerId: number;
  uniqueId: number;
  price: number;
  sizeNumber: number;
  areaHasElectricity: boolean;
  hasWater: boolean;
  isNegotiable: boolean;
  isFavorite: boolean;
  status: IStatus;
  type: string;
  sizeDimensions: string;
  currency: ICurrency;
  otherDetails: string[];
  postedTime: string;
  insights: IPropertyInsights;
  propertyLocation: IPropertyLocation;
  media: IPropertyImageOrVideo[];
};

export type ILandPropertyCreation = {
  managerId: number;
  price: number;
  sizeNumber: number;
  areaHasElectricity: boolean;
  hasWater: boolean;
  isNegotiable: boolean;
  status: IStatus;
  type: string;
  currency: ICurrency;
  sizeDimensions: string;
  otherDetails: string[];
  propertyLocation: IPropertyLocationCreation;
  media: IPropertyImageOrVideoCreationOrUpdate[];
};

export type ILandPropertyWithManager = {
  id: number;
  managerId: number;
  uniqueId: number;
  price: number;
  sizeNumber: number;
  areaHasElectricity: boolean;
  isFavorite: boolean;
  hasWater: boolean;
  isNegotiable: boolean;
  status: IStatus;
  type: string;
  sizeDimensions: string;
  otherDetails: string[];
  postedTime: string;
  currency: ICurrency;
  insights: IPropertyInsights;
  propertyLocation: IPropertyLocation;
  media: IPropertyImageOrVideo[];
  manager: IManagerAccount;
};

export type ILandPropertyUpdate = {
  id: number;
  managerId: number;
  uniqueId: number;
  price: number;
  sizeNumber: number;
  areaHasElectricity: boolean;
  hasWater: boolean;
  currency: ICurrency;
  isNegotiable: boolean;
  status: IStatus;
  type: string;
  sizeDimensions: string;
  otherDetails: string[];
};
