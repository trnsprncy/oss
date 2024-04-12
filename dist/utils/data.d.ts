import { AnalyticsTags, NecessaryTags } from "../types";
type TagDetails = {
    [key in NecessaryTags | AnalyticsTags]: {
        label: string;
        description: string;
    };
};
export declare const tagDetails: TagDetails;
export declare const categoryDescriptions: {
    necessary: string;
    analytics: string;
};
export {};
