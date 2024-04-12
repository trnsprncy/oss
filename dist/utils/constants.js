// Consent mgr constants
export var CONSENT_COOKIE_NAME = "app-consent";
export var DATA_LAYER = "dataLayer";
export var TAG_MANAGER_KEY = "gtag";
export var redactionCookie = "ads_data_redaction";
export var cookieExpiry = 60 * 60 * 24 * 7; // Set expiration (1 week)
// Consent categories
export var NECESSARY_TAGS = [
    "security_storage",
    "functionality_storage",
    "personalization_storage",
];
export var ANALYTICS_TAGS = [
    "ad_storage",
    "analytics_storage",
    "ad_personalization",
    "ad_user_data",
];
