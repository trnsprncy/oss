import type { AnalyticsTags, NecessaryTags } from "../types";
/**
 * Check if the user has opted out of all necessary tags
 * This will return a warning if the user has opted out of all necessary tags
 *
 * @param {NecessaryTags[]} tags
 * @return {*} {boolean}
 */
export declare function checkNecessaryTags(tags: NecessaryTags[]): boolean;
/**
 * Check if the user has opted out of all tracking tags
 * This will return a warning if the user has opted out of all tracking tags
 *
 * @param {AnalyticsTags[]} tags
 * @return {*} {boolean}
 */
export declare function checkTargetingTags(tags: AnalyticsTags[]): boolean;
