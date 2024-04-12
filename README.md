# Trnsprncy
Consent Manager for Next.js v14. (App Router Only)

---

## What is Trnsprncy

Very simply trnsprncy is the easiest way to configure and manage Google Tag Manager's [Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced) in Next.js applications that use the App Router. We handle all the functionality internally and expose a provider which you can wrap around your consent banner. You can also use our exposed utiltiy functions to help manage the consent across your application. 

![trnsprncy-bg](./transparency-bg.jpg)

## This tool is currently in pre-release Beta

Due to my own lack of familiarity with managing packages via npm, I will be moving slowing and attempting not to break things. Also this package depends on the experimental `@next/third-parties/google` which was made as a collaboration between Google and the Next.js team. The package uses the built-in Next.js Script component to  optimize the loading of the standard Google Tag Manager script. The package uses a service worker to handle your GTM events giving us a very effective way of using Google Tag Manage and mitigating all previously existing perfomance issues caused by the script. 

Because of this methodology this is safe to use in your projects today, but I could really use your feedback on how to make this package better and ensure that it does in fact meet your needs and comply with GTM's consent mode v2 policies and standards. For the near future please know that the only breaking change you should expect is the path we use to import the CookieConsentProvider into our applications. 



## Requirements

- [ ] Next.js v14.1 +
- [ ] App Directory



## Dependencies

- [ ] cookies-next
- [ ] @next/third-parties



> ## Disclaimer
>
> We are NPM novices to put it lightly, this is the first package any of us have ever released ourselves. So if there are any issues we'd love if you could create an issue, and are open to pull requests and any other feedback or expertise you might have to share. 
>
> We hope you have a great experience with the thought we've put into providing the right balance between configuration and customization. Allowing access to all of the google specific features while abstracting away some of the complexity. 
>
> Thank you so much for trying trnsprncy



## Installation

```bash
npm install @trnsprncy/os
```



## Usage

```tsx
// app/layout.tsx


import { CookieConsentProvider } from '@trnsprncy/os';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
        
          <CookieConsentProvider
          consentCookie="app-consent"
          necessaryTags={[
            "functionality_storage",
            "personalization_storage",
          ]}
        >
          <Banner/>
        </CookieConsentProvider>

      </body>
    </html>
  );
}
```



## Props

| Name          | Default         | required | Description                                                  |
| ------------- | --------------- | -------- | ------------------------------------------------------------ |
| consentCookie | `'app-consent'` | **no**   | key name of the cookie used to manage user's consent         |
| necessaryTags | `undefined`     | **yes**  | array of google consent tags for personalization and functionality storage consent |
| analyticsTags | `undefined`     | **no**   | array of google consent tags for ads, analytics and monitoring related storage consent. |
| enabled       | `true`          | **no**   | globally enable or disable the `CookieConsentProvider`       |
| redact        | `true`          | **no**   | adds the global `'ads_data_redaction'` consent which redacts all sensitive user related data from the tracking data. |
| dataLayerName | 'dataLayer'     | **no**   | sets the name used for the dataLayer object added by google tag manager to the user's window object. |
| gtagName      | 'gtag'          | **no**   | sets the name used for the gtag function that is used to handle the user's google-tag-manager consent. |



## Roadmap

- [x] Fix: build module issue.
- [ ] Add support for 3rd party/custom const tags.