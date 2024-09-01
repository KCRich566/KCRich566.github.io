# Gemfile 是一個用於管理 Ruby 程式的依賴和安裝的文件，特別是對於使用 Bundler 的 Ruby 應用程式（例如 Jekyll 網站）。
# 它列出了一個應用程序所需的所有 gems（即 Ruby 庫）

#  Bundler 會讀取 Gemfile 並根據該文件的內容來安裝所需的 gems。

#  指定了從哪裡獲取 gems
source 'https://rubygems.org'

# 指定github-pages版本必須大於39
gem 'github-pages', '>=39'

# 這個 gem 自動為 Jekyll 網站生成一個站點地圖 (sitemap.xml) 文件。站點地圖有助於搜索引擎更好地索引你的網站
# 生成 sitemap.xml
gem 'jekyll-sitemap'

# webrick 是 Ruby 的一個內置 HTTP 服務器，Jekyll 在本地運行開發伺服器時會用到它。
# '~> 1.7' 表示 webrick 的版本必須是 1.7.x，但不會高於 1.8.0
gem "webrick", "~> 1.7"

# 生成 RSS feed
gem 'jekyll-feed', '~> 0.15'  
# 提供 SEO 支持      
gem 'jekyll-seo-tag', '~> 2.8'
# 分頁支持
gem 'jekyll-paginate', '~> 1.1'     

