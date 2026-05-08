// content.js is responsible for loading 
// and parsing the content files (blogs and portfolios) 
// and providing them as JavaScript objects that can be used in the application. 
// It also loads the dictionary files for internationalization.

// yaml is a library for parsing YAML files, 
// which are used for the dictionary and frontmatter.
// like
// ```yaml
// title: My Blog Post
// date: 2024-01-01
// description: This is a blog post about my project.
// featured: true
// ```
import yaml from "js-yaml";
// marked is a library for parsing markdown content into HTML.
import { marked } from "marked";

// The `?raw` query parameter tells Vite to import the file as a raw string,
// instead of trying to process it as a module.
// those files are located in the `content/data` directory 
// and contain the translations for the application.
import enRaw from "../../content/data/en.yml?raw";
import zhRaw from "../../content/data/zh.yml?raw";

// 目前是為了在SiteLayout裡切換語言時能夠顯示正確的文字，
// 例如語言選擇器的標籤和選項，以及頁面導航的文字等。
export const dictionary = {
  en: yaml.load(enRaw),
  zh: yaml.load(zhRaw),
};

// import.meta.glob is a Vite-specific feature that allows you to import multiple files
const blogFiles = import.meta.glob("../../content/blogs/**/*.md", {
  // eager: true means the files will be imported immediately,
  eager: true,
  // query: "?raw" means the content of the files will be imported as raw strings,
  query: "?raw",
  // import: "default" means we want to import the default export of the files,
  import: "default",
});

const portfolioFiles = import.meta.glob("../../content/portfolios/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return {
    data: yaml.load(match[1]) || {},
    content: match[2] || "",
  };
}

function toSlug(fileName) {
  return fileName
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeItems(fileMap, type) {
  return Object.entries(fileMap)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const locale = path.includes("/en/") ? "en" : "zh";
      const fileName = path.split("/").pop();
      const slug = data.slug || toSlug(fileName);
      return {
        type,
        locale,
        slug,
        path,
        title: data.title || slug,
        date: data.date || "",
        description: data.description || "",
        featured: !!data.featured,
        tool: data.tool || null,
        excerpt: content.trim().slice(0, 180),
        html: marked.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const blogs = normalizeItems(blogFiles, "blog");
export const portfolios = normalizeItems(portfolioFiles, "portfolio");
