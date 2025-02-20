export type IPropertyInsights = {
  id: number;
  propertyId: number;
  views: number;
  shared: number;
  addedToFavourites: number;
  contactInfoViews: number;
  emailAttempts: number;
  callAttempts: number;
  whatsAppAttempts: number;
  propertyType: string;
};

export type IPropertyInsightsTypes =
  | "views"
  | "shared"
  | "addedToFavourites"
  | "contactInfoViews"
  | "emailAttempts"
  | "whatsAppAttempts"
  | "removedFromFavourites"
  | "callAttempts";
