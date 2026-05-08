import { Navigate, useParams } from "react-router-dom";
import Seo from "../seo/Seo";
import ImageConverterTool from "../tools/ImageConverterTool";
import EdgeDetectorTool from "../tools/EdgeDetectorTool";

const toolComponents = {
  "image-converter": ImageConverterTool,
  "edge-detector": EdgeDetectorTool,
};

export default function DetailPage({ locale, type, list }) {
  const { slug = "" } = useParams();
  const item = list.find((x) => x.locale === locale && x.slug === slug);
  if (!item) return <Navigate to={`/${locale}/${type}`} replace />;

  const ToolComponent = item.tool ? toolComponents[item.tool] : null;

  return (
    <>
      <Seo
        locale={locale}
        title={item.title}
        description={item.description || item.excerpt}
        path={`/${locale}/${type}/${item.slug}`}
        type="article"
      />
      <article className="detail">
        <h1>{item.title}</h1>
        <small>{item.date}</small>
        {ToolComponent && <ToolComponent locale={locale} />}
        <div dangerouslySetInnerHTML={{ __html: item.html }} />
      </article>
    </>
  );
}
