export declare function useConsent(): {
    consentCookie: string;
    tags: import("../types").EssentialAnalyticsTagsTupleArrays;
    hasConsent: boolean;
};
export declare function useConsentDispatch(): {
    handleConsentUpdate: (consentUpdate: Partial<import("../types").BrowserCookies>) => void;
    sendGTMEvent: (event: string, data: Record<string, string>) => void;
    setHasConsent: (hasConsent: boolean) => void;
};
export declare function useConsentState(): {
    enabled: boolean;
    hasConsent: boolean;
};
