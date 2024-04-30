export type Tag = "functionality_storage" | "personalization_storage" | "security_storage";
export type EssentialTags = Tag;
export type NonEssentialTags = Tag;
export type EssentialCookies = {
    [key in EssentialTags]: boolean;
};
export type NonEssentialCookies = {
    [key in NonEssentialTags]: boolean;
};
export type TagArray<T extends EssentialTags | NonEssentialTags> = T[];
export type EssentialTagsTupleArrays = [
    TagArray<EssentialTags> | undefined,
    TagArray<NonEssentialTags> | undefined
];
export type BrowserCookies = {
    [key in EssentialTags | NonEssentialTags]: boolean;
};
export type ConsentResult = {
    [key in EssentialTags | NonEssentialTags]: "granted" | "denied";
};
