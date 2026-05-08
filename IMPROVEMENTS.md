# 項目改進記錄

## 改進總結

本次改進將多語言系統從不規範的實現方式升級為 Jekyll 的標準最佳實踐。

### ✅ 已完成的改進

#### 1. **_config.yml 配置改進**
- ✅ 添加 `defaults` 配置，自動為文件設置 frontmatter
  - `/en/**` 段中的頁面自動設置 `language: en`
  - `/zh/**` 段中的頁面自動設置 `language: zh`
  - 適用於 pages、blogs 和 portfolios collections
- ✅ 新增 `languages` 字典，定義支持的語言
- ✅ 新增 `default_language: "en"`，設定默認語言

**好處**: 
- 無需在每個新文件手動設置 language frontmatter
- 更易於擴展到新的語言

#### 2. **header.html 模板簡化**
- ✅ **消除代碼重複** - 從4倍重複的 if/elsif 結構減少到單一 assign
  ```liquid
  {% assign lang = page.language | default: site.default_language %}
  {% assign lang_data = site.data[lang] %}
  ```
- ✅ 所有導航項目現在使用統一的 `{{ lang_data.xxx }}` 語法
- ✅ 改進語言切換器的標籤文字

**改進前後比較**:
```
改進前: ~20 行重複的條件判斷碼
改進後: 2 行 assign + 簡潔的模板使用
```

#### 3. **語言切換 JavaScript 重寫**
- ✅ 新增 `getCurrentLanguage()` 函數，正確檢測當前語言
  - 檢查路徑開頭的語言代碼（如 `/en/`、`/zh/`）
  - 合理的後備邏輯
- ✅ 改進 `switchLanguage()` 函數
  - 正確處理路徑替換邏輯
  - 保留查詢參數和錨點
  - 更強健的錯誤處理
- ✅ 新增 DOMContentLoaded 事件監聽器，確保切換器初始化

**修復的問題**:
- 原有邏輯在某些情況下會產生雙斜杠（//）
- 沒有保留查詢參數
- 缺失初始化邏輯

#### 4. **根目錄 index.html 改進**
- ✅ 更改 layout 為 `null`，避免不必要的 Jekyll 處理
- ✅ 改進重定向註釋
- ✅ 添加中文/英文雙語提示

#### 5. **頁面 Frontmatter 簡化**
- ✅ 移除了所有 `/en/` 和 `/zh/` 下的文件中的 `language` frontmatter
  - `index.html`, `blog.html`, `portfolio.html`, `resume.html`
  - 這些現在由 `_config.yml` 的 defaults 自動設置

- ✅ 修正拼寫錯誤: "Profolio" → "Portfolio" (en/portfolio.html)

#### 6. **翻譯字典 (_data) 擴展**
- ✅ 添加常用的多語言字符串
  - `read_more`: 閱讀更多按鈕
  - `no_items`: 空列表提示
  - `language`: 語言標籤
  - `copyright`: 版權文字
  - `title_xxx`: 頁面標題備選

## 🏗️ 推薦後續改進

### 1. **updateLayout 的 404 和特殊頁面**
```
_layouts/404.html - 支持雙語錯誤頁面
```

### 2. **SEO 優化**
- 在 `default.html` 中添加 hreflang 標籤，幫助搜索引擎識別多語言
  ```html
  <link rel="alternate" hreflang="en" href="https://example.com/en/" />
  <link rel="alternate" hreflang="zh" href="https://example.com/zh/" />
  ```

### 3. **完全自動化的多語言頁面創建**
- 考慮使用 Jekyll 插件自動生成中文/英文的對應頁面

### 4. **i18n 插件**
- 考慮使用 `jekyll-i18n` 或 `jekyll-polyglot` 等專業插件

### 5. **語言切換器的 Cookie/LocalStorage**
- 添加用戶選擇偏好的持久化存儲

## 📋 測試清單

- [ ] 從 `/` 重定向到 `/en/`
- [ ] 在 `/en/` 上選擇中文，導航到 `/zh/`
- [ ] 在 `/zh/blog.html` 上選擇英文，導航到 `/en/blog.html`
- [ ] 驗證所有導航菜單都顯示正確的文字
- [ ] 驗證部落格和作品集頁面顯示正確的語言內容
- [ ] 檢查不同頁面上查詢參數是否保留
- [ ] 在舊瀏覽器上測試重定向

## 技術細節

### Frontmatter Defaults 工作原理

```yaml
defaults:
  - scope:
      path: "en/**"      # 匹配路徑
      type: "pages"      # 頁面類型
    values:
      language: "en"     # 要設置的默認值
```

Jekyll 會自動為匹配的文件設置這些值，除非文件的 frontmatter 中已經定義了這些值。

### 語言檢測邏輯

```javascript
// 現有實現足以滿足當前需求
// 1. 檢查 /en/ 前綴
// 2. 檢查 /zh/ 前綴
// 3. 默認為 'en'
```

## 版本信息

- **更新日期**: 2026-05-05
- **Jekyll 版本**: 使用 kramdown、rouge 等標準配置
- **兼容性**: GitHub Pages 相容

---

**注意**: 所有改進都遵循 Jekyll 的官方最佳實踐，確保與 GitHub Pages 的完全兼容性。
