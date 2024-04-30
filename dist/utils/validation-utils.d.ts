import type { NonEssentialTags, EssentialTags } from "../types";
/**
 * Check if the user has opted out of all essential tags
 * This will return a warning if the user has opted out of all essential tags
 *
 * @param {EssentialTags[]} tags
 * @return {*} {boolean}
 */
export declare function checkEssentialTags(tags: EssentialTags[]): boolean;
/**
 * Check if the user has opted out of all tracking tags
 * This will return a warning if the user has opted out of all tracking tags
 *
 * @param {NonEssentialTags[]} tags
 * @return {*} {boolean}
 */
export declare function checkTargetingTags(tags: NonEssentialTags[]): boolean;
