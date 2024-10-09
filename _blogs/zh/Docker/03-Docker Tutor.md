---
layout: blog
title: "[Docker] 03-Docker Tutor"
language: zh
lang: zh
categories: Docker
---

Docker 的常用內容


## Docker 基本概念


### 定義

映像是一個容器的靜態模板，包含了容器運行所需的所有內容。映像是只讀的，並且可以用來創建容器實例。

### 構建

映像是根據 Dockerfile 使用 docker build 命令構建出來的，其中 Dockerfile 定義了映像的構建過程和所需依賴。

### Dockerfile

定義：Dockerfile 是一個文本文件，包含了構建 Docker 映像的指令和設置。這些指令告訴 Docker 如何構建一個映像。

常見指令：

+ FROM：指定基礎映像。

+ RUN：在映像中執行命令，如安裝軟體。

+ COPY 或 ADD：將文件複製到映像中。

+ EXPOSE：指定容器要暴露的端口。

+ CMD 或 ENTRYPOINT：指定容器啟動時要執行的命令。

### Docker Compose

Docker Compose是一個用來定義和運行多容器 Docker 應用的工具。你可以通過一個 YAML 文件來配置應用的服務、網絡和卷等。只需一條命令就可以創建並啟動你在配置文件中定義的所有服務


## Docker 基本操作


### 顯示docker版本

```bash
# windows bash
docker --version
```

### 顯示目前有的鏡像

```bash
# windows bash
docker images
```

### 拉取鏡像：

```bash
# windows bash
docker pull <image-name>:<tag>
```

例如，拉取最新的 Ubuntu 鏡像：

```bash
# windows bash
docker pull ubuntu:latest
```

#### 拉取指定標籤的映像

```bash
# windows bash
docker pull <image_name>:<tag>
```

例如

```bash
# windows bash
docker pull nginx:1.21.6
```

### 刪除目前有的鏡像

```bash
# windows bash
docker rmi <image-id-or-name>
```

### 建立並運行容器：

很多Container的配置在這個步驟就要處理完成，後續的如啟動容器的方法，都是根據這些配置來處理的。而在配置後修改會有點困難，所以還是先配置比較好，否則你就要Commit你的容器使之成為鏡像再來使用run命令來配置

