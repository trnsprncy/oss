import React, { createContext } from "react";
import type { BrowserCookies, EssentialAnalyticsTagsTupleArrays } from "../types";

export const ConsentManager = createContext<
  | {
      consentCookie: string;
      tags: EssentialAnalyticsTagsTupleArrays;
      hasConsent: boolean;
    }
  | undefined
>(undefined);

export const ConsentDispatch = createContext<{
  handleConsentUpdate: (consentUpdate: Partial<BrowserCookies>) => void;
  sendGTMEvent: (event: string, data: Record<string, string>) => void;
  setHasConsent: (hasConsent: boolean) => void;
}>({
  handleConsentUpdate: () => {},
  sendGTMEvent: () => {},
  setHasConsent: () => {},
});

export const ConsentState = createContext<{
  enabled: boolean;
  hasConsent: boolean;
}>({
  enabled: false,
  hasConsent: false,
});
