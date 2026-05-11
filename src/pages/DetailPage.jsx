import { Navigate, useParams } from "react-router-dom";
import Seo from "../seo/Seo";
import ImageConverterTool from "../tools/ImageConverterTool";
import EdgeDetectorTool from "../tools/EdgeDetectorTool";
import AffineTransformTool from "../tools/AffineTransformTool";

const toolComponents = {
  "image-converter": ImageConverterTool,
  "edge-detector": EdgeDetectorTool,
  "affine-transform": AffineTransformTool
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
        {/* dangerouslySetInnerHTML is a React prop that allows you to set HTML content directly from a string. 
        It is considered dangerous because it can expose your application to cross-site scripting (XSS) attacks if the HTML content is not properly sanitized. 
        You should only use this prop with trusted content that you have control over. */}
        <div dangerouslySetInnerHTML={{ __html: item.html }} />
      </article>
    </>
  );
}
