---
layout: blog
title: "01-Install Ubuntu Platform"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: docker
---

## 必須要知道的事情

Image: 鏡像

Container: 容器

docker run: 建立並執行容器，所有的配置要在這個命令前配置好

docker exec: 針對已建立的容器來執行命令

docker start|stop|restart: 針對已建立的容器啟動|停止|重啟

## docker 常用指令與範例

### 顯示docker版本

```bash
docker --version
```

### docker pull 拉取鏡像(Image)

從 docker Hub 拉取鏡像。

```bash
docker pull <image-name>:<tag>
```

例如：

```bash
docker pull ubuntu:20.04
```

### docker image 顯示目前有的鏡像

```bash
docker images
```

### 刪除目前有的鏡像

```bash
docker rmi <image-id-or-name>
```


### docker run 建立並運行一個新容器

很多Container的配置在這個步驟就要處理完成

後續的如啟動容器的方法，都是根據這些配置來處理的

修改有點困難，所以還是先配置比較好

不然你就要Commit你的容器使之成為鏡像再來使用run配置

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

例如：
```
docker run -d --name mycontainer ubuntu:20.04 /bin/bash
```


```
docker run -it -p 8080:80 --name mycontainer ubuntu:20.04 /bin/bash
```

常用選項：

-it：交互模式，這是-i與-t的命令，-t表示分配一個虛擬終端機

--name <container name>：指定容器名稱

-d：以分離模式運行容器

-p 8080:80：端口映射（-p <host-port>:<container-port>）
	端口映射一定要在建立時設定，不然後面會很麻煩
	
-e [MY_VAR=value]: 設定環境變量

-v <host-path>: <container-path>: 掛載目錄或文件到容器中

--rm: 容器停止後自動刪除容器


啟動容器後容器馬上停止的問題，這通常是因為容器中沒有持續運行的進程。
在 ubuntu基本鏡像中，沒有預設的持續運行的服務或命令，容器啟動後會立刻退出

解決方法:

使用sleep來設定閒置時間

```
docker run -d --name <container-name> <image> sleep infinity
```

如是可以使用dockerfile來指定容器運行Nginx的服務

```dockerfile
# dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

使用以下命令構件與運行鏡像

```bash
docker build -t mynginx .
docker run -d --name mynginx-container mynginx
```

### docker start|stop|restart 啟動,停止或重啟一個已經存在的容器

```
docker <start|stop|restart> <container-id-or-name>
```

### docker exec 在運行中的容器執行命令

1. 進入交互式 Shell

你可以使用 docker exec 進入容器的交互式 shell，以便進行手動操作或檢查容器內部的狀況：

```bash
docker exec -it <container-id-or-name> /bin/bash
```

或者如果容器只安裝了 sh：

```bash
docker exec -it <container-id-or-name> /bin/sh
```

這會讓你進入容器內部的 shell，可以在其中執行各種命令。

2. 執行單一命令

執行容器內部的單一命令而不進入 shell。例如，查看容器內部的文件：

```bash
docker exec <container-id-or-name> ls /app
```

3. 執行背景命令

可以使用 --detach 選項以分離模式運行命令，這意味著命令會在背景中運行：

```bash
docker exec --detach <container-id-or-name> some-background-command
```

4. 設置用戶

可以使用 --user 選項指定執行命令的用戶。例如，以 www-data 用戶身份執行命令：

```bash
docker exec --user www-data <container-id-or-name> ls /var/www
```

5. 檢查容器內的應用

檢查或操作容器內部的應用程序。例如，重啟某個服務：

```bash
docker exec <container-id-or-name> service apache2 restart
```

6. 檢查系統信息

檢查容器內部的系統狀況，例如查看系統資源使用情況：

```bash
docker exec <container-id-or-name> top
```

7. 編輯配置文件

進入容器並編輯配置文件，例如使用 vi 或 nano 編輯器：

```bash
docker exec -it <container-id-or-name> vi /etc/some-config-file
```

8. 調試

在容器內部運行調試工具或腳本來檢查問題。例如，查看容器的環境變量：

```bash
docker exec <container-id-or-name> printenv
```

### 顯示正在運行的容器

```bash
docker ps [-a]
```

-a: 包括已停止的容器

### 停止運行中的容器

```bash
docker stop <container-id>
```

例如：

```bash
docker stop mycontainer
```

### 刪除停止的容器

```bash
docker rm [-f] <container-id1> [container-id2]...
```

-f: 表示強制刪除運行中的容器


例如：

```bash
docker rm mycontainer
```

刪除所有已停止的容器

```bash
docker rm $(docker ps -a -q)
```

### docker logs 查看容器的日誌

```bash
docker logs <container-id>
```

例如：

```
docker logs mycontainer
```

### 查看 docker 容器的端口映射

```bash
docker port <Container> [PRIVATE_PORT[/PROTO]]
```

例如:

```bash
docker port mycontainer 80
```
### docker cp複製文件與目錄

從主機到容器的複製方式

```bash
docker cp [OPTIONS] Host_Path Container:Host_Path
```

從容器到主機的複製方式

```bash
docker cp [OPTIONS] Container:Path Host_Path
```

### docker commit保存容器為鏡像

```bash
docker commit <container-id> <image-name>:<tag>
```

### docker build使用dockerfile來建立鏡像

```bash
docker build [OPTIONS] PATH | URL | -
```

PATH：Dockerfile 所在的目錄或上下文路徑。上下文是 Dockerfile 所在的目錄以及其所有子目錄。

URL：指向包含 Dockerfile 的 Git 存儲庫的 URL。

-：從標準輸入讀取 Dockerfile。

例如

```bash
docker build -t myimage:latest .
```

```bash
docer build -t myimage:latest -f mydockerfile.dockerfile .
```
-t 或 --tag：為鏡像指定名稱和標籤。例如，myimage:latest。

-f 或 --file：指定 Dockerfile 的名稱或路徑（默認是 Dockerfile）。

".": 表示當前目錄

--build-arg：向 Dockerfile 傳遞構建時的環境變量。

--no-cache：構建過程中不使用緩存，強制重新構建所有層。

--progress：控制構建過程中輸出的詳細程度（例如 plain、tty、quiet）。

## 使用dockerfile建立鏡像

dockerfile常用指令:

- FROM：指定基礎鏡像。

- RUN：在鏡像構建時執行命令。

- COPY：將文件從宿主機複製到鏡像中。

- ADD：類似於 COPY，但還支持從 URL 下載文件。

- WORKDIR：設置工作目錄(當容器啟動或你進入容器時（例如使用 docker exec），命令會在你設置的工作目錄下執行)。

- CMD：設置容器啟動時執行的命令（可以被 docker run 指令覆蓋）。

- ENTRYPOINT：設置容器啟動時執行的命令，通常與 CMD 配合使用。

- EXPOSE：告訴 Docker 這個容器會使用哪些端口。

- ENV：設置環境變量。

- VOLUME：在容器中掛載卷。

- USER：設置容器運行時的用戶

一個基礎的dockerfile內容如下:

```dockerfile
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

