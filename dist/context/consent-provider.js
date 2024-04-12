"use client";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback, useLayoutEffect, } from "react";
import { getCookie } from "cookies-next";
import { sendGTMEvent, GoogleTagManager } from "@next/third-parties/google";
import { ConsentManager, ConsentDispatch } from "./consent-context";
import { setConsentCookies, getInitialPermissions, } from "../utils/consent-utils";
import { gtagFn } from "../utils/gtag";
import { ANALYTICS_TAGS, NECESSARY_TAGS, CONSENT_COOKIE_NAME, DATA_LAYER, TAG_MANAGER_KEY, cookieExpiry, redactionCookie, } from "../utils/constants";
import { checkNecessaryTags, checkTargetingTags, } from "../utils/validation-utils";
import { convertCookieToConsent, convertTagsToCookies, } from "../utils/cookie-conversion-utils";
import { handlers } from "../utils/handlers";
/**
 *
 *
 * @export
 * @param {PropsWithChildren<CookieConsentProviderProps>} {
 *   consentCookie: string, necessaryTags: NecessaryTags[], analyticsTags: AnalyticsTags[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, banner: React.ReactNode, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function CookieConsentProvider(
// type AdditionalTags<T extends string> = T[]; // @TODO: add support for additional tags
props) {
    var _a = props.consentCookie, consentCookie = _a === void 0 ? CONSENT_COOKIE_NAME : _a, // the name of the cookie that stores the user's consent
    necessaryTags = props.necessaryTags, analyticsTags = props.analyticsTags, _b = props.enabled, enabled = _b === void 0 ? true : _b, _c = props.expiry, expiry = _c === void 0 ? cookieExpiry : _c, _d = props.redact, redact = _d === void 0 ? true : _d, _e = props.dataLayerName, dataLayerName = _e === void 0 ? DATA_LAYER : _e, _f = props.gtagName, gtagName = _f === void 0 ? TAG_MANAGER_KEY : _f, children = props.children;
    var cookies = JSON.parse(getCookie(consentCookie) || "{}");
    var _g = useState(enabled
    // has consent starts off as equal to enabled value
    // we use the layoutEffect to check if the user has provided consent.
    ), hasConsent = _g[0], setHasConsent = _g[1];
    var selectedKeys = useState(function () {
        // coerce tags into selectedKeys shape
        var hasNecessaryTags = necessaryTags && checkNecessaryTags(necessaryTags);
        var hasAnalyticsTags = analyticsTags && checkTargetingTags(analyticsTags);
        return [
            hasNecessaryTags ? necessaryTags : [], // necessary tags should never be empty
            hasAnalyticsTags ? analyticsTags : [], // analytics tags can be empty
        ];
    })[0];
    useLayoutEffect(function () {
        if (!enabled)
            return;
        var gtag = gtagFn(DATA_LAYER, TAG_MANAGER_KEY);
        if (typeof gtag === "function") {
            // set the default consent based on the user provided initialConsent
            // if the user has not provided any initialConsent, then the default consent will be set to 'denied' for all tags
            var defaultConsent = getInitialPermissions(necessaryTags, __spreadArray(__spreadArray([], NECESSARY_TAGS, true), ANALYTICS_TAGS, true));
            gtag("consent", "default", defaultConsent);
            redact && gtag("set", redactionCookie, true);
            setHasConsent(!!Object.keys(cookies).length);
            handlers.onSuccess("Transparency: GTM has been initialized");
        }
        else {
            handlers.onError("Transparency: GTM could not be initialized");
            throw new Error("Transparency: GTM requires gtag function to be defined");
        }
    }, [enabled, necessaryTags, redact, cookies]);
    var updateGTMConsent = useCallback(function (consent) {
        var gTag = gtagFn(dataLayerName, gtagName);
        if (typeof gTag === "function") {
            gTag("consent", "update", consent);
        }
        else
            console.warn("Transparency: gtag not found2");
    }, [dataLayerName, gtagName]);
    var handleConsentUpdate = useCallback(function (consentUpdate) {
        try {
            var _cookies = JSON.parse(getCookie(consentCookie) || "{}");
            var _updatedCookie = __assign(__assign(__assign({}, convertTagsToCookies(selectedKeys)), _cookies), consentUpdate);
            // update the consent cookie
            setConsentCookies(_updatedCookie, consentCookie, expiry);
            // transform_updatedCookie  to consent
            var consent = convertCookieToConsent(_updatedCookie);
            // update the consent in GTM
            updateGTMConsent(consent);
            handlers.onSuccess("Transparency: Consent updated");
        }
        catch (error) {
            handlers.onError("Transparency: Consent could not be updated");
            console.error(error);
        }
    }, [consentCookie, expiry, updateGTMConsent, selectedKeys]);
    // makeshift slot component
    // const BannerSlot = enabled && !hasConsent && banner ? banner : () => null;
    return (_jsx(ConsentManager.Provider, { value: { tags: selectedKeys, consentCookie: consentCookie, hasConsent: hasConsent }, children: _jsx(ConsentDispatch.Provider, { value: { handleConsentUpdate: handleConsentUpdate, sendGTMEvent: sendGTMEvent, setHasConsent: setHasConsent }, children: enabled && hasConsent ? (_jsx(GoogleTagManager, { gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID, dataLayerName: dataLayerName })) : (children) }) }));
}
