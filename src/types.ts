export type EssentialTags =
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage";

export type AnalyticsTags =
  | "ad_storage"
  | "analytics_storage"
  | "ad_personalization"
  | "ad_user_data";

export type EssentialCookies = {
  [key in EssentialTags]: boolean;
};

export type AnalyticsCookies = {
  [key in AnalyticsTags]: boolean;
};

// key array expects a tuple of primary and secondary keys
export type TagArray<T extends EssentialTags | AnalyticsTags> = T[]; // Array of type T (either PKeys or SKeys)
export type EssentialAnalyticsTagsTupleArrays = [
  TagArray<EssentialTags> | undefined,
  TagArray<AnalyticsTags> | undefined,
];

export type BrowserCookies = {
  [key in EssentialTags | AnalyticsTags]: boolean;
};

export type ConsentResult = {
  [key in EssentialTags | AnalyticsTags]: "granted" | "denied";
};