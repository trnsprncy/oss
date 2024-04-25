var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { setCookie } from "cookies-next";
import { cookieExpiry } from "./constants";
// Each of these utils are used by the consent manager component
/**
 * GTM expected consent format is an enum of 'granted' or 'denied'
 * This is a helper function to get the consent value based on the condition
 *
 * @export
 * @param condition {boolean}
 * @return "granted" | "denied"
 */
export function getConsent(condition) {
    return condition ? "granted" : "denied";
}
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
export function setConsentCookies(cookies, appCookie, customExpiry) {
    if (typeof window !== "undefined") {
        setCookie(appCookie, JSON.stringify(cookies), {
            maxAge: customExpiry !== null && customExpiry !== void 0 ? customExpiry : cookieExpiry,
        });
    }
}
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
export function getInitialPermissions(essentialTags, analyticsTags) {
    var consentResult = {};
    for (var _i = 0, _a = __spreadArray(__spreadArray([], essentialTags, true), analyticsTags, true); _i < _a.length; _i++) {
        var tag = _a[_i];
        consentResult[tag] = essentialTags.includes(tag)
            ? "granted"
            : "denied";
    }
    return consentResult;
}
