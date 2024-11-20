export type IPropertyLocation = {
  id: number;
  propertyId: number;
  displayName: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  surburb: string;
  city: string;
  county: string;
  province: string;
  country: string;
  countryCode: string;
  propertyType: string;
};

export type IPropertyLocationCreation = {
    displayName: string;
    boundingbox: string[];
    lat: string;
    lon: string;
    surburb: string;
    city: string;
    county: string;
    province: string;
    country: string;
    countryCode: string;
  };