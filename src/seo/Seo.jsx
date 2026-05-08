import { Helmet } from "react-helmet-async";

const SITE_URL = "https://kcrich566.github.io";

export default function Seo({ title, description, path, locale = "zh", type = "website" }) {
  const canonical = `${SITE_URL}${path}`;
  const pageTitle = `${title} | KCRich566 Space`;

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KCRich566 Space",
    url: SITE_URL,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    description,
  };

  return (
    <Helmet>
      <html lang={locale === "zh" ? "zh-Hant" : "en"} />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="KCRich566 Space" />
      <meta property="og:image" content="{`${SITE_URL}/images/logo180.png`}" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/images/logo180.png`} />

      <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
    </Helmet>
  );
}
