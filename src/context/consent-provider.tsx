"use client";

import React, {
  PropsWithChildren,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { getCookie } from "cookies-next";
import { sendGTMEvent, GoogleTagManager } from "@next/third-parties/google";

import { ConsentManager, ConsentDispatch } from "./consent-context";

import {
  setConsentCookies,
  getInitialPermissions,
} from "../utils/consent-utils";
import { gtagFn } from "../utils/gtag";
import {
  ANALYTICS_TAGS,
  NECESSARY_TAGS,
  CONSENT_COOKIE_NAME,
  DATA_LAYER,
  TAG_MANAGER_KEY,
  cookieExpiry,
  redactionCookie,
} from "../utils/constants";
import {
  checkNecessaryTags,
  checkTargetingTags,
} from "../utils/validation-utils";
import {
  convertCookieToConsent,
  convertTagsToCookies,
} from "../utils/cookie-conversion-utils";
import { handlers } from "../utils/handlers";
import type { AnalyticsTags, BrowserCookies, ConsentResult, NecessaryAnalyticsTagsTupleArrays, NecessaryTags } from "../types";

type CookieConsentProviderProps = {
  consentCookie?: string;
  necessaryTags: NecessaryTags[];
  analyticsTags?: AnalyticsTags[];
  enabled?: boolean;
  expiry?: number;
  redact?: boolean;
  dataLayerName?: string;
  gtagName?: string;
};

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
  props: PropsWithChildren<CookieConsentProviderProps>
) {
  const {
    consentCookie = CONSENT_COOKIE_NAME, // the name of the cookie that stores the user's consent
    necessaryTags,
    analyticsTags,
    enabled = true,
    expiry = cookieExpiry,
    redact = true,
    dataLayerName = DATA_LAYER,
    gtagName = TAG_MANAGER_KEY,
    children,
  } = props;
  const cookies = JSON.parse(getCookie(consentCookie) || "{}");
  const [hasConsent, setHasConsent] = useState<boolean>(
    enabled
    // has consent starts off as equal to enabled value
    // we use the layoutEffect to check if the user has provided consent.
  );
  const [selectedKeys] = useState<NecessaryAnalyticsTagsTupleArrays>(() => {
    // coerce tags into selectedKeys shape
    const hasNecessaryTags = necessaryTags && checkNecessaryTags(necessaryTags);
    const hasAnalyticsTags = analyticsTags && checkTargetingTags(analyticsTags);

    return [
      hasNecessaryTags ? necessaryTags : [], // necessary tags should never be empty
      hasAnalyticsTags ? analyticsTags : [], // analytics tags can be empty
    ];
  });

  useLayoutEffect(() => {
    if (!enabled) return;
    const gtag = gtagFn(DATA_LAYER, TAG_MANAGER_KEY);
    if (typeof gtag === "function") {
      // set the default consent based on the user provided initialConsent
      // if the user has not provided any initialConsent, then the default consent will be set to 'denied' for all tags

      const defaultConsent = getInitialPermissions(necessaryTags, [
        ...NECESSARY_TAGS,
        ...ANALYTICS_TAGS,
      ]);
      gtag("consent", "default", defaultConsent);
      redact && gtag("set", redactionCookie, true);

      setHasConsent(!!Object.keys(cookies).length);
      handlers.onSuccess("trnsprncy: GTM has been initialized");
    } else {
      handlers.onError("trnsprncy: GTM could not be initialized");
      throw new Error("trnsprncy: GTM requires gtag function to be defined");
    }
  }, [enabled, necessaryTags, redact, cookies]);

  const updateGTMConsent = useCallback(
    (consent: Partial<ConsentResult>) => {
      const gTag = gtagFn(dataLayerName, gtagName);
      if (typeof gTag === "function") {
        gTag("consent", "update", consent);
      } else console.warn("trnsprncy: gtag not found2");
    },
    [dataLayerName, gtagName]
  );

  const handleConsentUpdate = useCallback(
    (consentUpdate: Partial<BrowserCookies>) => {
      try {
        const _cookies = JSON.parse(getCookie(consentCookie) || "{}");

        const _updatedCookie = {
          ...convertTagsToCookies(selectedKeys),
          ..._cookies,
          ...consentUpdate,
        };

        // update the consent cookie
        setConsentCookies(_updatedCookie, consentCookie, expiry);
        // transform_updatedCookie  to consent
        const consent = convertCookieToConsent(_updatedCookie);
        // update the consent in GTM
        updateGTMConsent(consent);
        handlers.onSuccess("trnsprncy: Consent updated");
      } catch (error) {
        handlers.onError("trnsprncy: Consent could not be updated");
        console.error(error);
      }
    },
    [consentCookie, expiry, updateGTMConsent, selectedKeys]
  );

  // makeshift slot component
  // const BannerSlot = enabled && !hasConsent && banner ? banner : () => null;

  return (
    <ConsentManager.Provider
      value={{ tags: selectedKeys, consentCookie, hasConsent }}
    >
      <ConsentDispatch.Provider
        value={{ handleConsentUpdate, sendGTMEvent, setHasConsent }}
      >
        {enabled && hasConsent ? (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!}
            dataLayerName={dataLayerName}
          />
        ) : (
          children
        )}
      </ConsentDispatch.Provider>
    </ConsentManager.Provider>
  );
}
/**
 * @TODO:
 * Add 3rd party tag support (use generics to support unknown tags, but still keep type-safety)
 */
