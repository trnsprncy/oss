/**
 * @SEE: Dashboard: https://tagassistant.google.com/
 * @SEE: https://gist.github.com/dobesv/0dba69925b8975e69b3392da46063db2
 * @SEE: https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced
 * Analytics package setups up tag manager on the window as 'google_tag_manager
 * not as 'gtag' as expected by the gtag function.
 * This function is a workaround to set up the gtag function on the window
 *
 * @param {string} method
 * @param {string} [event]
 * @param {Record<string, any>} [params]
 * @return {*}  {((..._args: any[]) => any)}
 */

export const gtagFn = (
  dataLayerName: string | undefined,
  gtagName: string | undefined
): ((..._args: any[]) => any) =>
  //@ts-ignore
  window[gtagName] ||
  // @ts-ignore
  (window[gtagName] = function () {
    //@ts-ignore
    (window[dataLayerName] || (window[dataLayerName] = [])).push(arguments);
  });
