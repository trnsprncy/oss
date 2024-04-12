import React, { useContext } from "react";
import {
  ConsentState,
  ConsentManager,
  ConsentDispatch,
} from "../context/consent-context";

export function useConsent() {
  const context = useContext(ConsentManager);
  if (context === undefined) {
    throw new Error(
      "useGoogleTagManager must be used within a GoogleTagManagerProvider"
    );
  }
  return context;
}

export function useConsentDispatch() {
  const context = useContext(ConsentDispatch);
  if (context === undefined) {
    throw new Error(
      "useGoogleTagManagerDispatch must be used within a GoogleTagManagerProvider"
    );
  }
  return context;
}

export function useConsentState() {
  const context = useContext(ConsentState);
  if (context === undefined) {
    throw new Error(
      "useGoogleTagManagerConsent must be used within a GoogleTagManagerProvider"
    );
  }
  return context;
}
