var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getConsent } from "./consent-utils";
import { ESSENTIAL_TAGS } from "./constants";
/**
 * Convert the cookie object to a consent object
 *
 * @export
 * @param {BrowserCookies} cookie
 * @return {*} {Partial<ConsentResult>}
 */
export function convertCookieToConsent(cookie) {
    return __assign({}, Object.fromEntries(Object.entries(cookie).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, getConsent(value)];
    })));
}
/**
 * Convert the user provided tags into a cookie object
 *
 * @param {EssentialTagsTupleArrays} selectedTags
 * @return {*}  {Permission}
 */
export function convertTagsToCookies(selectedTags) {
    var cookies = {};
    for (var _i = 0, selectedTags_1 = selectedTags; _i < selectedTags_1.length; _i++) {
        var tags = selectedTags_1[_i];
        if (tags === null || tags === void 0 ? void 0 : tags.length) {
            for (var _a = 0, tags_1 = tags; _a < tags_1.length; _a++) {
                var tag = tags_1[_a];
                cookies[tag] = !!ESSENTIAL_TAGS.includes(tag);
            }
        }
    }
    return cookies;
}
