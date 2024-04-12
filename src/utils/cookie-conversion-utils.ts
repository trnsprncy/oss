import { getConsent } from "./consent-utils";
import { NECESSARY_TAGS } from "./constants";
import type { BrowserCookies, ConsentResult, NecessaryAnalyticsTagsTupleArrays } from "../types";

/**
 * Convert the cookie object to a consent object
 *
 * @export
 * @param {BrowserCookies} cookie
 * @return {*} {Partial<ConsentResult>}
 */
export function convertCookieToConsent(
  cookie: BrowserCookies
): Partial<ConsentResult> {
  return {
    ...Object.fromEntries(
      Object.entries(cookie).map(([key, value]) => [key, getConsent(value)])
    ),
  };
}

/**
 * Convert the user provided tags into a cookie object
 *
 * @param {NecessaryAnalyticsTagsTupleArrays} selectedTags
 * @return {*}  {Permission}
 */
export function convertTagsToCookies(
  selectedTags: NecessaryAnalyticsTagsTupleArrays
): Partial<BrowserCookies> {
  const cookies = {} as BrowserCookies;

  for (const tags of selectedTags) {
    if (tags?.length) {
      for (const tag of tags) {
        cookies[tag] = !!NECESSARY_TAGS.includes(tag);
      }
    }
  }
  return cookies;
}
