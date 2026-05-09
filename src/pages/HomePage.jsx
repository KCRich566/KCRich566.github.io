import { Link } from "react-router-dom"
import Seo from "../seo/Seo";
import { i18n } from "../i18n";
import { portfolios, blogs } from "../lib/content";

const content = {
  en: {
    greeting: "Hi, I'm KCRich566",
    tagline: "Software Engineer specializing in computer vision, deep learning, automation, and software development.",
    resumeCta: "View Resume",
    blogCta: "Read Blog",
    portfolioCta: "Explore Portfolio",
    featured: "Featured Projects",
    featuredBlog: "Featured Blog Posts",
  },
  zh: {
    greeting: "你好, 我是KCRich566",
    tagline: "專注於機器視覺、深度學習、自動化與軟體開發的軟體工程師。",
    resumeCta: "查看履歷",
    blogCta: "瀏覽部落格",
    portfolioCta: "瀏覽作品集",
    featured: "精選專案",
    featuredBlog: "精選部落格"
  },
};

export default function HomePage({ locale }) {
  const t = i18n[locale];
  const c = content[locale];
  // slice(0, 3) is used to get the first 3 items from the filtered array.
  const featured = portfolios.filter((x) => x.locale === locale && x.featured).slice(0, 3);
  const featuredBlogs = blogs.filter((x) => x.locale === locale && x.featured).slice(0, 3);
  return (
    <>
    
      <Seo locale={locale} title={t.home} description={t.homeDesc} path={`/${locale}`} />
      <section className="hero">
        <h1>{c.greeting}</h1>
        <p className="tagline">{c.tagline}</p>
        <div className="cta-group">
          <Link to={`/${locale}/resume`} className="btn">{c.resumeCta}</Link>
          <Link to={`/${locale}/blog`} className="btn">{c.blogCta}</Link>
          <Link to={`/${locale}/portfolio`} className="btn btn-secondary">{c.portfolioCta}</Link>
        </div>
      </section>

      <section>
        <h2>{c.featured}</h2>
        <div className="cards">
          {featured.map((item) => (
            <article className="card" key={item.slug}>
              <h3>{item.title}</h3>
              <small>{item.date}</small>
              <p>{item.description || item.excerpt}</p>
              <Link to={`/${locale}/portfolio/${item.slug}`}>{t.readMore}</Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{c.featuredBlog}</h2>
        <div className="cards">
          {featuredBlogs.map((item) => (
            <article className="card" key={item.slug}>
              <h3>{item.title}</h3>
              <small>{item.date}</small>
              <p>{item.description || item.excerpt}</p>
              <Link to={`/${locale}/blog/${item.slug}`}>{t.readMore}</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
