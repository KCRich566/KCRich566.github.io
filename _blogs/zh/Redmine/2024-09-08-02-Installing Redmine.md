---
layout: blog
title: "02-安裝 Redmine"
date: 2024-09-08 09:56:00 +0800
language: zh
lang: zh
categories: Redmine
tags: Redmine
---

<p class="text-wrap mx-2">
在Windows上安裝Redmine並使用SQLite作為資料庫的步驟如下：
</p>

## 安裝Ruby

<p class="text-wrap mx-2">
下載並安裝Ruby：
訪問<a href="https://rubyinstaller.org/">RubyInstaller</a>下載並安裝Ruby。選擇“WITHDEVKIT”版本以便安裝開發工具包（DevKit）。
在安裝過程中，確保勾選“Add Ruby executables to your PATH”以將Ruby添加到系統路徑中，這樣你可以在命令提示符中直接使用Ruby命令。
</p>

## 安裝bundler

<p class="text-wrap mx-2">
bundler是一個Ruby工具，用於管理Ruby項目的gem依賴。
</p>

```bash
gem install bundler
```

<p class="text-wrap mx-2">
這條命令會安裝bundler gem，它是用來管理Ruby項目中的gem依賴的工具。
</p>

## 下載Redmine

<p class="text-wrap mx-2">
下載Redmine：
訪問<a href="https://www.redmine.org/projects/redmine/wiki/Download">[Redmine官方網站]</a>下載最新版本的Redmine。
解壓Redmine：
將下載的壓縮包解壓到你希望安裝Redmine的目錄中。
</p>

## 配置Redmine使用SQLite

<p class="text-wrap mx-2">
進入Redmine目錄：
使用命令提示符導航到Redmine的根目錄。例如：
</p>
```bash
cd path\to\redmine
```
<p class="text-wrap mx-2">
複製資料庫配置文件：
複製<strong>config\database.yml.example</strong>文件為<strong>config\database.yml</strong>。這個文件包含資料庫連接配置的示例。
</p>
```bash
copy config\database.yml.example config\database.yml
```
<p class="text-wrap mx-2">
編輯資料庫配置：

使用文本編輯器打開`database.yml`文件，並將其配置為使用SQLite，注意只要保留一個production的欄位，development與test欄位可以註解掉：
</p>
```yaml
production:
   adapter: sqlite3
   database: db/production.sqlite3
```
<p class="text-wrap mx-2">
解釋：這裡指定了SQLite作為資料庫適配器，並設置了資料庫文件的位置。
</p>

## 修改Gemfile

<p class="text-wrap mx-2">
打開Gemfile：
使用文本編輯器打開`Gemfile`，這是Ruby項目的gem依賴文件。
添加gem：
添加以下內容（確保沒有MySQL相關的gem）：
</p>

```ruby
ruby '>= 2.7.0', '< 3.4.0'

gem 'mutex_m'
gem 'base64'
gem 'bigdecimal'
gem 'webrick'
```

<p class="text-wrap mx-2">
保存並關閉Gemfile。
</p>

## 更新到最新版本

<p class="text-wrap mx-2">
更新gem：
在Redmine目錄中運行以下命令以更新`Gemfile`中列出的所有gem到最新版本：
</p>

```bash
bundle update
```

<p class="text-wrap mx-2">
解釋：這條命令會更新`Gemfile`中列出的所有gem到符合版本約束的最新版本。
更新特定gem（可選）：
如果你只想更新特定的gem，例如`activesupport`，可以運行：
</p>

```bash
bundle update activesupport
```

## 安裝或更新Gems

<p class="text-wrap mx-2">
安裝或更新所有gem：
</p>

```bash
bundle install
```

<p class="text-wrap mx-2">
解釋：根據`Gemfile`的配置安裝或更新所有gem。這會安裝Redmine項目所需的所有依賴。
</p>

## 生成秘密令牌

<p class="text-wrap mx-2">
生成秘密令牌：
</p>

```bash
bundle exec rake generate_secret_token
```

<p class="text-wrap mx-2">
解釋：生成一個新的秘密令牌，用於保護Redmine的會話和加密數據。
</p>

## 資料庫遷移

<p class="text-wrap mx-2">
執行資料庫遷移：
</p>

```bash
bundle exec rake db:migrate RAILS_ENV=production
```

<p class="text-wrap mx-2">
解釋：應用資料庫遷移文件，創建或更新資料庫表，以便Redmine可以正常使用資料庫。
</p>

## 加載默認數據（可選）

<p class="text-wrap mx-2">
加載默認數據：
</p>

```bash
bundle exec rake redmine:load_default_data RAILS_ENV=production
```

<p class="text-wrap mx-2">
解釋：加載Redmine的默認數據，包括默認的項目、用戶等。系統會提示選擇語言，如`zh`（中文）或`en`（英文）。
</p>

## 啟動Redmine

<p class="text-wrap mx-2">
啟動Redmine伺服器：
</p>

```bash
bundle exec rails server -e production
```
也可以指定

```bash
bundle exec rails server -b <ip_address> -p <port> -e production

or

bundle exec rails server -b 127.0.0.1 -p 3000 -e production
```

<p class="text-wrap mx-2">
解釋：啟動Redmine應用的生產環境伺服器，監聽默認端口3000。
</p>

## 訪問Redmine

<p class="text-wrap mx-2">
在瀏覽器中訪問：
打開瀏覽器，訪問`http://localhost:3000`，你應該會看到Redmine的歡迎頁面。
</p>

### 常見問題和注意事項

<p class="text-wrap mx-2">
-權限問題：確保Redmine目錄及其子目錄具有正確的權限，以便能夠讀取和寫入數據。
-端口衝突：如果端口3000被占用，可以指定其他端口，例如：
</p>