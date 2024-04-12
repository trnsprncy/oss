export type NecessaryTags = "functionality_storage" | "personalization_storage" | "security_storage";
export type AnalyticsTags = "ad_storage" | "analytics_storage" | "ad_personalization" | "ad_user_data";
export type NecessaryCookies = {
    [key in NecessaryTags]: boolean;
};
export type AnalyticsCookies = {
    [key in AnalyticsTags]: boolean;
};
export type TagArray<T extends NecessaryTags | AnalyticsTags> = T[];
export type NecessaryAnalyticsTagsTupleArrays = [
    TagArray<NecessaryTags> | undefined,
    TagArray<AnalyticsTags> | undefined
];
export type BrowserCookies = {
    [key in NecessaryTags | AnalyticsTags]: boolean;
};
export type ConsentResult = {
    [key in NecessaryTags | AnalyticsTags]: "granted" | "denied";
};
