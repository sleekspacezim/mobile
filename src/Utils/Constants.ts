import { IMapRegion } from "../Components/Map/Types/MapTypes";
import { ISearchLocation } from "../GlobalTypes/LocationIQ/LocationIQTypes";
import { IPropertyType } from "../GlobalTypes/Property/Common";
import { IUser } from "../GlobalTypes/User/UserTypes";

export const expoSecureValueKeyNames = {
  accessToken: "accessToken",
  theme: "theme",
};

//export const backEndUrl = "https://backend-1fpy.onrender.com";
export const backEndUrl = "http://192.168.56.195:8080";

export const managerAccountUpdateMsg =
  "Remember, if you update your information, all your properties will also be updated, so make sure it is accurate.";

export const imageBlurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const tabsMenu = {
  home: "Home",
  account: "Account",
  favorites: "Favorites",
  post: "Postproperty",
  search: "Search",
  chats: "Chats",
};

export const propertyListType: IPropertyType[] = [
  "Residential Rentals",
  "Residential ForSale",
  "Commercial Rentals",
  "Commercial ForSale",
  "Stands",
  "Land",
];
export enum PropertyTypesEnum {
  ResidentialRentals = "Residential Rentals",
  ResidentialForSale = "Residential ForSale",
  CommercialRentals = "Commercial Rentals",
  CommercialForSale = "Commercial ForSale",
  Stands = "Stands",
  Land = "Land",
}
export const SCREEN_BREAK_POINT = 700;
export const BUTTON_MAX_WIDTH = 400;
export const BUTTON_SIZE_SCREEN_BREAK_POINT = 500;
export const MAX_INPUT_WIDTH = 600;

export const noManagerError = "this property management account does not exist";

export const maxPropertyImages = 20;

export const harareMapRegion: IMapRegion = {
  latitude: -17.824858,
  latitudeDelta: 0.04,
  longitude: 31.053028,
  longitudeDelta: 0.04,
};

export const zimbabweMapRegion: IMapRegion = {
  latitude: -19.0169,
  latitudeDelta: 0.1,
  longitude: 29.1528,
  longitudeDelta: 0.1,
};

export const activeOpacityOfTouchableOpacity = 0.7

export const searchPropertyLocationTutorialText =
  "long press and drag the map marker to your property's location, then press done when you are finished";

export const searchUserLocationTutorialText =
  "long press and drag the map marker to your home location, then press done when you are finished";

export const emptyLocation: ISearchLocation = {
  display_address: "",
  display_name: "",
  display_place: "",
  address: {
    city: "",
    country: "",
    country_code: "",
    county: "",
    state: "",
    surburb: "",
  },
  type: "",
  boundingbox: [],
  lat: "",
  licence: "",
  lon: "",
  osm_id: "",
  osm_type: "",
  class: "",
  place_id: "",
};

export const emptyUser: IUser = {
  email: "",
  givenName: "",
  familyName: "",
  contactNumbers: [],
  location: null,
  id: 0,
  accessToken: "",
  role:"user",
  profilePicture: {
    name: "",
    id: 0,
    userId: 0,
    contentType: "",
    size: 0,
    fileType: "",
    uri: "",
  },
  favoriteCommercialForSaleProperties: [],
  favoriteCommercialRentalProperties: [],
  favoriteLandProperties: [],
  favoriteResidentialForSaleProperties: [],
  favoriteResidentialRentalProperties: [],
  favoriteStands: [],
};

export const firebaseBucketName = "ImagesAndVideos";
//const searchUrl = `https://api.locationiq.com/v1/search.php?key=pk.5bd5d6c9527e29a965f843c398289678&q=${value}&format=json`;
export const faceBookAuthClientId =
  process.env.EXPO_PUBLIC_FACEBOOK_AUTH_CLIENT_ID;
export const locationIQToken = process.env.EXPO_PUBLIC_LOCATION_IQ_ACCESS_TOKEN;
export const supabaseApiKey = process.env.EXPO_PUBLIC_SUPABASE_APIKEY;
export const supabaseRefID = process.env.EXPO_PUBLIC_SUPABASE_REF_ID;
export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
export const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
export const firebaseAuthDomain = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
export const firebaseProjectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
export const firebaseStorageBucket =
  process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
export const firebaseMessagingSenderId =
  process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
export const firebaseAppId = process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
export const firebaseMeasurementId =
  process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID;
