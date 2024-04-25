import type { BrowserCookies, ConsentResult, EssentialAnalyticsTagsTupleArrays } from "../types";
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
 * @param {EssentialAnalyticsTagsTupleArrays} selectedTags
 * @return {*}  {Permission}
 */
export declare function convertTagsToCookies(selectedTags: EssentialAnalyticsTagsTupleArrays): Partial<BrowserCookies>;
