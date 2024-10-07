---
layout: blog
title: "01-初步認識Docker"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Docker
---


docker pull ubuntu:latest
docker run -it --name myubuntu ubuntu:latest


```bash
sudo apt update
sudo apt-get update
sudo apt nano apt
```

docker commit myubuntu ubuntu:new
docker run -it ubuntu:new --name mynewubuntu

使用 Docker 涉及幾個基本操作，包括創建和管理容器、映像檔、以及使用 Docker Compose 來管理多容器應用。以下是 Docker 的基本操作指南，包括容器和映像檔的使用、Dockerfile 的創建、以及 Docker Compose 的基本用法。


如果
2. 創建和使用 Dockerfile
Dockerfile 是一個文本文件，定義了如何構建 Docker 映像檔。以下是一個簡單的 Dockerfile 範例：

Dockerfile

# 使用官方的 Ubuntu 映像檔作為基礎映像
FROM ubuntu:20.04

# 安裝 Nginx
RUN apt-get update && apt-get install -y nginx

# 將本地文件複製到容器中
COPY index.html /var/www/html/

# 曝露容器的 80 端口
EXPOSE 80

# 啟動 Nginx 服務
CMD ["nginx", "-g", "daemon off;"]
2.1 構建 Docker 映像檔
```bash

docker build -t <image_name> .
```
-t 參數用於標記映像檔名稱。
例如，構建名為 my_nginx_image 的映像檔：

```bash

docker build -t my_nginx_image .
```

2.2 運行 Docker 容器
```bash

docker run -d -p 8080:80 my_nginx_image
```
-p 參數將容器的端口映射到主機端口。

3. 使用 Docker Compose
Docker Compose 是一個工具，用於定義和運行多容器 Docker 應用。以下是使用 Docker Compose 的基本步驟：

3.1 創建 docker-compose.yml 文件
docker-compose.yml 文件定義了應用程序的服務、網絡和卷等設置。以下是一個範例：

```yaml

version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
	  ```
3.2 運行 Docker Compose
```bash

docker-compose up
```
這個命令會創建並啟動 docker-compose.yml 文件中定義的所有服務。
3.3 停止和移除容器
```bash

docker-compose down
```
這個命令會停止並移除容器、網絡和卷。
4. 管理 Docker 容器和映像檔
4.1 查看 Docker 系統信息
```bash

docker info
```
4.2 查看 Docker 映像檔
```bash

docker images
```

4.3 清理未使用的 Docker 資源
```bash

docker system prune
```
這個命令會清理未使用的容器、映像檔和網絡。

5. 進階操作

5.1 使用 Docker Volume（數據卷）
Docker Volume 用於持久化數據。以下是創建和使用 Docker Volume 的示例：

創建 Volume：

```bash

docker volume create my_volume
```

運行容器並掛載 Volume：

```bash

docker run -d -v my_volume:/data my_image
```

查看 Volume：

```bash

docker volume ls
```

查看 Volume 詳細信息：

```bash

docker volume inspect my_volume
```

刪除 Volume：

```bash

docker volume rm my_volume
```

總結
Docker 提供了一個強大的平台來簡化應用程式的部署、測試和運維。通過學習如何使用 Docker 命令、Dockerfile 和 Docker Compose，你可以更有效地管理和運行容器化應用程式。Docker 的官方文檔和社區資源可以幫助你深入了解和解決更複雜的使用場景。









以下是一些 Docker 常用指令及其用途，帮助你更好地管理和使用 Docker：

基础命令
查看 Docker 版本：

bash
複製程式碼
docker --version
显示已安装的 Docker 版本。

启动 Docker 容器：

bash
複製程式碼
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
启动一个新的容器。常用的选项有：

-d：后台运行容器。
-it：启动交互模式并分配一个伪终端。
--name：为容器指定一个名称。
查看正在运行的容器：

bash
複製程式碼
docker ps
显示当前正在运行的容器。

查看所有容器（包括停止的）：

bash
複製程式碼
docker ps -a
显示所有容器，无论是否在运行。

停止一个正在运行的容器：

bash
複製程式碼
docker stop CONTAINER_ID/NAME
停止指定的容器。

启动已停止的容器：

bash
複製程式碼
docker start CONTAINER_ID/NAME
重新启动已停止的容器。

删除容器：

bash
複製程式碼
docker rm CONTAINER_ID/NAME
删除一个已停止的容器。使用 -f 参数可以强制删除正在运行的容器。

列出本地镜像：

bash
複製程式碼
docker images
列出已下载到本地的 Docker 镜像。

删除镜像：

bash
複製程式碼
docker rmi IMAGE_ID/NAME
删除本地的 Docker 镜像。

拉取镜像：

bash
複製程式碼
docker pull IMAGE_NAME
从 Docker Hub 或其他镜像仓库拉取指定的镜像。

容器操作
进入正在运行的容器：

bash
複製程式碼
docker exec -it CONTAINER_ID/NAME /bin/bash
以交互模式进入正在运行的容器。

查看容器日志：

bash
複製程式碼
docker logs CONTAINER_ID/NAME
查看容器的日志输出。

复制文件到容器：

bash
複製程式碼
docker cp /path/to/local/file CONTAINER_ID:/path/in/container
将本地文件复制到容器内。

将文件从容器复制到本地：

bash
複製程式碼
docker cp CONTAINER_ID:/path/in/container /path/to/local/file
将容器内的文件复制到本地。

查看容器资源使用情况：

bash
複製程式碼
docker stats CONTAINER_ID/NAME
实时查看容器的 CPU、内存、网络和 I/O 使用情况。

镜像操作
构建镜像：

bash
複製程式碼
docker build -t IMAGE_NAME .
使用当前目录中的 Dockerfile 构建一个新的镜像。

标记镜像：

bash
複製程式碼
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
为镜像添加标签，便于管理和推送。

推送镜像到仓库：

bash
複製程式碼
docker push IMAGE_NAME
将镜像推送到 Docker Hub 或其他镜像仓库。

网络和卷
创建网络：

bash
複製程式碼
docker network create NETWORK_NAME
创建一个新的 Docker 网络。

连接容器到网络：

bash
複製程式碼
docker network connect NETWORK_NAME CONTAINER_ID/NAME
将容器连接到指定网络。

创建数据卷：

bash
複製程式碼
docker volume create VOLUME_NAME
创建一个新的数据卷。

挂载数据卷到容器：

bash
複製程式碼
docker run -d --name CONTAINER_NAME -v VOLUME_NAME:/path/in/container IMAGE_NAME
启动容器并将数据卷挂载到容器内部。

清理
删除所有停止的容器：

bash
複製程式碼
docker container prune
删除所有已停止的容器。

删除所有未使用的镜像：

bash
複製程式碼
docker image prune
删除所有未使用的镜像。

删除未使用的数据卷：

bash
複製程式碼
docker volume prune
删除所有未使用的 Docker 卷。