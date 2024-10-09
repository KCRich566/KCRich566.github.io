---
layout: blog
title: "[Docker] Test1-To Install Lastest Ubuntu"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Docker
---


### 使用一般的方法來建立容器

下載最新的ubuntu映像檔，並且建立與執行容器

```bash
# windows
docker pull ubuntu:latest
docker run -it -p 8080:80 --name myubuntu ubuntu:latest
```

安裝與更新Ubuntu軟體

```bash
# ubuntu 
sudo apt update
sudo apt-get update
sudo apt install -y nano nginx
```

建立Nginx渲染的檔案

```bash
# ubuntu
echo "<h1>Welcome</h1>" > /var/www/html/index.html
```

離開互動模式

```bash
# ubuntu
exit
```

啟動容器並且使用"-d"來在背景中執行nginx.

```bash
# windows
docker start myubuntu
docker exec -d myubuntu nginx -g "daemon off;"
```

驗證是否成功啟動nginx

```bash
# windows
curl localhost:8080
```

建立一個新的映像並建立容器

```bash
# windows
docker commit myubuntu ubuntu:new
docker run -it -p 7000:80 --name mynewubuntu ubuntu:new 
```

### 使用Dockerfile來建立容器

建立一個資料夾，並建立dockerfile與index.html檔案

```dockerfile
# 使用官方的 Ubuntu 作為基礎映像
FROM ubuntu:latest
# 安裝 Nginx
RUN apt-get update && apt-get install -y nginx && apt-get -y nano
# 複製本地文件到容器中，需要準備index.html檔案
COPY ./index.html /var/www/html/
# 暴露端口 80
EXPOSE 80
# 啟動 Nginx[可以參考"正向代理 vs 反向代理.md"]
CMD ["nginx", "-g", "daemon off;"]
```

```index.html
<h1>Welcome</h1>
```

```bash
# windows
cd {資料夾}
docker build -t my-nginx-image .
docker run -d -p 8080:80 my-nginx-image
curl localhost:8080
```

### 使用docker compose來建立容器

建立一個資料夾，並建立docker-compose.yml檔案

```docker-compose.yml
# version: 定義Docker Compose文件的語法版本。3是一個常見的版本
version: '3'

# services: 義了需要運行的 Docker 服務(容器)
services:

  myubunutu:
  
    image: ubuntu:latest # 鏡像
    ports: # 端口映射
      - "8080:80"
    volumes: # 目錄的映射
      - ./html:/var/www/html
    command: /bin/bash -c "apt update && apt install -y nginx nano && nginx -g 'daemon off;'"
```

啟動並建立docker-compose的映像檔案與容器並且在背景執行

```bash
# windows
docker-compose up -d
```

建立Nginx渲染首頁

```html/index.html
<h1>Welcome</h1>
```

檢驗是否啟動Nginx

```bash
# windows
curl localhost:8080
```

啟動docker-compse的容器

```bash
# windows
docker-compose start
```

關閉docker-compse的容器

```bash
# windows
docker-compose stop
```

結束docker-compose的容器，並且刪除

```bash
# windows
docker-compose down
```