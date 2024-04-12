import { createContext } from "react";
export var ConsentManager = createContext(undefined);
export var ConsentDispatch = createContext({
    handleConsentUpdate: function () { },
    sendGTMEvent: function () { },
    setHasConsent: function () { },
});
export var ConsentState = createContext({
    enabled: false,
    hasConsent: false,
});
