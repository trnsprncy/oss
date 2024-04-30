import { PropsWithChildren } from "react";
import type { NonEssentialTags, EssentialTags } from "../types";
type NotEmptyArray<T> = [T, ...T[]];
type TrnsprncyProviderProps = {
    consentCookie?: string;
    essentialTags?: NotEmptyArray<EssentialTags>;
    nonEssentialTags?: NonEssentialTags[];
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
 *   consentCookie: string, essentialTags: EssentialTags[], nonEssentialTags: NonEssentialTags[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, banner: React.ReactNode, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider(props: PropsWithChildren<TrnsprncyProviderProps>): import("react/jsx-runtime").JSX.Element;
export {};
/**
 * @TODO:
 * Add 3rd party tag support (use generics to support unknown tags, but still keep type-safety)
 */
