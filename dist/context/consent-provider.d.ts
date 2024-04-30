import React, { PropsWithChildren } from "react";
import type { Tag } from "../types";
type TrnsprncyProviderProps = PropsWithChildren<{
    consentCookie?: string;
    essentialTags: Tag[];
    nonEssentialTags?: Tag[];
    enabled?: boolean;
    expiry?: number;
    redact?: boolean;
    dataLayerName?: string;
    gtagName?: string;
    banner?: React.ReactNode;
}>;
/**
 * @export
 * @param {PropsWithChildren<TrnsprncyProviderProps>} {
 *   consentCookie: string, essentialTags: NonEmptyArray<Tag>, nonEssentialTags: Tag[], enabled: boolean, expiry: number, redact: boolean, dataLayerName: string, gtagName: string, children: React.ReactNode
 * }
 * @return {*} {React.ReactNode}
 */
export default function TrnsprncyProvider({ consentCookie, // the name of the cookie that stores the user's consent
essentialTags, nonEssentialTags, enabled, expiry, redact, dataLayerName, gtagName, banner, children, }: TrnsprncyProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
/**
 * @TODO:
 * Add 3rd party tag support (use generics to support unknown tags, but still keep type-safety)
 */
