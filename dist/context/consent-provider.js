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
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback, useLayoutEffect, } from "react";
import { getCookie } from "cookies-next";
import { sendGTMEvent, GoogleTagManager } from "@next/third-parties/google";
import { ConsentManager, ConsentDispatch } from "./consent-context";
import { setConsentCookies, getInitialPermissions, } from "../utils/consent-utils";
import { gtagFn } from "../utils/gtag";
import { CONSENT_COOKIE_NAME, DATA_LAYER, TAG_MANAGER_KEY, cookieExpiry, redactionCookie, } from "../utils/constants";
import { checkEssentialTags, checkTargetingTags, } from "../utils/validation-utils";
import { convertCookieToConsent, convertTagsToCookies, } from "../utils/cookie-conversion-utils";
import { handlers } from "../utils/handlers";
/**
 *
 *
 * @export
 * @param {PropsWithChildren<TrnsprncyProviderProps>} {
 *   consentCookie: string, essentialTags: EssentialTags[], nonEssentialTags: NonEssentialTags[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, banner: React.ReactNode, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider(
// type AdditionalTags<T extends string> = T[]; // @TODO: add support for additional tags
props) {
    var _a = props.consentCookie, consentCookie = _a === void 0 ? CONSENT_COOKIE_NAME : _a, // the name of the cookie that stores the user's consent
    essentialTags = props.essentialTags, nonEssentialTags = props.nonEssentialTags, _b = props.enabled, enabled = _b === void 0 ? true : _b, _c = props.expiry, expiry = _c === void 0 ? cookieExpiry : _c, _d = props.redact, redact = _d === void 0 ? true : _d, _e = props.dataLayerName, dataLayerName = _e === void 0 ? DATA_LAYER : _e, _f = props.gtagName, gtagName = _f === void 0 ? TAG_MANAGER_KEY : _f, children = props.children;
    if (nonEssentialTags) {
        // ensure that non-essential tags are not duplicated in the essential tags
        nonEssentialTags.forEach(function (tag) {
            if (essentialTags === null || essentialTags === void 0 ? void 0 : essentialTags.includes(tag)) {
                throw new Error("trnsprncy: ".concat(tag, " is an essential tag and cannot be included in the non-essential tags array."));
            }
        });
    }
    var cookies = JSON.parse(getCookie(consentCookie) || "{}");
    var _g = useState(enabled
    // has consent starts off as equal to enabled value
    // we use the layoutEffect to check if the user has provided consent.
    ), hasConsent = _g[0], setHasConsent = _g[1];
    var selectedKeys = useState(function () {
        // coerce tags into selectedKeys shape
        var hasEssentialTags = essentialTags && checkEssentialTags(essentialTags);
        var hasAnalyticsTags = nonEssentialTags && checkTargetingTags(nonEssentialTags);
        return [
            hasEssentialTags ? essentialTags : [], // essential tags should never be empty
            hasAnalyticsTags ? nonEssentialTags : [], // analytics tags can be empty
        ];
    })[0];
    useLayoutEffect(function () {
        if (!enabled || !(essentialTags === null || essentialTags === void 0 ? void 0 : essentialTags.length))
            return;
        var gtag = gtagFn(DATA_LAYER, TAG_MANAGER_KEY);
        if (typeof gtag === "function") {
            // set the default consent based on the user provided initialConsent
            // if the user has not provided any initialConsent, then the default consent will be set to 'denied' for all tags
            var defaultConsent = getInitialPermissions(essentialTags, nonEssentialTags !== null && nonEssentialTags !== void 0 ? nonEssentialTags : []);
            gtag("consent", "default", defaultConsent);
            redact && gtag("set", redactionCookie, true);
            setHasConsent(!!Object.keys(cookies).length);
            handlers.onSuccess("trnsprncy: GTM has been initialized");
        }
        else {
            handlers.onError("trnsprncy: GTM could not be initialized");
            throw new Error("trnsprncy: GTM requires gtag function to be defined");
        }
    }, [enabled, essentialTags, redact, cookies]);
    var updateGTMConsent = useCallback(function (consent) {
        var gTag = gtagFn(dataLayerName, gtagName);
        if (typeof gTag === "function") {
            gTag("consent", "update", consent);
        }
        else
            console.warn("trnsprncy: gtag not found2");
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
            handlers.onSuccess("trnsprncy: Consent updated");
        }
        catch (error) {
            handlers.onError("trnsprncy: Consent could not be updated");
            console.error(error);
        }
    }, [consentCookie, expiry, updateGTMConsent, selectedKeys]);
    return (_jsx(ConsentManager.Provider, { value: { tags: selectedKeys, consentCookie: consentCookie, hasConsent: hasConsent }, children: _jsx(ConsentDispatch.Provider, { value: { handleConsentUpdate: handleConsentUpdate, sendGTMEvent: sendGTMEvent, setHasConsent: setHasConsent }, children: enabled && hasConsent ? (_jsx(GoogleTagManager, { gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID, dataLayerName: dataLayerName })) : (children) }) }));
}
