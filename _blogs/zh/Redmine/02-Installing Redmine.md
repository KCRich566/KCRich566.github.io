---
layout: blog
title: "[Redmine] 02-Installing Redmine"
date: 2024-09-08 09:56:00 +0800
language: zh
lang: zh
categories: Redmine
tags: Redmine
---

我們使用Docker來安裝Redmine

https://www.xtuos.com/215036.html#google_vignette

下載映像檔並建立容器
```bash
# windows bash
docker pull ubuntu:latest
docker run -it -p 3000:3000 --name myubuntu ubuntu:latest
```

安裝與更新相應軟體

```bash
# ubuntu bash
apt-get update -y
apt-get install -y libyaml-dev
apt update && apt upgrade -y
apt install -y mysql-server mysql-client libmysqlclient-dev
apt install -y git nano systemctl
apt install -y ruby rubygems ruby-dev 
apt install -y imagemagick libxml2-dev libxslt1-dev zlib1g-dev libmagickwand-dev ruby-actionpack 
apt install -y apache2 libtool libapache2-mod-passenger apache2-dev build-essential libcurl4-openssl-dev
```

確認apache2是否啟動

```bash
# ubuntu bash
systemctl enable apache2
systemctl start apache2
systemctl status apache2
```

確認是否啟動mysql server

```bash
# ubuntu bash
systemctl status mysql
systemctl start mysql
mysql -u root -p
```

在MySQL中增加給Redmine的使用者

```sql
# mysql
CREATE DATABASE redmine CHARACTER SET utf8mb4;
CREATE USER 'redmine'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';
exit
```

下載Redmine到/var/www/redmine資料夾，並且複製相應文件

```bash
# ubuntu bash
cd ~
git clone https://github.com/redmine/redmine
mv redmine/ /var/www/
cd /var/www/redmine
cp config/configuration.yml.example config/configuration.yml
cp config/database.yml.example config/database.yml
```

修改剛剛複製過來的config/database.yml文件，使其符合MySQL所建立的使用者

```bash
# ubuntu bash
nano config/database.yml
```

```YAML
# config/database.yml
production:
  adapter: mysql
  database: redmine
  host: localhost
  username: redmine
  password: "password"
  encoding: utf8mb4
```

在redmine的Gemfile增加以下套件

```bash
# ubuntu bash
nano Gemfile
```

```Gemfile
# Gemfile
gem 'svg_sprite'
```

執行ruby的套件更新與安裝

```bash
# ubuntu bash
gem update
gem install bundler
bundle config set --local without 'development test'
bundle install
gem pristine --all
bundle add webrick
```

導入Redmine數據到資料庫中

```bash
# ubuntu bash
# 隨機密鑰，用來防止竄改
bundle exec rake generate_secret_token
# 建立資料庫結構
RAILS_ENV=production bundle exec rake db:migrate
# 將數據加入MySQL資料庫
RAILS_ENV=production REDMINE_LANG=en bundle exec rake redmine:load_default_data
```

修改Redmine目錄之權限

```bash
# ubuntu bash
mkdir -p tmp/pdf
mkdir -p public/plugin_assets
chown -R $USER:$USER files log tmp public/plugin_assets
chmod -R 755 /var/www/redmine/
```

啟動rails的服務器

```bash
# ubuntu bash
bundle exec rails server -u webrick -e production
```
