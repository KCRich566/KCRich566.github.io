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
├── _i18n/: 如果要資源多語言，需要在此增加md檔案，但如果要使用html支援，則需要再跟目錄添加*.zh.html來操作
│   ├── en/
│   │   └── index.md
│   └── zh/
│       └── index.md
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


# 在Windows上運行Jekyll

1. 安装 Ruby

Jekyll 是一个用 Ruby 编写的静态网站生成器，因此首先需要安装 Ruby。

下载 RubyInstaller: 访问 RubyInstaller for Windows 网站，下载并安装 Ruby。选择带有 Devkit 的版本，这样会自动安装一些构建工具，这对一些 Ruby gems 是必需的。

运行安装程序: 执行下载的安装程序，并确保勾选了“Add Ruby executables to your PATH”和“Run 'ridk install'”选项。

`中途如有遇到安裝MSY32的問題可以選3`

完成安装: 完成安装后，打开命令提示符（cmd）或 PowerShell，并运行以下命令来确认 Ruby 是否已正确安装：

```shell
ruby -v
这将显示 Ruby 的版本信息。
```

2. 安装 Jekyll 和 Bundler

打开命令提示符或 PowerShell。

安装 Jekyll 和 Bundler: 运行以下命令来安装 Jekyll 和 Bundler（一个管理 Ruby gems 的工具）：

```shell
gem install jekyll bundler
```

3. 更新
```shell
gem update jekyll bundler
```

4. 啟動bundle伺服器

進入github io 的資料夾後需要安裝bundle

在安裝之前需要有GemFile的存在

```shell
bundle install
```

运行 Jekyll 服务器：

```shell
bundle exec jekyll serve
```