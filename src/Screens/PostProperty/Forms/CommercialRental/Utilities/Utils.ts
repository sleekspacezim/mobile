import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import {
  convertImagePickerAssetsListToUploadableImages,
  removeBlankSpacesFromWordsInAnArray,
} from "@/src/Utils/Funcs";
import {
  ICommercialRentalFeaturesInfo,
  ICommercialRentalGeneralInfo,
  ICommercialRentalOtherInfo,
  IGeneralInfoFormError,
} from "../Types/FormTypes";
import { ICommercialRentalPropertyCreation } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: ICommercialRentalGeneralInfo,
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
  } else if (+generalPropertyDetails.numberOfRooms < 0) {
    setGeneralInfoFormError("numberOfRooms");
  } else if (
    generalPropertyDetails.type === "Other" &&
    !generalPropertyDetails.otherType
  ) {
    setGeneralInfoFormError("type");
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

export const createPropertyToBeSubmitted: (
  propertyGeneralDetails: ICommercialRentalGeneralInfo,
  propertyFeaturesInfo: ICommercialRentalFeaturesInfo,
  otherPropertyInfo: ICommercialRentalOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => ICommercialRentalPropertyCreation = ({} = (
  propertyGeneralDetails: ICommercialRentalGeneralInfo,
  propertyFeaturesInfo: ICommercialRentalFeaturesInfo,
  otherPropertyInfo: ICommercialRentalOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => {
  return {
    managerId: manager.id,
    status: "on the Market" as IStatus,
    isFullSpace: propertyGeneralDetails.isFullSpace,
    sizeDimensions: propertyGeneralDetails.sizeDimensions,
    sizeNumber: +propertyGeneralDetails.sizeNumber,
    storeys: +propertyGeneralDetails.storeys,
    rentAmount: +propertyGeneralDetails.rentAmount,
    currency: propertyGeneralDetails.currency,
    numberOfRooms: +propertyGeneralDetails.numberOfRooms,
    otherInteriorFeatures: propertyFeaturesInfo.otherInteriorFeatures
      ? removeBlankSpacesFromWordsInAnArray(
          propertyFeaturesInfo.otherInteriorFeatures.split(",")
        )
      : [],
    otherExteriorFeatures: propertyFeaturesInfo.otherExteriorFeatures
      ? removeBlankSpacesFromWordsInAnArray(
          propertyFeaturesInfo.otherExteriorFeatures.split(",")
        )
      : [],
    hasElectricity: propertyFeaturesInfo.hasElectricity,
    hasWater: propertyFeaturesInfo.hasWater,
    media: convertImagePickerAssetsListToUploadableImages(
      otherPropertyInfo.images
    ),
    marketingStatement: otherPropertyInfo.marketingStatement,
    tenantRequirements: otherPropertyInfo.tenantRequirements
      ? removeBlankSpacesFromWordsInAnArray(
          otherPropertyInfo.tenantRequirements.split(",")
        )
      : [],
    type:
      propertyGeneralDetails.type === "Other"
        ? propertyGeneralDetails.otherType
        : propertyGeneralDetails.type,
    yearBuilt: +propertyGeneralDetails.yearBuilt,
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

export const generalPropertyInfoIntialState: ICommercialRentalGeneralInfo = {
  rentAmount: "0",
  sizeNumber: "",
  numberOfRooms: "0",
  type: "Shop",
  sizeDimensions: "Square meters",
  yearBuilt: "",
  storeys: "1",
  currency: "US$",
  isFullSpace: false,
  otherType: "",
};

export const propertyFeaturesInfoInitialState: ICommercialRentalFeaturesInfo = {
  hasElectricity: false,
  hasWater: false,
  otherInteriorFeatures: "",
  otherExteriorFeatures: "",
};

export const otherPropertyInfoInitialState: ICommercialRentalOtherInfo = {
  tenantRequirements: "",
  marketingStatement: "",
  images: [],
};
