import type { BrowserCookies, ConsentResult, EssentialTagsTupleArrays } from "../types";
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
 * @param {EssentialTagsTupleArrays} selectedTags
 * @return {*}  {Permission}
 */
export declare function convertTagsToCookies(selectedTags: EssentialTagsTupleArrays): Partial<BrowserCookies>;
