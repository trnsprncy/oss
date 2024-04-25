import { PropsWithChildren } from "react";
import type { AnalyticsTags, EssentialTags } from "../types";
type NotEmptyArray<T> = [T, ...T[]];
type TrnsprncyProviderProps = {
    consentCookie?: string;
    essentialTags?: NotEmptyArray<EssentialTags>;
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
 * @param {PropsWithChildren<TrnsprncyProviderProps>} {
 *   consentCookie: string, essentialTags: EssentialTags[], analyticsTags: AnalyticsTags[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, banner: React.ReactNode, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider(props: PropsWithChildren<TrnsprncyProviderProps>): import("react/jsx-runtime").JSX.Element;
export {};
/**
 * @TODO:
 * Add 3rd party tag support (use generics to support unknown tags, but still keep type-safety)
 */
