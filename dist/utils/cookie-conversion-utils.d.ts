import type { BrowserCookies, ConsentResult, NecessaryAnalyticsTagsTupleArrays } from "../types";
/**
 * Convert the cookie object to a consent object
 *
 * @export
 * @param {BrowserCookies} cookie
 * @return {*} {Partial<ConsentResult>}
 */
export declare function convertCookieToConsent(cookie: BrowserCookies): Partial<ConsentResult>;
/**
 * Convert the user provided tags into a cookie object
 *
 * @param {NecessaryAnalyticsTagsTupleArrays} selectedTags
 * @return {*}  {Permission}
 */
export declare function convertTagsToCookies(selectedTags: NecessaryAnalyticsTagsTupleArrays): Partial<BrowserCookies>;
