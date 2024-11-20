import { IManagerAccount } from "../../Manager/ManagerTypes";
import { IPropertyInsights } from "../Insights/InsightsTypes";
import { IPropertyLocation, IPropertyLocationCreation } from "../Location/LocationTypes";
import { IPropertyImageOrVideo, IPropertyImageOrVideoCreationOrUpdate } from "../Media/ImageOrVideoTypes";

export type ICommercialRentalPropertyCreation = {
    managerId: number;
    numberOfRooms: number;
    rentAmount: number;
    sizeNumber: number;
    yearBuilt: number;
    storeys: number;
    hasElectricity: boolean;
    hasWater: boolean;
    isFullSpace:boolean;
    status: IStatus;
    currency: ICurrency;
    type: string;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    tenantRequirements: string[];
    propertyLocation: IPropertyLocationCreation;
    media: IPropertyImageOrVideoCreationOrUpdate[];
}

export type ICommercialRentalProperty = {
    id: number;
    managerId: number;
    uniqueId: number;
    numberOfRooms: number;
    rentAmount: number;
    sizeNumber: number;
    yearBuilt: number;
    storeys: number;
    hasElectricity: boolean;
    isFavorite: boolean;
    hasWater: boolean;
    isFullSpace:boolean;
    status: IStatus;
    currency: ICurrency;
    type: string;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    tenantRequirements: string[];
    postedTime: string;
    insights:IPropertyInsights,
    propertyLocation: IPropertyLocation;
    media: IPropertyImageOrVideo[];
}

export type ICommercialRentalPropertyWithManager = {
    id: number;
    managerId: number;
    uniqueId: number;
    numberOfRooms: number;
    rentAmount: number;
    sizeNumber: number;
    yearBuilt: number;
    storeys: number;
    hasElectricity: boolean;
    isFavorite: boolean;
    hasWater: boolean;
    isFullSpace:boolean;
    status: IStatus;
    currency: ICurrency;
    type: string;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    tenantRequirements: string[];
    postedTime: string;
    insights:IPropertyInsights,
    propertyLocation: IPropertyLocation;
    media: IPropertyImageOrVideo[];
    manager: IManagerAccount
}
export type ICommercialRentalPropertyUpdate = {
    id: number;
    managerId: number;
    uniqueId: number;
    numberOfRooms: number;
    rentAmount: number;
    sizeNumber: number;
    yearBuilt: number;
    storeys: number;
    hasElectricity: boolean;
    hasWater: boolean;
    isFullSpace:boolean;
    status: IStatus;
    currency: ICurrency;
    type: string;
    sizeDimensions: string;
    marketingStatement: string;
    otherInteriorFeatures: string[];
    otherExteriorFeatures: string[];
    tenantRequirements: string[];
}