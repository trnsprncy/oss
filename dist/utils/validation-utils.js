import { ANALYTICS_TAGS, NECESSARY_TAGS } from "./constants";
// These utils are used by consent manager component to validate the tags that the user has opted out of
/**
 * Check if the user has opted out of all necessary tags
 * This will return a warning if the user has opted out of all necessary tags
 *
 * @param {NecessaryTags[]} tags
 * @return {*} {boolean}
 */
export function checkNecessaryTags(tags) {
    if (!tags.length || !Array.isArray(tags)) {
        console.warn("Analytics and tracking is not enabled. No necessary tags were provided. Please ensure that this was intentional");
        return false;
    }
    return tags.every(function (tag) {
        var isNecessaryTag = NECESSARY_TAGS.includes(tag);
        if (!isNecessaryTag)
            console.warn("Invalid necessary tag provided: ", tag);
        return isNecessaryTag;
    });
}
/**
 * Check if the user has opted out of all tracking tags
 * This will return a warning if the user has opted out of all tracking tags
 *
 * @param {AnalyticsTags[]} tags
 * @return {*} {boolean}
 */
export function checkTargetingTags(tags) {
    if (!tags.length || !Array.isArray(tags)) {
        console.warn("You have opted out of all tracking tags. Please ensure that this was intentional.");
        return false;
    }
    return tags.every(function (tag) { return ANALYTICS_TAGS.includes(tag); });
}
