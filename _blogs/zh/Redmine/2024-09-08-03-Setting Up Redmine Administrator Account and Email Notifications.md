---
layout: blog
title: "03-設定 Redmine 管理員帳戶與郵件通知"
date: 2024-09-09 09:56:00 +0800
language: zh
lang: zh
categories: Redmine
tags: Redmine
---

1. 設定 Admin 密碼

登入 Redmine

進入 Redmine 後，點擊右上角的「登入」選項。
使用預設 Admin 帳戶登入
```
帳號: admin
密碼: admin
```
系統強制修改密碼

Redmine 會要求您重新設定一組新的密碼。
完成密碼修改後

系統會自動跳轉到「我的帳戶」頁面。在此頁面，您可以更新相關資料。請確保將電子郵件地址修改為有效的信箱地址，因為這個地址將在後續的郵件配置中使用。

2. 設定郵件通知

修改 config/configuration.yml

Redmine 通常會提供一份範例檔案 configuration.yml.example。您只需複製並重新命名為 configuration.yml，然後根據以下內容進行修改：
```yaml
email_delivery:
  delivery_method: :smtp
  smtp_settings:
    address: "smtp.gmail.com"
    port: 587
    domain: "Redmine.com" # 這裡可以設為你的域名
    authentication: :plain
    user_name: <你的 Gmail 信箱>
    password: <你的 Gmail 密碼或應用專用密碼>
    enable_starttls_auto: true
```
因為我們使用 Google 作為 SMTP 的信箱，您需要將 Google 帳號設定為 2 步驟驗證，並使用 Google 的應用程式專用密碼。
重新啟動 Redmine 伺服器

完成設置後，請重新啟動 Redmine 伺服器以應用配置更改。

3. 測試郵件通知

進入電子郵件設定頁面

在 Redmine 的管理介面中，導航至「設定」>「電子郵件提醒」。
測試郵件發送

在頁面的最下方有一個「寄送測試郵件」選項。點擊它來檢查是否能成功發送郵件到您在「我的帳戶」中設定的電子郵件地址。
配置電子郵件提醒內容

在同一頁面中，您也可以設定電子郵件提醒的相關內容。
其他設定
Redmine 對使用者非常友善，其餘相關的設定只需依照系統的提示進行即可，本指南中未涉及的部分將不再詳述。