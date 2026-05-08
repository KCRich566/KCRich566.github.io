// 為什麼不放在lib裡? 因為lib是可重用的工具函式庫，i18n.js則是專門處理國際化相關的內容，
// 與應用程式的其他部分緊密相關，因此放在src根目錄下更合適。

export const i18n = {
  zh: {
    home: "首頁",
    resume: "履歷",
    blog: "部落格",
    portfolio: "作品集",
    tools: "工具",
    language: "語言",
    readMore: "繼續閱讀",
    noItems: "目前沒有資料。",
    homeDesc:
      "KCRich566 的軟體工程作品集，聚焦機器視覺、自動化、網頁應用與工程工具。",
    toolsDesc: "包含線上圖片轉檔與邊緣偵測工具，全部在瀏覽器本機執行。",
  },
  en: {
    home: "Home",
    resume: "Resume",
    blog: "Blog",
    portfolio: "Portfolio",
    tools: "Tools",
    language: "Language",
    readMore: "Read more",
    noItems: "No items found.",
    homeDesc:
      "Software engineering portfolio focused on machine vision, automation, web applications, and practical tools.",
    toolsDesc:
      "Includes image converter and edge detector, both processed locally in your browser.",
  },
};

export function normalizeLocale(locale) {
  return locale === "en" ? "en" : "zh";
}
