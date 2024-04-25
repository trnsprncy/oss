import { ESSENTIAL_TAGS } from "./constants";
import type { NonEssentialTags, EssentialTags } from "../types";

// These utils are used by consent manager component to validate the tags that the user has opted out of

/**
 * Check if the user has opted out of all essential tags
 * This will return a warning if the user has opted out of all essential tags
 *
 * @param {EssentialTags[]} tags
 * @return {*} {boolean}
 */
export function checkEssentialTags(tags: EssentialTags[]) {
  if (!tags.length || !Array.isArray(tags)) {
    console.warn(
      "Analytics and tracking is not enabled. No essential tags were provided. Please ensure that this was intentional"
    );
    return false;
  }
  return tags.every((tag) => {
    const isEssentialTag = ESSENTIAL_TAGS.includes(tag);
    if (!isEssentialTag) console.warn("Invalid essential tag provided: ", tag);
    return isEssentialTag;
  });
}

/**
 * Check if the user has opted out of all tracking tags
 * This will return a warning if the user has opted out of all tracking tags
 *
 * @param {NonEssentialTags[]} tags
 * @return {*} {boolean}
 */
export function checkTargetingTags(tags: NonEssentialTags[]) {
  if (!tags.length || !Array.isArray(tags)) {
    console.warn(
      "You have opted out of all tracking tags. Please ensure that this was intentional."
    );
    return false;
  }
  return tags.every((tag) => ESSENTIAL_TAGS.includes(tag));
}
