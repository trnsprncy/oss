import { NonEssentialTags, EssentialTags } from "../types";

type TagDetails = {
  [key in EssentialTags | NonEssentialTags]: {
    label: string;
    description: string;
  };
};

export const tagDetails: TagDetails = {
  security_storage: {
    label: 'Security Related Cookies',
    description: 'Cookies essential for securely authenticating users.',
  },
  functionality_storage: {
    label: 'Functionality Related Cookies',
    description: 'Cookies for measuring and improving site performance.',
  },
  personalization_storage: {
    label: 'Personalization Related Cookies',
    description: 'Cookies for enhanced functionality and personalization.',
  },
};

export const categoryDescriptions = {
  essential: 'These cookies are essential for the website to function',
  analytics: 'These cookies help us to improve your experience on our website',
};