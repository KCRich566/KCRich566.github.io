# 多語言項目使用指南

## 🌍 快速開始

### 項目結構概覽

```
your-site/
├── _config.yml                 # ← 現在包含完整的多語言配置
├── index.html                  # 根目錄重定向到 /en/
├── _data/
│   ├── en.yml                  # 英文翻譯字典
│   └── zh.yml                  # 中文翻譯字典
├── _includes/
│   ├── header.html             # ← 改進後簡化的導航
│   └── footer.html
├── _layouts/
│   ├── default.html
│   ├── blog.html
│   └── portfolio.html          # 使用 page.language 過濾
├── en/                         # 英文頁面
│   ├── index.html
│   ├── blog.html
│   ├── portfolio.html
│   └── resume.html
├── zh/                         # 中文頁面
│   ├── index.html
│   ├── blog.html
│   ├── portfolio.html
│   └── resume.html
├── _blogs/
│   ├── en/
│   │   ├── 2024-01-01-post.md
│   │   └── ...
│   └── zh/
│       ├── 2024-01-01-post.md
│       └── ...
└── _portfolios/
    ├── en/
    │   ├── 2024-01-01-project.md
    │   └── ...
    └── zh/
        ├── 2024-01-01-project.md
        └── ...
```

## ✏️ 添加新內容

### 1️⃣ 添加新頁面（英文）

**位置**: `en/your-page.html`

```html
---
layout: default
title: "Your Page Title"
---

<div class="container">
  <!-- Your content -->
</div>
```

**注意**: 
- 不需要添加 `language: en`，會自動由 `_config.yml` 設置
- Jekyll 會自動應用到 `/en/your-page/` 路由

### 2️⃣ 添加新頁面（中文）

**位置**: `zh/your-page.html`

```html
---
layout: default
title: "您的頁面標題"
---

<div class="container">
  <!-- Your content -->
</div>
```

**自動配置**:
- `language: zh` 會自動設置
- 路由: `/zh/your-page/`
- 多語言導航會自動添加此頁面

### 3️⃣ 添加新部落格文章

#### 英文版本

**位置**: `_blogs/en/2024-01-15-article-title.md`

```markdown
---
layout: blog
title: "Article Title"
excerpt: "Brief summary..."
date: 2024-01-15
---

# Article Title

Your content here...
```

#### 對應的中文版本

**位置**: `_blogs/zh/2024-01-15-article-title.md`

```markdown
---
layout: blog
title: "文章標題"
excerpt: "簡短摘要..."
date: 2024-01-15
---

# 文章標題

您的內容在這裡...
```

**自動化**:
- 語言會由路徑自動設置
- `/blog.html` 會根據 `page.language` 自動選擇顯示哪個版本

### 4️⃣ 使用翻譯字典

在任何模板中，使用統一的多語言方式：

```liquid
{% assign lang = page.language | default: site.default_language %}
{% assign lang_data = site.data[lang] %}

<!-- 使用翻譯 -->
<a class="btn btn-primary">{{ lang_data.read_more }}</a>
<p class="footer">© 2024 {{ site.title }}. {{ lang_data.copyright }}</p>
```

## 📝 添加新的翻譯字符串

### 修改 `_data/en.yml`

```yaml
home: "Home"
resume: "Resume"
blog: "Blog"
portfolio: "Portfolio"

# 新增翻譯
my_new_string: "My new translation"
```

### 修改 `_data/zh.yml`

```yaml
home: "首頁"
resume: "履歷"
blog: "部落格"
portfolio: "作品集"

# 新增翻譯
my_new_string: "我的新翻譯"
```

### 在模板中使用

```liquid
{% assign lang = page.language | default: site.default_language %}
{{ site.data[lang].my_new_string }}
```

## 🔄 語言切換工作原理

### 用戶操作流程

1. 用戶在任何頁面選擇語言
2. JavaScript 檢測當前語言代碼
3. 替換路徑中的語言代碼
4. 保留查詢參數和錨點
5. 導航到新 URL

### 示例

```
當前: /en/blog.html?page=2#section
切換到: 中文
結果: /zh/blog.html?page=2#section
```

## 🎯 常見場景

### 場景 1: 添加全站都需要的新菜單項

1. 在 `en/` 中創建 `services.html`
2. 在 `zh/` 中創建 `services.html`
3. 在 `_data/en.yml` 中添加 `services: "Services"`
4. 在 `_data/zh.yml` 中添加 `services: "服務"`
5. 在 `_includes/header.html` 中添加菜單項
6. **完成** - header 會自動顯示正確的語言和導航

### 場景 2: 部落格文章只有英文版本

```html
# en/blog.html
{% assign blogs = site.blogs | where: "language", page.language %}

# 如果 /zh/blog.html 訪問，只會顯示中文文章
# 英文文章不會出現
```

### 場景 3: 添加新語言（例如日語）

1. 在 `_config.yml` 中修改 defaults：
```yaml
- scope:
    path: "ja/**"
    type: "pages"
  values:
    language: "ja"
```

2. 創建 `_data/ja.yml` 翻譯文件

3. 創建 `ja/` 目錄並添加頁面

4. 在 header.html 中添加日語選項

## 🚀 最佳實踐

### ✅ DO 的

- ✅ 為了保持一致性，始終同時創建英文和中文版本
- ✅ 在 `_data/*.yml` 中保持翻譯鍵的一致性
- ✅ 使用 assign 變數來避免代碼重複
- ✅ 定期檢查缺少的翻譯

### ❌ DON'T 的

- ❌ 不要手動在 frontmatter 中添加 `language`（讓 defaults 自動設置）
- ❌ 不要在根目錄添加內容頁面（應該像是 `/en/page` 或 `/zh/page`）
- ❌ 不要在 header.html 中添加 if/elsif 條件判斷（應該使用 assign + data）
- ❌ 不要忘記同時更新兩種語言的翻譯

## 🔍 調試技巧

### 檢查 Frontmatter 設置

在任何頁面的液體模板中添加：

```liquid
<!-- Debug Info -->
<!-- Language: {{ page.language }} -->
<!-- Default Language: {{ site.default_language }} -->
<!-- Available Languages: {{ site.languages }} -->
```

### 檢查數據加載

```liquid
<!-- Check if data is loaded -->
<!-- EN Data Keys: {{ site.data.en | keys | join: ", " }} -->
<!-- ZH Data Keys: {{ site.data.zh | keys | join: ", " }} -->
```

## 📖 進階配置

### 自訂收藏 (Collections) 的多語言支持

在 `_config.yml` 中：

```yaml
collections:
  my_collection:
    output: true
    permalink: /:collection/:path

defaults:
  - scope:
      path: "_my_collection/en/**"
      type: "my_collection"
    values:
      language: "en"
  - scope:
      path: "_my_collection/zh/**"
      type: "my_collection"
    values:
      language: "zh"
```

### 自訂導航邏輯

在 `_includes/header.html` 中可以進一步自訂：

```liquid
{% assign lang = page.language | default: site.default_language %}
{% assign nav_items = site.data[lang].nav %}

{% for item in nav_items %}
  <a href="{{ item.url }}">{{ item.label }}</a>
{% endfor %}
```

## 💡 提示

1. **本地測試**: 使用 `bundle exec jekyll serve` 測試多語言功能
2. **路徑一致性**: 確保英文和中文頁面有相同的結構
3. **SEO**: 為不同語言版本添加適當的 SEO 元標籤
4. **性能**: 考慮為靜態資源使用通用的 `/assets/` 路徑

---

**需要幫助？** 查看 [IMPROVEMENTS.md](IMPROVEMENTS.md) 瞭解技術細節。
