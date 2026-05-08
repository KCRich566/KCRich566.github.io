import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { i18n } from "../i18n";

export default function ListPage({ locale, type, items }) {
  const t = i18n[locale];
  const title = type === "blog" ? t.blog : t.portfolio;
  return (
    <>
      <Seo
        locale={locale}
        title={title}
        description={locale === "zh" ? `${title}列表` : `${title} list`}
        path={`/${locale}/${type}`}
      />
      <h1>{title}</h1>
      <div className="cards">
        {items.length === 0 ? <p>{t.noItems}</p> : null}
        {items.map((item) => (
          <article className="card" key={`${type}-${item.slug}`}>
            <h3>{item.title}</h3>
            <small>{item.date}</small>
            <p>{item.description || item.excerpt}</p>
            <Link to={`/${locale}/${type}/${item.slug}`}>{t.readMore}</Link>
          </article>
        ))}
      </div>
    </>
  );
}
