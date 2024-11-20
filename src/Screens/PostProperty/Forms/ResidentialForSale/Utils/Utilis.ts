import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import {
  IExteriorInfoFormError,
  IGeneralInfoFormError,
  IInteriorInfoFormError,
  IResidentialForSaleExteriorInfo,
  IResidentialForSaleGeneralInfo,
  IResidentialForSaleInteriorInfo,
  IResidentialForSaleOtherInfo,
} from "../Types/FormTypes";
import {
  convertImagePickerAssetsListToUploadableImages,
  removeBlankSpacesFromWordsInAnArray,
} from "@/src/Utils/Funcs";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IResidentialRentalPropertyCreation } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IResidentialPropertyForSaleCreation } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: IResidentialForSaleGeneralInfo,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setGeneralInfoFormError: React.Dispatch<
    React.SetStateAction<IGeneralInfoFormError>
  >,
  location: ISearchLocation
) => {
  if (+generalPropertyDetails.price < 10) {
    setGeneralInfoFormError("price");
  } else if (+generalPropertyDetails.sizeNumber < 0) {
    setGeneralInfoFormError("propertySize");
  } else if (+generalPropertyDetails.numberOfRooms < 1) {
    setGeneralInfoFormError("numberOfRooms");
  } else if (!location.lat) {
    setGeneralInfoFormError("location");
  } else if (+generalPropertyDetails.storeys < 1) {
    setGeneralInfoFormError("storeys");
  } else if (
    generalPropertyDetails.yearBuilt &&
    (+generalPropertyDetails.yearBuilt > new Date().getFullYear() ||
      +generalPropertyDetails.yearBuilt < 1920)
  ) {
    setGeneralInfoFormError("yearBuilt");
  } else setPageNumber((prev) => prev + 1);
};

export const processInteriorPropertyDetails = (
  interiorPropertyDetails: IResidentialForSaleInteriorInfo,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  generalPropertyDetails: IResidentialForSaleGeneralInfo,
  setInteriorInfoFormError: React.Dispatch<
    React.SetStateAction<IInteriorInfoFormError>
  >
) => {
  if (
    +interiorPropertyDetails.bedrooms < 1 ||
    +interiorPropertyDetails.bedrooms >= +generalPropertyDetails.numberOfRooms
  ) {
    setInteriorInfoFormError("bedrooms");
  } else if (
    +interiorPropertyDetails.bathrooms < 1 ||
    +interiorPropertyDetails.bathrooms >= +generalPropertyDetails.numberOfRooms
  ) {
    setInteriorInfoFormError("bathrooms");
  } else setPageNumber((prev) => prev + 1);
};

export const processExteriorPropertyDetails = (
  exteriorPropertyDetails: IResidentialForSaleExteriorInfo,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setExteriorInfoFormError: React.Dispatch<
    React.SetStateAction<IExteriorInfoFormError>
  >
) => {
  if (
    +exteriorPropertyDetails.numberOfGarages < 0 ||
    !exteriorPropertyDetails.numberOfGarages ||
    +exteriorPropertyDetails.numberOfGarages > 7
  ) {
    setExteriorInfoFormError("numberOfGarages");
  } else setPageNumber((prev) => prev + 1);
};

export const createPropertyToBeSubmitted: (
  propertyGeneralDetails: IResidentialForSaleGeneralInfo,
  propertyInteriorInfo: IResidentialForSaleInteriorInfo,
  propertyExteriorInfo: IResidentialForSaleExteriorInfo,
  otherPropertyInfo: IResidentialForSaleOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => IResidentialPropertyForSaleCreation = ({} = (
  propertyGeneralDetails: IResidentialForSaleGeneralInfo,
  propertyInteriorInfo: IResidentialForSaleInteriorInfo,
  propertyExteriorInfo: IResidentialForSaleExteriorInfo,
  otherPropertyInfo: IResidentialForSaleOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => {
  return {
    managerId: manager.id,
    status: "on the market" as IStatus,
    sizeDimensions: propertyGeneralDetails.sizeDimensions,
    sizeNumber: +propertyGeneralDetails.sizeNumber,
    storeys: +propertyGeneralDetails.storeys,
    price: +propertyGeneralDetails.price,
    currency: propertyGeneralDetails.currency,
    numberOfRooms: +propertyGeneralDetails.numberOfRooms,
    isNegotiable: propertyGeneralDetails.isNegotiable,
    bedrooms: +propertyInteriorInfo.bedrooms,
    bathrooms: +propertyInteriorInfo.bathrooms,
    isTiled: propertyInteriorInfo.isTiled,
    isPaved: propertyExteriorInfo.isPaved,
    isPlustered: propertyInteriorInfo.isPlustered,
    isPainted: propertyInteriorInfo.isPainted,
    hasBoreHole: propertyExteriorInfo.hasBoreHole,
    hasSwimmingPool: propertyExteriorInfo.hasSwimmingPool,
    otherInteriorFeatures: propertyInteriorInfo.otherInteriorFeatures
      ? removeBlankSpacesFromWordsInAnArray(
          propertyInteriorInfo.otherInteriorFeatures.split(",")
        )
      : [],
    otherExteriorFeatures: propertyExteriorInfo.otherExteriorFeatures
      ? removeBlankSpacesFromWordsInAnArray(
          propertyExteriorInfo.otherExteriorFeatures.split(",")
        )
      : [],
    hasCeiling: propertyInteriorInfo.hasCeiling,
    hasElectricity: propertyInteriorInfo.hasElectricity,
    hasWater: propertyInteriorInfo.hasWater,
    media: convertImagePickerAssetsListToUploadableImages(
      otherPropertyInfo.images
    ),
    typeOfExteriorSecurity: propertyExteriorInfo.typeOfExteriorSecurity,
    marketingStatement: otherPropertyInfo.marketingStatement,
    type: propertyGeneralDetails.type,
    yearBuilt: +propertyGeneralDetails.yearBuilt,
    numberOfGarages: +propertyExteriorInfo.numberOfGarages,
    propertyLocation: {
      lat: location.lat,
      lon: location.lon,
      displayName: location.display_name,
      boundingbox: location.boundingbox,
      city: location.address.city,
      country: location.address.country,
      countryCode: location.address.country_code,
      county: location.address.county,
      surburb: location.address.surburb,
      province: location.address.state,
    },
  };
});

export const generalPropertyInfoIntialState: IResidentialForSaleGeneralInfo = {
  price: "0",
  sizeNumber: "",
  numberOfRooms: "1",
  type: "Single family home",
  sizeDimensions: "Square meters",
  yearBuilt: "",
  storeys: "1",
  currency: "US$",
  isNegotiable: false,
};

export const interiorPropertyInfoInitialState: IResidentialForSaleInteriorInfo =
  {
    bathrooms: "1",
    bedrooms: "1",
    isTiled: false,
    isPlustered: false,
    isPainted: false,
    hasCeiling: false,
    hasElectricity: false,
    hasWater: false,
    otherInteriorFeatures: "",
  };

export const exteriorPropertyInfoInitialState: IResidentialForSaleExteriorInfo =
  {
    hasBoreHole: false,
    hasSwimmingPool: false,
    typeOfExteriorSecurity: "jiraWall",
    isPaved: false,
    numberOfGarages: "0",
    otherExteriorFeatures: "",
  };

export const otherPropertyInfoInitialState: IResidentialForSaleOtherInfo = {
  marketingStatement: "",
  images: [],
};
