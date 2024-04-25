import { ConsentResult } from "../types";
/**
 * GTM expected consent format is an enum of 'granted' or 'denied'
 * This is a helper function to get the consent value based on the condition
 *
 * @export
 * @param condition {boolean}
 * @return "granted" | "denied"
 */
export declare function getConsent(condition: boolean): "granted" | "denied";
/**
 * Creates a consent object based on the cookies
 * This will add each cookie and its consent value to the app-consent cookie
 *
 * @export
 * @param {ConsentResult} cookies
 * @param {string} appCookie
 * @param {number} [customExpiry]
 * @return void {*}
 */
export declare function setConsentCookies(cookies: ConsentResult, appCookie: string, customExpiry?: number): void;
/**
 * Compare the essential tags with the analytics tags
 * This will return an object where the essential tags as keys
 * are all "granted" and the rest are "denied"
 *
 * @export
 * @param  {string[]} essentialTags
 * @param  {string[]} analyticsTags
 * @return ConsentResult {*}
 *
 */
export declare function getInitialPermissions(essentialTags: string[], analyticsTags: string[]): ConsentResult;