## docker-compose

Docker Compose 是一個用來定義和運行多容器 Docker 應用的工具。

你可以通過一個 YAML 文件來配置應用的服務、網絡和卷等

只需一條命令就可以創建並啟動你在配置文件中定義的所有服務。

主要功能：
多容器協調：允許你同時管理多個容器，適合那些需要多個服務協同工作的應用，例如一個需要 Web 服務器、數據庫和緩存服務器的應用。

服務定義：你可以在一個 docker-compose.yml 文件中定義每個服務的配置，包括其映像、端口、環境變量、卷等。

命令簡化：一條 docker-compose up 命令即可啟動所有服務，而不需要分別執行 docker run 命令。

以下為docker-compose.yml的範例

```
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

version：這行定義了 Docker Compose 文件的語法版本。3 是一個常見的版本，適合多數現代 Docker 部署。
services ：這部分定義了需要運行的 Docker 服務(也可以說是容器)。上述有兩個服務：web 和 db。

web 服務
	image: 鏡像
	ports: 端口映射
	volumes:定義一個宿主機目錄與容器內目錄的映射。
db 服務
	image: 鏡像：指定使用的 Docker 映像。db 服務使用的是 mysql:5.7，這是一個 MySQL 5.7 的版本映像。
	environment環境變量：用來配置容器的環境參數。
	volumes: 數據卷：將 MySQL 的數據目錄映射到宿主機的 db_data 卷上。這樣，數據庫數據可以持久化，即使容器刪除後，數據仍然保留。這個映射指向 MySQL 容器的 /var/lib/mysql 目錄，這是 MySQL 默認的數據存儲目錄。

volumes 數據卷(全局定義)：定義一個名為 db_data 的卷，用來持久化數據。在 db 服務中，這個卷被用來存儲 MySQL 的數據。

常用命令：

1. docker-compose up：啟動並運行所有在 docker-compose.yml 中定義的服務。

2. docker-compose down：停止並移除容器、網絡和卷等資源

3. docker-compose build：從 Dockerfile 構建服務的映像。

4. docker-compose logs：查看正在運行的容器的日誌輸出。

5. docker-compose exec：在運行中的容器內執行命令。

### docker-compose up

根據 docker-compose.yml 文件啟動所有服務。

```bash
docker-compose up
```

### docker-compose down
停止並刪除由 docker-compose up 啟動的容器。

```bash
docker-compose down
```