```bash
# windows bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

+ IMAGE：要運行的 Docker 映像名稱。

+ COMMAND：可選，容器啟動後運行的命令。

+ +	 -it 標誌表示交互模式，允許進入容器內操作。

+ + -d 參數表示以背景模式運行容器的程序,並返回容器的 ID

+ +	--name 參數為容器指定名稱。

+ + -p：端口映射。將容器內的端口映射到主機端口，如將主機8080端口映射到容器內的80端口

+ + -e：設置環境變量。

```bash
# windows bash
docker run -d -e MY_ENV_VAR=value nginx
```

+ + -v：卷掛載。將主機目錄或文件掛載到容器內,如將主機的/my/local/dir掛載到容器的/data

```bash
# windows bash
docker run -d -v /my/local/dir:/data nginx
```

+ + --rm：容器停止後自動刪除容器

```bash
# windows bash
docker run --rm nginx
```

+ + --network：指定容器所屬的網絡，如將容器連接到名為 my-network 的 Docker 網絡

```bash
# windows bash
docker run -d --network my-network nginx
```

+ ARG...：可選，傳遞給命令的參數。


例如運行一個交互式的 Ubuntu 容器

```bash
# windows bash
docker run -it -d --name mycontainer ubuntu
```

例如將host的8080端口映射到容器的80端口

```bash
# windows bash
docker run -d -p 8080:80 nginx
```

### 操作已建立的容器


#### 進入交互式 Shell

你可以使用 docker exec 進入容器的交互式 shell，以便進行手動操作或檢查容器內部的狀況：

```bash
# windows bash
docker exec -it <container-id-or-name> /bin/bash
```

或者如果容器只安裝了 sh：

```bash
# windows bash
docker exec -it <container-id-or-name> /bin/sh
```

這會讓你進入容器內部的 shell，可以在其中執行各種命令。

#### 執行單一命令

執行容器內部的單一命令而不進入 shell。例如，查看容器內部的文件：

```bash
# windows bash
docker exec <container-id-or-name> ls /app
```

#### 執行背景命令

可以使用 --detach 選項以分離模式運行命令，這意味著命令會在背景中運行：

```bash
# windows bash
docker exec --detach <container-id-or-name> some-background-command
```

#### 設置用戶

可以使用 --user 選項指定執行命令的用戶。例如，以 www-data 用戶身份執行命令：

```bash
# windows bash
docker exec --user www-data <container-id-or-name> ls /var/www
```

#### 檢查容器內的應用

檢查或操作容器內部的應用程序。例如，重啟某個服務：

```bash
# windows bash
docker exec <container-id-or-name> service apache2 restart
```

#### 檢查系統信息

檢查容器內部的系統狀況，例如查看系統資源使用情況：

```bash
# windows bash
docker exec <container-id-or-name> top
```

#### 編輯配置文件

進入容器並編輯配置文件，例如使用 vi 或 nano 編輯器：

```bash
# windows bash
docker exec -it <container-id-or-name> vi /etc/some-config-file
```

#### Volume

Docker Volume 用於持久化數據。以下是創建和使用 Docker Volume 的示例：

創建 Volume：

```bash
# windows bash
docker volume create my_volume
```

運行容器並掛載 Volume：

```bash
# windows bash
docker run -d -v my_volume:/data my_image
```

查看 Volume：

```bash
# windows bash
docker volume ls
```

查看 Volume 詳細信息：

```bash
# windows bash
docker volume inspect my_volume
```

刪除 Volume：

```bash
# windows bash
docker volume rm my_volume
```
#### docker port

```bash
# windows bash
docker port CONTAINER [PRIVATE_PORT[/PROTO]]
```
#### 調試

在容器內部運行調試工具或腳本來檢查問題。例如，查看容器的環境變量：

```bash
# windows bash
docker exec <container-id-or-name> printenv
```

### 顯示正在運行的容器

```bash
# windows bash
docker ps [-a]
```

-a: 表示包括已停止的

### docker start|stop|restart 啟動,停止或重啟一個已經存在的容器

```bash
# windows bash
docker <start|stop|restart> <container-id-or-name>
```

### 查看容器輸出日誌

#### 查看容器日誌

```bash
# windows bash
docker logs <container_id>
```

將 `<container_id>` 替換為你要查看的容器 ID 或名稱。你可以從 docker ps 命令中獲取容器 ID 或名稱。

```bash
# windows bash
docker ps
```

然後使用容器 ID 或名稱查看日誌：

```bash
# windows bash
docker logs my-container
```

#### 查看 Docker 系統信息

```bash
# windows bash
docker info
```

#### 清理未使用的 Docker 資源

```bash
# windows bash
docker system prune [-a]
```

#### 查看實時日誌

若要查看實時日誌，可以使用 -f (follow) 選項。這會持續輸出日誌，直到你手動停止（按 Ctrl+C）。

```bash
# windows bash
docker logs -f <container_id>
```

這對於實時監控容器的運行非常有用。

#### 顯示最近的日誌行

若只想查看最近幾行日誌，可以使用 --tail 選項。例如，查看最近 100 行日誌：

```bash
# windows bash
docker logs --tail 100 <container_id>
```

#### 顯示指定時間段的日誌

若要查看從特定時間點開始的日誌，可以使用 --since 選項。例如，查看過去 1 小時的日誌：

```bash
# windows bash
docker logs --since 1h <container_id>
```

#### 使用具體的時間戳：

```bash
# windows bash
docker logs --since "2024-09-10T15:00:00" <container_id>
```

#### 顯示日誌的時間戳

使用 --timestamps 選項可以在日誌輸出中顯示時間戳：

```bash
# windows bash
docker logs --timestamps <container_id>
```

### docker cp複製文件與目錄

從主機到容器的複製方式

```bash
# windows bash
docker cp [OPTIONS] Host_Path Container:Host_Path
```

從容器到主機的複製方式

```bash
# windows bash
docker cp [OPTIONS] Container:Path Host_Path
```

### docker commit保存容器為鏡像

```bash
# windows bash
docker commit <container-id> <image-name>:<tag>
```

### docker build使用dockerfile來建立鏡像

```bash
# windows bash
docker build [OPTIONS] PATH | URL | -
```

PATH：Dockerfile 所在的目錄或上下文路徑。上下文是 Dockerfile 所在的目錄以及其所有子目錄。

URL：指向包含 Dockerfile 的 Git 存儲庫的 URL。

-：從標準輸入讀取 Dockerfile。

例如

```bash
# windows bash
docker build -t myimage:latest .
```

```bash
# windows bash
docer build -t myimage:latest -f mydockerfile.dockerfile .
```

+ -t 或 --tag：為鏡像指定名稱和標籤。例如，myimage:latest。

+ -f 或 --file：指定 Dockerfile 的名稱或路徑（默認是 Dockerfile）。

+ ".": 表示當前目錄

+ --build-arg：向 Dockerfile 傳遞構建時的環境變量。

+ --no-cache：構建過程中不使用緩存，強制重新構建所有層。

+ --progress：控制構建過程中輸出的詳細程度（例如 plain、tty、quiet）。




## 使用dockerfile建立鏡像

dockerfile常用指令:

+ FROM：指定基礎鏡像。

+ RUN：在鏡像構建時執行命令。

+ COPY：將文件從宿主機複製到鏡像中。

+ ADD：類似於 COPY，但還支持從 URL 下載文件。

+ WORKDIR：設置工作目錄(當容器啟動或你進入容器時（例如使用 docker exec），命令會在你設置的工作目錄下執行)。

+ CMD：設置容器啟動時執行的命令（可以被 docker run 指令覆蓋）。

+ ENTRYPOINT：設置容器啟動時執行的命令，通常與 CMD 配合使用。

+ EXPOSE：告訴 Docker 這個容器會使用哪些端口。

+ ENV：設置環境變量。

+ VOLUME：在容器中掛載卷。

+ USER：設置容器運行時的用戶

一個基礎的dockerfile內容如下:

```dockerfile
# dockerfile

