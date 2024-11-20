import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import { ILandPropertyCreation } from "@/src/GlobalTypes/Property/Land/LandTypes";
import {
  removeBlankSpacesFromWordsInAnArray,
  convertImagePickerAssetsListToUploadableImages,
} from "@/src/Utils/Funcs";
import {
  IGeneralInfoFormError,
  ILandGeneralInfo,
  ILandFeaturesInfo,
  ILandOtherInfo,
} from "../Types/FormTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: ILandGeneralInfo,
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
  } else if (
    generalPropertyDetails.type === "Other" &&
    !generalPropertyDetails.otherType
  ) {
    setGeneralInfoFormError("type");
  } else if (!location.lat) {
    setGeneralInfoFormError("location");
  } else setPageNumber((prev) => prev + 1);
};

export const createPropertyToBeSubmitted: (
  propertyGeneralDetails: ILandGeneralInfo,
  propertyFeaturesInfo: ILandFeaturesInfo,
  otherPropertyInfo: ILandOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => ILandPropertyCreation = ({} = (
  propertyGeneralDetails: ILandGeneralInfo,
  propertyFeaturesInfo: ILandFeaturesInfo,
  otherPropertyInfo: ILandOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => {
  return {
    managerId: manager.id,
    status: "on the Market" as IStatus,
    isNegotiable: propertyGeneralDetails.isNegotiable,
    sizeDimensions: propertyGeneralDetails.sizeDimensions,
    sizeNumber: +propertyGeneralDetails.sizeNumber,
    price: +propertyGeneralDetails.price,
    currency: propertyGeneralDetails.currency,
    otherDetails: propertyFeaturesInfo.otherDetails
      ? removeBlankSpacesFromWordsInAnArray(
          propertyFeaturesInfo.otherDetails.split(",")
        )
      : [],
    areaHasElectricity: propertyFeaturesInfo.areaHasElectricity,
    hasWater: propertyFeaturesInfo.hasWater,
    media: convertImagePickerAssetsListToUploadableImages(
      otherPropertyInfo.images
    ),
    marketingStatement: otherPropertyInfo.marketingStatement,
    type:
      propertyGeneralDetails.type === "Other"
        ? propertyGeneralDetails.otherType.trim()
        : propertyGeneralDetails.type,
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

export const generalPropertyInfoIntialState: ILandGeneralInfo = {
  price: "0",
  sizeNumber: "",
  type: "Residential",
  sizeDimensions: "Square meters",
  currency: "US$",
  isNegotiable: false,
  otherType: "",
};

export const propertyFeaturesInfoInitialState: ILandFeaturesInfo = {
  areaHasElectricity: false,
  hasWater: false,
  otherDetails: "",
};

export const otherPropertyInfoInitialState: ILandOtherInfo = {
  marketingStatement: "",
  images: [],
};
