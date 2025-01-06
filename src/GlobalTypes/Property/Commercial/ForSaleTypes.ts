import { IManagerAccount } from "../../Manager/ManagerTypes";
import { ICurrency, IStatus } from "../Common";
import { IPropertyInsights } from "../Insights/InsightsTypes";
import { IPropertyLocation, IPropertyLocationCreation } from "../Location/LocationTypes";
import { IPropertyImageOrVideo, IPropertyImageOrVideoCreationOrUpdate } from "../Media/ImageOrVideoTypes";

export type ICommercialPropertyForSale = {
  id: number;
  managerId: number;
  uniqueId: number;
  numberOfRooms: number;
  price: number;
  sizeNumber: number;
  hasElectricity: boolean;
  isFavorite: boolean;
  hasWater: boolean;
  isNegotiable: boolean;
  status: IStatus;
  yearBuilt: number;
  storeys: number;
  type: string;
  sizeDimensions: string;
  currency: ICurrency;
  marketingStatement: string;
  otherInteriorFeatures: string[];
  otherExteriorFeatures: string[];
  postedTime: string;
  insights:IPropertyInsights,
  propertyLocation: IPropertyLocation;
  media: IPropertyImageOrVideo[]
};

export type ICommercialPropertyForSaleCreation = {
    managerId: number;
    numberOfRooms: number;
    price: number;
    sizeNumber: number;
    hasElectricity: boolean;
    hasWater: boolean;
    isNegotiable: boolean;
    status: IStatus;
    yearBuilt: number;
    storeys: number;
    currency: ICurrency;
    type: string;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    propertyLocation: IPropertyLocationCreation;
    media: IPropertyImageOrVideoCreationOrUpdate[]
  };

export type ICommercialPropertyForSaleWithManager = {
    id: number;
    managerId: number;
    uniqueId: number;
    numberOfRooms: number;
    price: number;
    sizeNumber: number;
    hasElectricity: boolean;
    isFavorite: boolean;
    hasWater: boolean;
    isNegotiable: boolean;
    status: "on the market"|"off the market";
    yearBuilt: number;
    storeys: number;
    type: string;
    currency: ICurrency;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    postedTime: string;
    insights:IPropertyInsights,
    propertyLocation: IPropertyLocation;
    media: IPropertyImageOrVideo[];
    manager: IManagerAccount
  };

export type ICommercialPropertyForSaleUpdate = {
    id: number;
    managerId: number;
    uniqueId: number;
    numberOfRooms: number;
    price: number;
    sizeNumber: number;
    hasElectricity: boolean;
    hasWater: boolean;
    isNegotiable: boolean;
    status: IStatus;
    yearBuilt: number;
    storeys: number;
    type: string;
    currency: ICurrency;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
  };
