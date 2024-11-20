import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import {
  removeBlankSpacesFromWordsInAnArray,
  convertImagePickerAssetsListToUploadableImages,
} from "@/src/Utils/Funcs";
import {
  IGeneralInfoFormError,
  IStandFeaturesInfo,
  IStandGeneralInfo,
  IStandOtherInfo,
} from "../Types/FormTypes";
import { IStandPropertyCreation } from "@/src/GlobalTypes/Property/Stand/StandTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: IStandGeneralInfo,
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
  } else if (
    generalPropertyDetails.level === "Other" &&
    !generalPropertyDetails.otherLevel
  ) {
    setGeneralInfoFormError("level");
  } else if (!location.lat) {
    setGeneralInfoFormError("location");
  } else setPageNumber((prev) => prev + 1);
};

export const createPropertyToBeSubmitted: (
  propertyGeneralDetails: IStandGeneralInfo,
  propertyFeaturesInfo: IStandFeaturesInfo,
  otherPropertyInfo: IStandOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => IStandPropertyCreation = ({} = (
  propertyGeneralDetails: IStandGeneralInfo,
  propertyFeaturesInfo: IStandFeaturesInfo,
  otherPropertyInfo: IStandOtherInfo,
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
    level:
      propertyGeneralDetails.level === "Other"
        ? propertyGeneralDetails.otherLevel.trim()
        : propertyGeneralDetails.level,
    otherDetails: propertyFeaturesInfo.otherDetails
      ? removeBlankSpacesFromWordsInAnArray(
          propertyFeaturesInfo.otherDetails.split(",")
        )
      : [],
    areaHasElectricity: propertyFeaturesInfo.areaHasElectricity,
    isServiced: propertyFeaturesInfo.isServiced,
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

export const generalPropertyInfoIntialState: IStandGeneralInfo = {
  price: "0",
  sizeNumber: "",
  level: "ground",
  type: "Residential",
  sizeDimensions: "Square meters",
  currency: "US$",
  isNegotiable: false,
  otherType: "",
  otherLevel: "",
};

export const propertyFeaturesInfoInitialState: IStandFeaturesInfo = {
  areaHasElectricity: false,
  isServiced: false,
  otherDetails: "",
};

export const otherPropertyInfoInitialState: IStandOtherInfo = {
  marketingStatement: "",
  images: [],
};
