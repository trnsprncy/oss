import { NonEssentialTags, EssentialTags } from "../types";
type TagDetails = {
    [key in EssentialTags | NonEssentialTags]: {
        label: string;
        description: string;
    };
};
export declare const tagDetails: TagDetails;
export declare const categoryDescriptions: {
    essential: string;
    "non-essential": string;
};
export {};
