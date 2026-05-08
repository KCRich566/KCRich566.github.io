import Seo from "../seo/Seo";
import ImageConverterTool from "../tools/ImageConverterTool";
import EdgeDetectorTool from "../tools/EdgeDetectorTool";
import { i18n } from "../i18n";

export default function ToolsPage({ locale }) {
  const t = i18n[locale];
  return (
    <>
      <Seo
        locale={locale}
        title={t.tools}
        description={t.toolsDesc}
        path={`/${locale}/tools`}
      />
      <section>
        <h1>{t.tools}</h1>
        <p>{t.toolsDesc}</p>
      </section>
      <ImageConverterTool locale={locale} />
      <EdgeDetectorTool locale={locale} />
    </>
  );
}
