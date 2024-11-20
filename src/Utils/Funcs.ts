import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

import {
  IUserContactNumber,
  IUserLocation,
} from "../GlobalTypes/User/UserTypes";
import { IManagerContactNumber } from "../GlobalTypes/Manager/ManagerTypes";
import { ISearchLocation } from "../GlobalTypes/LocationIQ/LocationIQTypes";
import { IPropertyImageOrVideoCreationOrUpdate } from "../GlobalTypes/Property/Media/ImageOrVideoTypes";

export const saveSecureValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureValue = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

export const passwordValidator: (
  setIsPasswordValidationError: React.Dispatch<React.SetStateAction<boolean>>,
  passwordValue: string | undefined
) => void = (setIsPasswordValidationError, passwordValue) => {
  if (passwordValue) {
    const regexPasswordValidator = new RegExp(
      "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (regexPasswordValidator.test(passwordValue)) {
      setIsPasswordValidationError(false);
    } else {
      setIsPasswordValidationError(true);
    }
  }
};

export const generateRandomSixDigitNumber = () => {
  let result = 100000 + Math.floor(Math.random() * 900000);
  return result.toString();
};

export const emailValidator: (
  setIsEmailValidationError: React.Dispatch<React.SetStateAction<boolean>>,
  emailValue: string | undefined
) => void = (setIsEmailValidationError, emailValue) => {
  if (emailValue) {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailValue
      )
    ) {
      setIsEmailValidationError(true);
    } else {
      setIsEmailValidationError(false);
    }
  }
};

export const passwordGuideLines = [
  "longer than 8 characters",
  "have atleast 1 special character",
  "have atleast 1 number",
  "have atleast 1 capital letter",
];

export const shortenString = (text: string, maxNumberOfWords: number) => {
  const maxWords = maxNumberOfWords + 1;
  if (text.length > maxNumberOfWords)
    return `${text.substring(0, maxWords)}...`;
  else return text;
};

