import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import {
  IExteriorInfoFormError,
  IGeneralInfoFormError,
  IInteriorInfoFormError,
  IResidentialRentalExteriorInfo,
  IResidentialRentalGeneralInfo,
  IResidentialRentalInteriorInfo,
  IResidentialRentalOtherInfo,
} from "../Types/FormTypes";
import {
  convertImagePickerAssetsListToUploadableImages,
  removeBlankSpacesFromWordsInAnArray,
} from "@/src/Utils/Funcs";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IResidentialRentalPropertyCreation } from "@/src/GlobalTypes/Property/Residential/RentalTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: IResidentialRentalGeneralInfo,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setGeneralInfoFormError: React.Dispatch<
    React.SetStateAction<IGeneralInfoFormError>
  >,
  location: ISearchLocation
) => {
  if (+generalPropertyDetails.rentAmount < 10) {
    setGeneralInfoFormError("rentAmount");
  } else if (+generalPropertyDetails.sizeNumber < 0) {
    setGeneralInfoFormError("propertySize");
  } else if (+generalPropertyDetails.totalNumberOfRooms < 1) {
    setGeneralInfoFormError("totalNumberOfpropertyRooms");
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
  interiorPropertyDetails: IResidentialRentalInteriorInfo,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  generalPropertyDetails: IResidentialRentalGeneralInfo,
  setInteriorInfoFormError: React.Dispatch<
    React.SetStateAction<IInteriorInfoFormError>
  >
) => {
  if (
    +interiorPropertyDetails.bedrooms < 1 ||
    +interiorPropertyDetails.bedrooms >=
      +generalPropertyDetails.totalNumberOfRooms
  ) {
    setInteriorInfoFormError("bedrooms");
  } else if (
    +interiorPropertyDetails.bathrooms < 1 ||
    +interiorPropertyDetails.bathrooms >=
      +generalPropertyDetails.totalNumberOfRooms
  ) {
    setInteriorInfoFormError("bathrooms");
  } else setPageNumber((prev) => prev + 1);
};

export const processExteriorPropertyDetails = (
  exteriorPropertyDetails: IResidentialRentalExteriorInfo,
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
  propertyGeneralDetails: IResidentialRentalGeneralInfo,
  propertyInteriorInfo: IResidentialRentalInteriorInfo,
  propertyExteriorInfo: IResidentialRentalExteriorInfo,
  otherPropertyInfo: IResidentialRentalOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => IResidentialRentalPropertyCreation = ({} = (
  propertyGeneralDetails: IResidentialRentalGeneralInfo,
  propertyInteriorInfo: IResidentialRentalInteriorInfo,
  propertyExteriorInfo: IResidentialRentalExteriorInfo,
  otherPropertyInfo: IResidentialRentalOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => {
  return {
    managerId: manager.id,
    status: "on the Market",
    sizeDimensions: propertyGeneralDetails.sizeDimensions,
    sizeNumber: +propertyGeneralDetails.sizeNumber,
    storeys: +propertyGeneralDetails.storeys,
    rentAmount: +propertyGeneralDetails.rentAmount,
    currency: propertyGeneralDetails.currency,
    totalNumberOfRooms: +propertyGeneralDetails.totalNumberOfRooms,
    numberOfRoomsToLet: +propertyGeneralDetails.numberOfRoomsToLet,
    bedrooms: +propertyInteriorInfo.bedrooms,
    bathrooms: +propertyInteriorInfo.bathrooms,
    isFullHouse:
      propertyGeneralDetails.numberOfRoomsToLet === "fullHouse" ? true : false,
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
    tenantRequirements: otherPropertyInfo.tenantRequirements
      ? removeBlankSpacesFromWordsInAnArray(
          otherPropertyInfo.tenantRequirements.split(",")
        )
      : [],
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

export const generalPropertyInfoIntialState: IResidentialRentalGeneralInfo = {
  rentAmount: "0",
  sizeNumber: "",
  numberOfRoomsToLet: "1",
  totalNumberOfRooms: "1",
  type: "Single family home",
  sizeDimensions: "Square meters",
  yearBuilt: "",
  storeys: "1",
  currency: "US$",
};

export const interiorPropertyInfoInitialState: IResidentialRentalInteriorInfo =
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

export const exteriorPropertyInfoInitialState: IResidentialRentalExteriorInfo =
  {
    hasBoreHole: false,
    hasSwimmingPool: false,
    typeOfExteriorSecurity: "jiraWall",
    isPaved: false,
    numberOfGarages: "0",
    otherExteriorFeatures: "",
  };

export const otherPropertyInfoInitialState: IResidentialRentalOtherInfo = {
  tenantRequirements: "",
  marketingStatement: "",
  images: [],
};
