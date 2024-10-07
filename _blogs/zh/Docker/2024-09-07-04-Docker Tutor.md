---
layout: blog
title: "01-初步認識Docker"
language: zh
lang: zh
categories: Docker
---
## Docker 基本概念

### 容器（Container）

定義：容器是一個輕量級、獨立且執行的軟體包，包含應用程序及其所有的依賴項、庫、配置文件等。容器在同一操作系統內核上運行，與其他容器和主機系統隔離。

優點：容器啟動快，占用資源少，並且能夠在不同環境中保持一致性。

### 映像（Image）

定義：映像是容器的靜態模板，包含了容器運行所需的所有內容。映像是只讀的，可以用來創建容器實例。

構建：映像是從 Dockerfile 構建出來的。

### Dockerfile

定義：Dockerfile 是一個文本文件，包含了構建 Docker 映像的指令和設置。這些指令告訴 Docker 如何構建一個映像。

常見指令：

FROM：指定基礎映像。

RUN：在映像中執行命令，如安裝軟體。

COPY 或 ADD：將文件複製到映像中。

EXPOSE：指定容器要暴露的端口。

CMD 或 ENTRYPOINT：指定容器啟動時要執行的命令。


## Docker 基本操作

### 運行容器

1. 拉取鏡像：

```bash
docker pull <image-name>
```

例如，拉取最新的 Ubuntu 鏡像：

```bash
docker pull ubuntu
```

1.1 拉取指定標籤的映像

```bash
	docker pull <image_name>:<tag>
```

例如

```bash 
	docker pull nginx:1.21.6
```
2. 運行容器：

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

IMAGE：要運行的 Docker 映像名稱。

COMMAND：可選，容器啟動後運行的命令。

ARG...：可選，傳遞給命令的參數

例如，運行一個交互式的 Ubuntu 容器：

```bash
docker run -it -d --name mycontainer ubuntu
```

-it 標誌表示交互模式，允許進入容器內操作。

-d 參數表示以背景模式運行容器,並返回容器的 ID

--name 參數為容器指定名稱。

-p：端口映射。將容器內的端口映射到主機端口，如將主機8080端口映射到容器內的80端口

```bash
docker run -d -p 8080:80 nginx
```

-e：設置環境變量。

```bash
docker run -d -e MY_ENV_VAR=value nginx
```

-v：卷掛載。將主機目錄或文件掛載到容器內,如將主機的/my/local/dir掛載到容器的/data

```
docker run -d -v /my/local/dir:/data nginx
```

--rm：容器停止後自動刪除容器

```
docker run --rm nginx
```

--network：指定容器所屬的網絡，如將容器連接到名為 my-network 的 Docker 網絡

```bash
docker run -d --network my-network nginx
```

3. 列出運行中的容器：

```bash
docker ps [-a]
```

-a: 表示包括已停止的

4. 停止容器：

```bash
docker stop <container-id>
```

5. 刪除容器：

```bash
docker rm <container-id>
```

### 查看容器輸出日誌

1. 查看容器日誌

```bash
docker logs <container_id>
```

將 <container_id> 替換為你要查看的容器 ID 或名稱。你可以從 docker ps 命令中獲取容器 ID 或名稱。

```bash
docker ps
```

然後使用容器 ID 或名稱查看日誌：

```bash
docker logs my-container
```

2. 查看實時日誌

若要查看實時日誌，可以使用 -f (follow) 選項。這會持續輸出日誌，直到你手動停止（按 Ctrl+C）。

```bash
docker logs -f <container_id>
```

這對於實時監控容器的運行非常有用。

3, 顯示最近的日誌行

若只想查看最近幾行日誌，可以使用 --tail 選項。例如，查看最近 100 行日誌：

```bash
docker logs --tail 100 <container_id>
```

4. 顯示指定時間段的日誌

若要查看從特定時間點開始的日誌，可以使用 --since 選項。例如，查看過去 1 小時的日誌：

```bash
docker logs --since 1h <container_id>
```

5. 使用具體的時間戳：

```bash
docker logs --since "2024-09-10T15:00:00" <container_id>
```

6. 顯示日誌的時間戳

使用 --timestamps 選項可以在日誌輸出中顯示時間戳：

```bash
docker logs --timestamps <container_id>
```

### 構建自定義映像

1. 創建 Dockerfile：

```Dockerfile
#可以建立一個資料夾，並在裡面帶有dockerfile與index.html檔案

# 使用官方的 Ubuntu 作為基礎映像
FROM ubuntu:latest

# 安裝 Nginx
RUN apt-get update && apt-get install -y nginx

# 複製本地文件到容器中，需要準備index.html檔案
COPY ./index.html /var/www/html/

# 暴露端口 80
EXPOSE 80

# 啟動 Nginx[可以參考"正向代理 vs 反向代理.md"]

CMD ["nginx", "-g", "daemon off;"]
```

2. 構建映像： 在 Dockerfile 所在的目錄中運行：

```bash
docker build -t my-nginx-image .
```

3. 運行映像：

```bash
docker run -d -p 8080:80 my-nginx-image
```

這會將容器的端口 80 映射到主機的端口 8080。

## 使用 Docker Compose

Docker Compose 允許你使用 YAML 文件來定義和管理多個容器。這對於需要多個服務協同工作的應用程序特別有用。

### 創建 docker-compose.yml 文件：

以下創建兩個容器web與db

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
```

### 查看容器狀態：

```bash
docker-compose ps
```

### 啟動服務： 在 docker-compose.yml 文件所在的目錄中運行：

```bash
docker-compose up [-d]
```

-d: 表示在後台運行

### 停止服務：

```bash
docker-compose down
```

### 查看日誌

```bash
docker-compose logs
```
查看特定服務的日誌：

```bash
docker-compose logs web
```

5. 學習資源
Docker 官方文檔：涵蓋 Docker 的詳細使用說明和最佳實踐。
Docker Hub：用於查找和分享 Docker 鏡像。
Docker Labs：線上 Docker 實驗環境，可以用來試驗 Docker 的功能。
這些基本概念和操作步驟應該能幫助你開始使用 Docker。如果你有更具體的問題或需要進一步的指導，隨時告訴我！