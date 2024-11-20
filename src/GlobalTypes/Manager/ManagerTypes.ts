import { ICountryCodes } from "../Types";

export type IManagerProfilePictureUpdateAndCreation = {
  id?: number;
  managerId?: number;
  image: string;
  name: string;
  contentType: string | undefined;
  size: number;
  fileType: string | undefined;
};

export type IManagerProfilePicture = {
  id: number;
  managerId: number;
  uri: string;
  name: string;
  contentType: string | undefined;
  size: number;
  fileType: string | undefined;
};

export type IManagerAccountCreation = {
  userId: number;
  name: string;
  email: string;
  contacts: IManagerContactNumber[];
  profilePicture: IManagerProfilePictureUpdateAndCreation;
};

export type IManagerAccount = {
  id: number;
  userId: number;
  name: string;
  email: string;
  contacts: IManagerContactNumber[];
  profilePicture: IManagerProfilePicture;
};

export type IManagerContactNumber = {
  id?: number;
  managerId?: number;
  number: string;
  type: "whatsapp" | "phone";
  countryCode: string;
  countryAbbrv: ICountryCodes;
};

export type IUpdateManagerAccountEmailAndName = {
  email: string;
  name: string;
};
