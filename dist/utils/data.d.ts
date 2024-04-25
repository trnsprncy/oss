import { AnalyticsTags, EssentialTags } from "../types";
type TagDetails = {
    [key in EssentialTags | AnalyticsTags]: {
        label: string;
        description: string;
    };
};
export declare const tagDetails: TagDetails;
export declare const categoryDescriptions: {
    essential: string;
    analytics: string;
};
export {};
