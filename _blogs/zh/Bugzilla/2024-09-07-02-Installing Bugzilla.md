---
layout: blog
title: "02-安裝Bugzilla"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Bugzilla
---
在 Windows 上安裝 Bugzilla 可能會涉及一些額外步驟，因為它主要設計為在 Unix-like 系統上運行。不過，你可以按照以下步驟在 Windows 上進行安裝：

安裝步驟
1. 安裝 Strawberry Perl
下載並安裝 Strawberry Perl，它是 Windows 上的 Perl 發行版：Strawberry Perl
2. 安裝 MySQL
下載並安裝 MySQL Community Server：MySQL Community Server
記下 MySQL 的 root 密碼，這在後續配置中會用到。
3. 安裝 Apache
下載並安裝 Apache HTTP Server（選擇適用於 Windows 的版本）：Apache Lounge
配置 Apache，確保其正常運行。
4. 安裝 Bugzilla
從 Bugzilla 官網下載 Bugzilla 的源代碼：Bugzilla Downloads
解壓 Bugzilla 源代碼到一個目錄，例如 C:\bugzilla。
5. 配置 Bugzilla
打開命令提示字元（確保 Perl 的路徑已添加到系統環境變量中）。

導航到 Bugzilla 目錄，例如：

bash
複製程式碼
cd C:\bugzilla
運行以下命令安裝所需的 Perl 模組：

bash
複製程式碼
perl install-module.pl --all
運行 Bugzilla 的配置腳本：

bash
複製程式碼
perl checksetup.pl
該腳本會提示你輸入資料庫信息、管理員用戶信息等。按照提示輸入相應的信息。例如：

資料庫類型：mysql
資料庫名稱：bugzilla
資料庫用戶名：root
資料庫密碼：你的 MySQL 密碼
其他設定可以根據需要進行調整。
腳本運行結束後，檢查是否有任何錯誤，確保所有必要的資料庫表已創建。

6. 配置 Apache
編輯 Apache 的配置文件（通常是 httpd.conf），加入以下內容來設置 Bugzilla 的虛擬主機：

apache
複製程式碼
Alias /bugzilla "C:/bugzilla"
<Directory "C:/bugzilla">
    AllowOverride All
    Require all granted
</Directory>
重新啟動 Apache 服務以應用配置。

7. 訪問 Bugzilla
打開瀏覽器，訪問 http://localhost/bugzilla。
如果配置正確，你應該會看到 Bugzilla 的界面。
注意事項
確保 Apache 和 MySQL 服務正在運行。
檢查防火牆設定，確保 Web 伺服器允許 HTTP 請求。
在 Windows 上運行 Bugzilla 可能會遇到一些相容性問題，建議在 Unix-like 系統上運行生產環境的 Bugzilla。
按照這些步驟，你可以在 Windows 上安裝和配置 Bugzilla。根據項目的需求進行適當的配置和調整。