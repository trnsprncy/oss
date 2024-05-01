"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useLayoutEffect, } from "react";
import { getCookie } from "cookies-next";
import { sendGTMEvent, GoogleTagManager } from "@next/third-parties/google";
import { ConsentManager, ConsentDispatch } from "./consent-context";
import { setConsentCookies, getInitialPermissions, } from "../utils/consent-utils";
import { gtagFn } from "../utils/gtag";
import { ESSENTIAL_TAGS, CONSENT_COOKIE_NAME, DATA_LAYER, TAG_MANAGER_KEY, cookieExpiry, redactionCookie, } from "../utils/constants";
import { convertCookieToConsent, convertTagsToCookies, } from "../utils/cookie-conversion-utils";
import { handlers } from "../utils/handlers";
/**
 * @export
 * @param {PropsWithChildren<TrnsprncyProviderProps>} {
 *   consentCookie: string, essentialTags: NonEmptyArray<Tag>, nonEssentialTags: Tag[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider(
// type AdditionalTags<T extends string> = T[]; // @TODO: add support for additional tags
_a) {
    var _b = _a.consentCookie, consentCookie = _b === void 0 ? CONSENT_COOKIE_NAME : _b, // the name of the cookie that stores the user's consent
    essentialTags = _a.essentialTags, _c = _a.nonEssentialTags, nonEssentialTags = _c === void 0 ? [
        "personalization_storage",
        "security_storage",
        "security_storage",
    ] : _c, _d = _a.enabled, enabled = _d === void 0 ? true : _d, _e = _a.expiry, expiry = _e === void 0 ? cookieExpiry : _e, _f = _a.redact, redact = _f === void 0 ? true : _f, _g = _a.dataLayerName, dataLayerName = _g === void 0 ? DATA_LAYER : _g, _h = _a.gtagName, gtagName = _h === void 0 ? TAG_MANAGER_KEY : _h, children = _a.children;
    if (nonEssentialTags) {
        // enforce that non-essential tags are not included in the essential tags
        nonEssentialTags = nonEssentialTags
            .map(function (tag) {
            if (essentialTags.includes(tag)) {
                return false;
            }
            return tag;
        })
            .filter(Boolean);
    }
    var cookies = JSON.parse(getCookie(consentCookie) || "{}");
    var _j = useState(!!Object.keys(cookies).length), hasConsent = _j[0], setHasConsent = _j[1];
    var selectedKeys = useState(function () {
        // coerce user provided tags into consent shape and check if they are valid
        return [
            essentialTags.every(function (tag) {
                var isEssentialTag = ESSENTIAL_TAGS.includes(tag);
                if (!isEssentialTag)
                    console.warn("Invalid essential tag provided: ", tag);
                return isEssentialTag;
            })
                ? essentialTags
                : undefined,
            nonEssentialTags.every(function (tag) { return ESSENTIAL_TAGS.includes(tag); })
                ? nonEssentialTags
                : undefined,
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
            // build up the current cookie tags from the consent cookie
            var _cookieTags = JSON.parse(getCookie(consentCookie) || "{}");
            var _updatedCookie = Object.assign({}, convertTagsToCookies(selectedKeys), Object.keys(_cookieTags).length ? _cookieTags : {});
            // update the consent cookie with the new consent
            if (consentUpdate) {
                _updatedCookie = Object.assign({}, _updatedCookie, consentUpdate);
            }
            // apply the updates to the consent cookie state
            setConsentCookies(_updatedCookie, consentCookie, expiry);
            // transform _updatedCookie  to consent
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
    return (_jsx(ConsentManager.Provider, { value: { tags: selectedKeys, consentCookie: consentCookie, hasConsent: hasConsent }, children: _jsx(ConsentDispatch.Provider, { value: { handleConsentUpdate: handleConsentUpdate, sendGTMEvent: sendGTMEvent, setHasConsent: setHasConsent }, children: enabled && hasConsent ? (_jsx(_Fragment, { children: _jsx(GoogleTagManager, { gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID, dataLayerName: dataLayerName }) })) : (children) }) }));
}
