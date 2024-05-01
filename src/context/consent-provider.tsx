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
  ESSENTIAL_TAGS,
  CONSENT_COOKIE_NAME,
  DATA_LAYER,
  TAG_MANAGER_KEY,
  cookieExpiry,
  redactionCookie,
} from "../utils/constants";
import {
  convertCookieToConsent,
  convertTagsToCookies,
} from "../utils/cookie-conversion-utils";
import { handlers } from "../utils/handlers";
import type {
  BrowserCookies,
  ConsentResult,
  EssentialTagsTupleArrays,
  Tag,
} from "../types";

type TrnsprncyProviderProps = PropsWithChildren<{
  consentCookie?: string;
  essentialTags: Tag[];
  nonEssentialTags?: Tag[];
  enabled?: boolean;
  expiry?: number;
  redact?: boolean;
  dataLayerName?: string;
  gtagName?: string;
}>;

/**
 * @export
 * @param {PropsWithChildren<TrnsprncyProviderProps>} {
 *   consentCookie: string, essentialTags: NonEmptyArray<Tag>, nonEssentialTags: Tag[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider(
  // type AdditionalTags<T extends string> = T[]; // @TODO: add support for additional tags
  {
    consentCookie = CONSENT_COOKIE_NAME, // the name of the cookie that stores the user's consent
    essentialTags,
    nonEssentialTags = [
      "personalization_storage",
      "security_storage",
      "security_storage",
    ],
    enabled = true,
    expiry = cookieExpiry,
    redact = true,
    dataLayerName = DATA_LAYER,
    gtagName = TAG_MANAGER_KEY,
    children,
  }: TrnsprncyProviderProps
) {
  if (nonEssentialTags) {
    // enforce that non-essential tags are not included in the essential tags
    nonEssentialTags = nonEssentialTags
      .map((tag) => {
        if (essentialTags.includes(tag)) {
          return false;
        }
        return tag;
      })
      .filter(Boolean) as Tag[];
  }

  const cookies = JSON.parse(getCookie(consentCookie) || "{}");

  const [hasConsent, setHasConsent] = useState<boolean>(
    !!Object.keys(cookies).length
  );
  const [selectedKeys] = useState<EssentialTagsTupleArrays>(() => {
    // coerce user provided tags into consent shape and check if they are valid

    return [
      essentialTags.every((tag) => {
        const isEssentialTag = ESSENTIAL_TAGS.includes(tag);
        if (!isEssentialTag)
          console.warn("Invalid essential tag provided: ", tag);
        return isEssentialTag;
      })
        ? essentialTags
        : undefined,
      nonEssentialTags.every((tag) => ESSENTIAL_TAGS.includes(tag))
        ? nonEssentialTags
        : undefined,
    ];
  });

  useLayoutEffect(() => {
    if (!enabled || !essentialTags?.length) return;
    const gtag = gtagFn(DATA_LAYER, TAG_MANAGER_KEY);
    if (typeof gtag === "function") {
      // set the default consent based on the user provided initialConsent
      // if the user has not provided any initialConsent, then the default consent will be set to 'denied' for all tags

      const defaultConsent = getInitialPermissions(
        essentialTags,
        nonEssentialTags ?? []
      );
      gtag("consent", "default", defaultConsent);
      redact && gtag("set", redactionCookie, true);

      setHasConsent(!!Object.keys(cookies).length);
      handlers.onSuccess("trnsprncy: GTM has been initialized");
    } else {
      handlers.onError("trnsprncy: GTM could not be initialized");
      throw new Error("trnsprncy: GTM requires gtag function to be defined");
    }
  }, [enabled, essentialTags, redact, cookies]);

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
        // build up the current cookie tags from the consent cookie
        const _cookieTags = JSON.parse(getCookie(consentCookie) || "{}");

        let _updatedCookie = Object.assign(
          {},
          convertTagsToCookies(selectedKeys),
          Object.keys(_cookieTags).length ? _cookieTags : {}
        );

        // update the consent cookie with the new consent
        if (consentUpdate) {
          _updatedCookie = Object.assign({}, _updatedCookie, consentUpdate);
        }

        // apply the updates to the consent cookie state
        setConsentCookies(_updatedCookie, consentCookie, expiry);
        // transform _updatedCookie  to consent
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

  return (
    <ConsentManager.Provider
      value={{ tags: selectedKeys, consentCookie, hasConsent }}
    >
      <ConsentDispatch.Provider
        value={{ handleConsentUpdate, sendGTMEvent, setHasConsent }}
      >
        {enabled && hasConsent ? (
          <>
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!}
              dataLayerName={dataLayerName}
            />
          </>
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
