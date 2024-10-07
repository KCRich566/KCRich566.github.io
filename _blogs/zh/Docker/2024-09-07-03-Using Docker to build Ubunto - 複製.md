---
layout: blog
title: "01-初步認識Docker"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Docker
---

使用 Docker 涉及幾個基本操作，包括創建和管理容器、映像檔、以及使用 Docker Compose 來管理多容器應用。以下是 Docker 的基本操作指南，包括容器和映像檔的使用、Dockerfile 的創建、以及 Docker Compose 的基本用法。

1. Docker 容器和映像檔

1.1 查看 Docker 版本
```bash

docker --version
```
1.2 拉取 Docker 映像檔
Docker Hub 是 Docker 的官方映像檔註冊中心，你可以從這裡拉取公共映像檔：

```bash

docker pull <image_name>
```
例如，拉取 Ubuntu 映像檔：

```bash

docker pull ubuntu
```
1.3 創建並運行容器
使用 docker run 命令來創建並運行容器：

```bash

docker run -d --name <container_name> <image_name>
```
-d 參數表示以背景模式運行容器。
--name 參數為容器指定名稱。
例如，運行一個 Ubuntu 容器：

```bash

docker run -d --name my_ubuntu_container ubuntu
```

如果你能运行 docker run -it ubuntu 但无法运行 docker run -d --name my_ubuntu_container ubuntu，可能的原因是由于你运行容器的方式不同。让我解释一下可能的原因：

交互模式 (Interactive Mode) 与 后台模式 (Detached Mode) 的区别
-it 参数：表示交互模式，它启动容器并将你直接带入容器的命令行（即 /bin/bash 或其他 shell）。
-d 参数：表示后台模式，它启动容器并让它在后台运行，没有附加任何终端。
问题原因
当你使用 -d 参数时，容器在后台运行。但默认情况下，Ubuntu 容器在没有指定要运行的命令时，只会启动一个极简的基础镜像，然后立即退出，因为没有任何前台任务在运行。所以，容器可能会在启动后立即退出，这就是为什么你看起来无法运行它。
验证容器状态
你可以使用以下命令查看容器的状态：

bash
複製程式碼
docker ps -a
你可能会发现 my_ubuntu_container 容器已经停止（Exited 状态）。这意味着容器启动成功但很快就退出了，因为没有进程在后台运行。

解决方法
如果你希望容器在后台持续运行，你需要启动一个持续运行的服务或进程。你可以尝试以下几种方式：

运行一个长期运行的命令： 例如，使用以下命令启动容器并运行一个长期运行的进程（如 tail）：

bash
複製程式碼
docker run -d --name my_ubuntu_container ubuntu tail -f /dev/null
这会启动容器，并使其一直运行 tail -f /dev/null，保持容器处于活动状态。

指定启动命令： 你可以指定启动时执行的命令或脚本，如：

bash
複製程式碼
docker run -d --name my_ubuntu_container ubuntu sleep 1000
这个命令会使容器运行 sleep 1000，即睡眠 1000 秒，然后退出。

创建自定义的 Dockerfile： 你可以通过编写一个 Dockerfile 来指定容器启动时运行的命令。这对于更复杂的应用场景非常有用。

总结
当你在后台模式启动一个 Ubuntu 容器时，如果没有指定需要持续运行的命令，容器会立即退出。通过运行一个长期运行的命令或进程，你可以让容器保持运行。





1.4 查看正在運行的容器
```bash

docker ps
```
1.5 查看所有容器（包括已停止的）
```bash

docker ps -a
```
1.6 查看容器的日誌
```bash

docker logs <container_name>
```
1.7 進入運行中的容器
```bash

docker exec -it <container_name> /bin/bash
```
-it 參數允許你以互動模式進入容器。
1.8 停止容器
```bash

docker stop <container_name>
```
1.9 刪除容器
```bash

docker rm <container_name>
```
1.10 刪除映像檔
```bash

docker rmi <image_name>
```

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