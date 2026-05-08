// App.jsx
// Main application component: defines routing structure and 
// renders page components based on URL paths.

import { Navigate, Route, Routes, useParams } from "react-router-dom";
// The `blogs` and `portfolios` arrays are imported from `./lib/content.js`.
// These arrays contain the parsed content of the markdown files located in the
// `content/blogs` and `content/portfolios` directories, respectively.
import { blogs, portfolios } from "./lib/content";
import { normalizeLocale } from "./i18n";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function LocaleApp() {
  // useParams is a React Router hook 
  // that returns an object of key/value pairs of the dynamic params 
  // from the current URL that were matched by the <Route path>.
  const { locale: rawLocale = "en" } = useParams();
  // normalizeLocale is a function that takes a raw locale string 
  // and returns a normalized version of it.
  // For example, it might convert "en-US" to "en" or "zh-CN" to "zh".
  const locale = normalizeLocale(rawLocale);
  // x.locale is the locale property of each blog or portfolio item.
  // it defines which locale the item belongs to.
  const blogItems = blogs.filter((x) => x.locale === locale);
  const portfolioItems = portfolios.filter((x) => x.locale === locale);

  return (

    <SiteLayout locale={locale}>
      <Routes>
        <Route path="" element={<HomePage locale={locale} />} />
        <Route path="resume" element={<ResumePage locale={locale} />} />
        <Route path="blog" element={<ListPage locale={locale} type="blog" items={blogItems} />} />
        <Route path="portfolio" element={<ListPage locale={locale} type="portfolio" items={portfolioItems} />} />
        <Route path="blog/:slug" element={<DetailPage locale={locale} type="blog" list={blogs} />} />
        <Route path="portfolio/:slug" element={<DetailPage locale={locale} type="portfolio" list={portfolios} />} />
        <Route path="*" element={<Navigate to={`/${locale}`} replace />} />
      </Routes>
    </SiteLayout>
  );
}

// export default means the default export of this module is the App function.
// same as 
// ```js
// export App
// ``` 
export default function App() {
  return (
    // if path is exactly "/", redirect to "/en" (default locale)
    // if path is "/:locale/*", render LocaleApp which handles all locale-specific routes
    // if path doesn't match any of the above, redirect to "/en"
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:locale/*" element={<LocaleApp />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