# 使用 Ubuntu 作為基礎鏡像
FROM ubuntu:20.04

# 更新包列表並安裝一些必需的軟體
RUN apt-get update && \
    apt-get install -y \
    curl \
    vim \
    git

# 設置容器啟動時執行的命令，tail -f /dev/null是一個無線循環的命令
CMD ["tail", "-f", "/dev/null"]
or
CMD ["bash"]
```


1. 創建 Dockerfile：

```Dockerfile
# Dockerfile

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
# windows bash
docker build -t my-nginx-image .
```

3. 運行映像：

```bash
# windows bash
docker run -d -p 8080:80 my-nginx-image
```

-p 會將容器的端口 80 映射到主機的端口 8080。

## 使用 Docker Compose

Docker Compose 允許你使用 YAML 文件來定義和管理多個容器，即用於定義和運行多容器 Docker 應用。

### 創建 docker-compose.yml 文件：

以下創建兩個容器web與db

```YAML
# docker-compose.yml

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
# windows bash
docker-compose ps
```

### 啟動服務： 在 docker-compose.yml 文件所在的目錄中運行：

```bash
# windows bash
docker-compose up [-d]
```

-d: 表示在後台運行

### 停止服務：

```bash
# windows bash
docker-compose down
```

### 查看日誌

```bash
# windows bash
docker-compose logs
```
查看特定服務的日誌：

```bash
# windows bash
docker-compose logs web
```

## docker-compose

Docker Compose 是一個用來定義和運行多容器 Docker 應用的工具。

你可以通過一個 YAML 文件來配置應用的服務、網絡和卷等

只需一條命令就可以創建並啟動你在配置文件中定義的所有服務。

主要功能：

1. 多容器協調

允許你同時管理多個容器，適合那些需要多個服務協同工作的應用，例如一個需要 Web 服務器、數據庫和緩存服務器的應用。

2. 服務定義

你可以在一個 docker-compose.yml 文件中定義每個服務的配置，包括其映像、端口、環境變量、卷等。

3. 命令簡化

一條 docker-compose up 命令即可啟動所有服務，而不需要分別執行 docker run 命令。

以下為docker-compose.yml的範例

```YAML
# docker-compose.yml
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

常用命令：

1. docker-compose up：啟動並運行所有在 docker-compose.yml 中定義的服務。

2. docker-compose down：停止並移除容器、網絡和卷等資源

3. docker-compose build：從 Dockerfile 構建服務的映像。

4. docker-compose logs：查看正在運行的容器的日誌輸出。

5. docker-compose exec：在運行中的容器內執行命令。

### docker-compose up

根據 docker-compose.yml 文件啟動所有服務。

```bash
# windows bash
docker-compose up
```

### docker-compose down

停止並刪除由 docker-compose up 啟動的容器。

```bash
# windows bash
docker-compose down
```

## 其他資源
+ [Docker 官方文檔](https://docs.docker.com/)：涵蓋 Docker 的詳細使用說明和最佳實踐。
+ [Docker Hub](https://hub.docker.com/)：用於查找和分享 Docker 鏡像。
