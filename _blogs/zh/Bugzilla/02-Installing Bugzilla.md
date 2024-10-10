---
layout: blog
title: "[Bugzilla] 02-Installing Bugzilla"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Bugzilla
---

拉取映像檔並建立容器

```
docker pull ubuntu:latest
docker run -it -p 8555:8555 --name myubuntu ubuntu:latest
```

安裝與更新Ubuntu的軟體

```
apt update 
apt install -y git nano apache2 build-essential mariadb-server libcgi-pm-perl libdigest-sha-perl libtimedate-perl libdatetime-perl libdatetime-timezone-perl libdbi-perl libdbix-connector-perl libtemplate-perl libemail-address-perl libemail-sender-perl libemail-mime-perl liburi-perl liblist-moreutils-perl libmath-random-isaac-perl libjson-xs-perl libgd-perl libchart-perl libtemplate-plugin-gd-perl libgd-text-perl libgd-graph-perl libmime-tools-perl libwww-perl libxml-twig-perl libnet-ldap-perl libauthen-sasl-perl libnet-smtp-ssl-perl libauthen-radius-perl libsoap-lite-perl libxmlrpc-lite-perl libjson-rpc-perl libtest-taint-perl libhtml-parser-perl libhtml-scrubber-perl libencode-perl libencode-detect-perl libemail-reply-perl libhtml-formattext-withlinks-perl libtheschwartz-perl libdaemon-generic-perl libapache2-mod-perl2 libapache2-mod-perl2-dev libfile-mimeinfo-perl libio-stringy-perl libcache-memcached-perl libfile-copy-recursive-perl libfile-which-perl libmariadb-dev perlmagick lynx graphviz python3-sphinx rst2pdf mariadb-server mariadb-client libdbi-perl
```

建立bugzilla.cnf的MySQL設定檔

```
nano /etc/mysql/conf.d/bugzilla.cnf
```

```
[mysqld]
max_allowed_packet=16M
```

啟動mariadb並且設定使用者

```
service mariadb start
mariadb -u root -e "CREATE USER bugs@localhost IDENTIFIED BY 'password'"
mariadb -u root -e "GRANT ALL PRIVILEGES ON bugs.* TO bugs@localhost"
service  mariadb restart
```

新增bugzilla在apache的配置，其中設定Bugzilla使用port 8555
 
```
nano /etc/apache2/sites-available/bugzilla.conf
```

```conf
# /etc/apache2/sites-available/bugzilla.conf
LISTEN 8555
Alias /bugzilla /var/www/webapps/bugzilla
<Directory /var/www/webapps/bugzilla>
  AddHandler cgi-script .cgi
  Options +ExecCGI
  DirectoryIndex index.cgi index.html
  AllowOverride All
</Directory>
```

重新啟動apache2

```bash
# ubuntu bash
a2ensite bugzilla
a2enmod cgid headers expires rewrite
service apache2 restart
```

下載bugzilla，並進入bugzilla資料夾

```bash
# ubuntu bash
mkdir -p /var/www/webapps
cd /var/www/webapps
git clone --branch release-5.0-stable https://github.com/bugzilla/bugzilla bugzilla
cd /var/www/webapps/bugzilla
```

在下載完成後，可以先使用checksetup.pl來檢查bugzilla的環境

```bash
# ubuntu bash
./checksetup.pl
```

修改配置bugzilla的文件

```bash
# ubuntu bash
nano localconfig
```

```localconfig
# localconfig
$webservergroup='www-data';
$db_drive='mysql'
$db_name='bugs'
$db_user='bugs'
$db_pass='password'
```

設定apache存取資料夾的權限

```bash
# ubuntu bash
chmod 755 /var/www/webapps/bugzilla/
```

設定完後再檢驗一次

```bash
# ubuntu bash
./checksetup.pl
```

如果checksetup.pl檢查完成後，會要求入以下內容

```bash
# ubuntu bash
Enter the e-mail address of the administrator: 
Enter the real name of the administrator: 
Enter a password for the administrator account:
```

驗證是否安裝成功

```bash
# windows bash
http://localhost:8555/bugzilla/
```


