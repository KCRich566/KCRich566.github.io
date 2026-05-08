# KCRich566.github.io (Vite + React)

這個網站已改為 `Vite + React`，保留原本內容資料來源：

- `_blogs/**.md`：文章內容
- `_portfolios/**.md`：作品內容
- `_data/en.yml`、`_data/zh.yml`：多語系文字

## 本地開發

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
npm run preview
```

## GitHub Pages 設定方式

本專案已提供 `/.github/workflows/deploy-pages.yml`，使用 GitHub Actions 自動部署。

1. 到 GitHub Repo 的 `Settings` -> `Pages`
2. 在 `Build and deployment` 選 `Source: GitHub Actions`
3. Push 到 `main` 後，Actions 會自動 build 並部署 `dist`
4. 成功後，Pages URL 會顯示在 Actions 與 Pages 頁面

## 注意事項

- 目前路由採用 `HashRouter`，可避免 GitHub Pages 重新整理時 404 問題。
- `vite.config.js` 的 `base` 設為 `/`，適合 `username.github.io` 類型的 User Site。
- 若改成 Project Site（例如 `my-repo`），請把 `base` 改為 `/my-repo/`。