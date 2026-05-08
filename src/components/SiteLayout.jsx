import { Link, useLocation, useNavigate } from "react-router-dom";
import { i18n } from "../i18n";

export default function SiteLayout({ locale, children }) {
  const t = i18n[locale];
  const navigate = useNavigate();
  const location = useLocation();

  function switchLocale(nextLocale) {
    const parts = location.pathname.split("/");
    if (parts.length < 2) {
      navigate(`/${nextLocale}`);
      return;
    }
    parts[1] = nextLocale;
    navigate(parts.join("/"));
  }

  return (
    <div className="container">
      <header className="header">
        <Link to={`/$locale`} className="site-logo">
          <img src="/images/logo120.png" alt="Logo" width="40" height="40" />
          <h1>KCRich566 Space</h1>
        </Link>
        <div className="lang-box">
          <label htmlFor="lang-switch">{t.language}: </label>
          <select id="lang-switch" value={locale} onChange={(e) => switchLocale(e.target.value)}>
            <option value="zh">中文</option>
            <option value="en">EN</option>
          </select>
        </div>
      </header>
      <nav className="nav">
        <Link to={`/${locale}`}>{t.home}</Link>
        <Link to={`/${locale}/resume`}>{t.resume}</Link>
        <Link to={`/${locale}/blog`}>{t.blog}</Link>
        <Link to={`/${locale}/portfolio`}>{t.portfolio}</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
