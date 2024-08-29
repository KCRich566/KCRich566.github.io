# KCRich566.github.io

GitHub Pages 本身使用 Jekyll 來生成靜態網站。

Jekyll 是一個靜態網站生成器，它使用 Liquid 模板語言來創建可重用的布局和部分

## Jekyll 的基本目錄結構
```
├── _config.yml
│   這個文件包含 Jekyll 站點的配置選項，比如站點的名稱、URL、插件和其他全域設置。
├── _data
│   用於存儲 YAML、JSON 或 CSV 文件，可以用於網站內容的動態生成。例如，導航菜單、站點作者信息等。
│   └── example.yml
├── _drafts
│   用於存儲草稿文章。這些文件不會被 Jekyll 自動發布，除非在本地使用 `jekyll serve --drafts` 命令。
│   ├── draft-post.md
├── _includes
│   存放可以在不同頁面和佈局中重複使用的代碼片段。常見文件有 `header.html` 和 `footer.html`。可以通過 `{% include header.html %}` 引用。
│   ├── header.html
│   ├── footer.html
├── _layouts
│   存放模板文件，這些模板決定了頁面的渲染方式。`default.html` 或 `base.html` 通常是基本佈局文件，其他佈局文件（如 `post.html`）可以繼承自此文件。
│   ├── default.html or base.html
│   ├── post.html
├── _pages
│   用於存放非博客文章的其他頁面，如 `about.md`、`contact.md` 等。這個文件夾不是 Jekyll 的預設文件夾，但可以根據需要創建。
│   └── about.md
├── _posts
│   存放博客文章。每個文件必須以日期命名（格式為：`YYYY-MM-DD-title.md`）。Jekyll 自動將這些文件轉換為 HTML 頁面並按日期排序。
│   ├── 2024-08-30-example-post.md
├── _sass
│   用於存放 Sass 部分文件（.scss），這些文件可以被主樣式文件引用以生成 CSS。
│   └── custom.scss
├── _site
│   Jekyll 構建生成的輸出目錄。這個目錄包含了所有生成的靜態網站文件。在部署時，_site 目錄的內容將被上傳到伺服器。通常在 `.gitignore` 中忽略該目錄。
├── assets
│   存放靜態資源文件，如圖片、JavaScript 文件和樣式表（CSS）。
│   ├── images
│   │   └── logo.jpg
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
├── index.html
│   網站的首頁。Jekyll 將這個文件作為根 URL 的入口頁面。
└── README.md

```