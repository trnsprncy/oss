import React from "react";
import type { BrowserCookies, NecessaryAnalyticsTagsTupleArrays } from "../types";
export declare const ConsentManager: React.Context<{
    consentCookie: string;
    tags: NecessaryAnalyticsTagsTupleArrays;
    hasConsent: boolean;
} | undefined>;
export declare const ConsentDispatch: React.Context<{
    handleConsentUpdate: (consentUpdate: Partial<BrowserCookies>) => void;
    sendGTMEvent: (event: string, data: Record<string, string>) => void;
    setHasConsent: (hasConsent: boolean) => void;
}>;
export declare const ConsentState: React.Context<{
    enabled: boolean;
    hasConsent: boolean;
}>;
