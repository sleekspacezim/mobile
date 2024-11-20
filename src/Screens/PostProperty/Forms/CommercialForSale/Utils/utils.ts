import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import { ICommercialPropertyForSaleCreation } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import {
  convertImagePickerAssetsListToUploadableImages,
  removeBlankSpacesFromWordsInAnArray,
} from "@/src/Utils/Funcs";
import {
  ICommercialForSaleGeneralInfo,
  IGeneralInfoFormError,
  ICommercialForSaleFeaturesInfo,
  ICommercialForSaleOtherInfo,
} from "../Types/FormTypes";

export const processGeneralPropertyDetails = (
  generalPropertyDetails: ICommercialForSaleGeneralInfo,
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
  propertyGeneralDetails: ICommercialForSaleGeneralInfo,
  propertyFeaturesInfo: ICommercialForSaleFeaturesInfo,
  otherPropertyInfo: ICommercialForSaleOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => ICommercialPropertyForSaleCreation = ({} = (
  propertyGeneralDetails: ICommercialForSaleGeneralInfo,
  propertyFeaturesInfo: ICommercialForSaleFeaturesInfo,
  otherPropertyInfo: ICommercialForSaleOtherInfo,
  manager: IManagerAccount,
  location: ISearchLocation
) => {
  return {
    managerId: manager.id,
    status: "on the Market" as IStatus,
    isNegotiable: propertyGeneralDetails.isNegotiable,
    sizeDimensions: propertyGeneralDetails.sizeDimensions,
    sizeNumber: +propertyGeneralDetails.sizeNumber,
    storeys: +propertyGeneralDetails.storeys,
    price: +propertyGeneralDetails.price,
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
    type:
      propertyGeneralDetails.type === "Other"
        ? propertyGeneralDetails.otherType.trim()
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

export const generalPropertyInfoIntialState: ICommercialForSaleGeneralInfo = {
  price: "0",
  sizeNumber: "",
  numberOfRooms: "0",
  type: "Shop",
  sizeDimensions: "Square meters",
  yearBuilt: "",
  storeys: "1",
  currency: "US$",
  isNegotiable: false,
  otherType: "",
};

export const propertyFeaturesInfoInitialState: ICommercialForSaleFeaturesInfo =
  {
    hasElectricity: false,
    hasWater: false,
    otherInteriorFeatures: "",
    otherExteriorFeatures: "",
  };

export const otherPropertyInfoInitialState: ICommercialForSaleOtherInfo = {
  marketingStatement: "",
  images: [],
};
