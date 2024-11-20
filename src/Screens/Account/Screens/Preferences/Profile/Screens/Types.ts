import { ICountryCodes } from "@/src/GlobalTypes/Types";

export type IPhoneNumberDetails = {
  number: string|undefined;
  countryCode: string|undefined;
  countryAbbrv:ICountryCodes;
};
