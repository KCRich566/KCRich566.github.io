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
  // This function takes a raw markdown string and extracts the frontmatter (YAML metadata)
  // and the content. It uses a regular expression to match the frontmatter section, which is
  // delimited by `---` lines. If a match is found, it parses the YAML frontmatter using
  // yaml.load and returns an object with the data and content. If no match is found, it
  // returns an empty data object and the original raw string as content.
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return {
    // 因為match[0]是整個匹配的字符串，而match[1]才是我們想要的前面那段YAML內容。
    data: yaml.load(match[1]) || {},
    content: match[2] || "",
  };
}

// Slug is a URL-friendly string that identifies a resource, 
// usually derived from the title of the resource.
// For example, a blog post titled "My First Blog Post" might have a slug of "my-first-blog-post". 
// 中文叫做「網址別名」或「友好網址」，它是一種用於識別資源的 URL 友好字符串，通常由資源的標題派生而來。
// 例如，一篇標題為「我的第一篇部落格文章」的部落格文章可能會有一個 slug 為「my-first-blog-post」。
// slug 通常用於構建網站的 URL，使其更易讀和 SEO 友好。
function toSlug(fileName) {
  // 這個函式的作用是將文件名轉換為一個 URL 友好的 slug
  // 首先，它會移除文件名前面的日期部分（如果有的話），例如 "2024-01-01-my-blog-post.md" 會變成 "my-blog-post.md"。
  // 然後，它會移除文件名後面的 ".md" 擴展名，變成 "my-blog-post"。
  // 接著，它會將所有字母轉換為小寫，並將非字母數字和非中文字符的部分替換為連字符（-）。
  // 最後，它會移除開頭和結尾的連字符，確保 slug 不會以連字符開頭或結尾。
  return fileName
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// normalizeItems is a function that takes a file map (an object where keys are file paths 
// and values are raw file contents)
// and a type (either "blog" or "portfolio"), 
// and returns an array of parsed items with their metadata and content, sorted by date.

function normalizeItems(fileMap, type) {
  // Object.entries(fileMap) converts the fileMap object into an array of [key, value] pairs,
  // where each key is a file path and each value is the raw content of the file.
  return Object.entries(fileMap)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const locale = path.includes("/en/") ? "en" : "zh";
      // pop() is a method that removes the last element from an array and returns it.
      const fileName = path.split("/").pop();
      const slug = data.slug || toSlug(fileName);
      return {
        type,
        locale,
        slug,
        path,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toLocaleDateString()  : data.date || "",
        description: data.description || "",
        featured: !!data.featured,
        tool: data.tool || null,
        // excerpt is the first 180 characters of the content, used for preview or summary.
        // don't insert HTML tags in the excerpt.
        excerpt: content.trim().slice(0, 180),
        html: marked.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const blogs = normalizeItems(blogFiles, "blog");
export const portfolios = normalizeItems(portfolioFiles, "portfolio");
