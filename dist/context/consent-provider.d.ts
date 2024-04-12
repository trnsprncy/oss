import { PropsWithChildren } from "react";
import type { AnalyticsTags, NecessaryTags } from "../types";
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
export default function CookieConsentProvider(props: PropsWithChildren<CookieConsentProviderProps>): import("react/jsx-runtime").JSX.Element;
export {};
/**
 * @TODO:
 * Add 3rd party tag support (use generics to support unknown tags, but still keep type-safety)
 */