export const cleanTextSnippets = (snippet: string) => {
  if (snippet) return snippet.replace(/(https?|ftp):\/\/[.[a-zA-Z0-9/-]+/, " ");
  else return "";
};
export const numberToString = (value: number) => {
  if (typeof value === "number") return value.toString();
  else return value;
};
export const stringToNumber = (value: string) => {
  if (typeof value === "string") return Number(value);
  else return value;
};
export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const processLocalQueryParam = (
  queryParam: string | string[] | undefined
) => {
  return queryParam ? (Array.isArray(queryParam) ? "" : queryParam) : "";
};

export const getContactNumber = (
  type: "whatsapp" | "phone",
  contactNumbers: IUserContactNumber[]
) => {
  if (contactNumbers && contactNumbers.length > 0) {
    const contact = contactNumbers.filter((number) => number.type === type);
    return "+" + contact[0].countryCode + contact[0].number;
  } else return "";
};

export const getUserContactNumberCountryCode = (
  contacts: IUserContactNumber[],
  type: "phone" | "whatsapp"
) => {
  if (contacts && contacts.length > 0) {
    const contact = contacts.filter((number) => number.type === type);
    return contact[0].countryCode;
  } else return "263";
};

export const getUserContactNumberCountryAbbrv = (
  contacts: IUserContactNumber[],
  type: "phone" | "whatsapp"
) => {
  if (contacts && contacts.length > 0) {
    const contact = contacts.filter((number) => number.type === type);
    return contact[0].countryAbbrv;
  } else return "ZW";
};

export const getManagerContactNumber = (
  contacts: IManagerContactNumber[],
  type: "phone" | "whatsapp"
) => {
  if (contacts && contacts.length > 0) {
    const contact = contacts.filter((number) => number.type === type);
    return "+" + contact[0].countryCode + contact[0].number;
  } else return "";
};

export const getManagerContactNumberCountryCode = (
  contacts: IManagerContactNumber[],
  type: "phone" | "whatsapp"
) => {
  if (contacts && contacts.length > 0) {
    const contact = contacts.filter((number) => number.type === type);
    return contact[0].countryCode;
  } else return "";
};

export const getManagerContactNumberCountryAbbrv = (
  contacts: IManagerContactNumber[],
  type: "phone" | "whatsapp"
) => {
  if (contacts && contacts.length > 0) {
    const contact = contacts.filter((number) => number.type === type);
    return contact[0].countryAbbrv;
  } else return "ZW";
};

export const getLocationFromUserData = (location: IUserLocation | null) => {
  let result = "";
  if (location) {
    if (location.displayName) return location.displayName;
    else if (location.city)
      return result + location.city + ", " + location.country;
    else return shortenString(location.displayName, 20);
  } else return "";
};

export const getLocation = (
  location: ISearchLocation,
  doNotShorten?: boolean
) => {
  let result = "";
  if (location) {
    if (location.display_place && location.address.city)
      return result + location.display_place + ", " + location.address.city;
    else if (!location.display_place && location.address.city)
      return doNotShorten
        ? result + location.address.city + ", " + location.address.country
        : shortenString(
            result + location.address.city + ", " + location.address.country,
            20
          );
    else if (
      location.display_place &&
      !location.address.city &&
      location.address.state
    )
      return doNotShorten
        ? result + location.display_place + ", " + location.address.state
        : shortenString(
            result + location.display_place + ", " + location.address.state,
            20
          );
    else if (
      location.display_place &&
      !location.address.city &&
      location.address.county &&
      !location.address.state
    )
      return doNotShorten
        ? result + location.display_place + ", " + location.address.county
        : shortenString(
            result + location.display_place + ", " + location.address.county,
            20
          );
    else
      return doNotShorten
        ? location.display_name
        : shortenString(location.display_name, 20);
  } else return "";
};

export const processLocationDisplayName = (locationDisplayName: string) => {
  const name = locationDisplayName.split(", ");
  if (name[1]) {
    if (name[0] === name[1]) {
      return name[0];
    } else {
      return name[0] + ", " + name[1];
    }
  } else return name[0];
};

export const convertLocationToSearchableFormat: (
  location: IUserLocation
) => ISearchLocation = (location: IUserLocation) => {
  return {
    display_address: "",
    display_name: location.displayName,
    display_place: "",
    lat: location.lat,
    licence: "",
    lon: location.lon,
    osm_id: "",
    osm_type: "",
    place_id: "",
    class: "",
    boundingbox: location.boundingbox ? location.boundingbox : [],
    type: "",
    address: {
      city: location.city,
      country: location.country,
      country_code: location.countryCode,
      county: location.county,
      state: location.province,
      surburb: location.surburb,
    },
  };
};

export const handleLayout = (
  event: {
    nativeEvent: { layout: { height: any } };
  },
  setViewHeight: React.Dispatch<React.SetStateAction<number>>
) => {
  const { height } = event.nativeEvent.layout;
  setViewHeight(height);
};

export const convertImagePickerAssetsListToUploadableImages: (
  images: ImagePicker.ImagePickerAsset[]
) => IPropertyImageOrVideoCreationOrUpdate[] = (
  images: ImagePicker.ImagePickerAsset[]
) => {
  const propertyImages: IPropertyImageOrVideoCreationOrUpdate[] = [];
  for (let i = 0; i < images.length; i++) {
    const propertyImage: IPropertyImageOrVideoCreationOrUpdate = {
      name: generateRandomSixDigitNumber() + images[0].fileName,
      size: images[i].fileSize ? (images[i].fileSize as number) : 0,
      fileType: images[i].mimeType ? images[i].mimeType : "",
      contentType: "image",
      file: images[i].base64 as string,
    };
    propertyImages.push(propertyImage);
  }
  return propertyImages;
};

export const removeBlankSpacesFromWordsInAnArray: (
  array: string[]
) => string[] = (array: string[]) => {
  const resultArray: string[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = array[i].trim();
    resultArray.push(result);
  }
  return resultArray;
};
