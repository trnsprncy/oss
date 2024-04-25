export type EssentialTags = "functionality_storage" | "personalization_storage" | "security_storage";
export type AnalyticsTags = "ad_storage" | "analytics_storage" | "ad_personalization" | "ad_user_data";
export type EssentialCookies = {
    [key in EssentialTags]: boolean;
};
export type AnalyticsCookies = {
    [key in AnalyticsTags]: boolean;
};
export type TagArray<T extends EssentialTags | AnalyticsTags> = T[];
export type EssentialAnalyticsTagsTupleArrays = [
    TagArray<EssentialTags> | undefined,
    TagArray<AnalyticsTags> | undefined
];
export type BrowserCookies = {
    [key in EssentialTags | AnalyticsTags]: boolean;
};
export type ConsentResult = {
    [key in EssentialTags | AnalyticsTags]: "granted" | "denied";
};
