import { setCookie } from "cookies-next";
import { cookieExpiry } from "./constants";
import { AnalyticsTags, ConsentResult, NecessaryTags } from "../types";

// Each of these utils are used by the consent manager component

/**
 * GTM expected consent format is an enum of 'granted' or 'denied'
 * This is a helper function to get the consent value based on the condition
 *
 * @export
 * @param condition {boolean}
 * @return "granted" | "denied"
 */
export function getConsent(condition: boolean) {
  return condition ? "granted" : "denied";
}

/**
 * Creates a consent object based on the cookies
 * This will add each cookie and its consent value to the app-consent cookie
 *
 * @export
 * @param {ConsentResult} cookies
 * @param {string} appCookie
 * @param {number} [customExpiry]
 * @return void {*}
 */
export function setConsentCookies(
  cookies: ConsentResult,
  appCookie: string,
  customExpiry?: number
) {
  if (typeof window !== "undefined") {
    setCookie(appCookie, JSON.stringify(cookies), {
      maxAge: customExpiry ?? cookieExpiry,
    });
  }
}

/**
 * Compare the necessary tags with the analytics tags
 * This will return an object where the necessary tags as keys
 * are all "granted" and the rest are "denied"
 *
 * @export
 * @param  {string[]} necessaryTags
 * @param  {string[]} analyticsTags
 * @return ConsentResult {*}
 *
 */
export function getInitialPermissions(
  necessaryTags: string[],
  analyticsTags: string[]
): ConsentResult {
  const consentResult = {} as ConsentResult;

  for (const tag of [...necessaryTags, ...analyticsTags]) {
    consentResult[tag as keyof ConsentResult] = necessaryTags.includes(tag)
      ? "granted"
      : "denied";
  }

  return consentResult;
}
