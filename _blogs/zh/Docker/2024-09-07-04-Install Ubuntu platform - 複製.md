---
layout: blog
title: "01-Install Ubuntu Platform"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Docker
---

## 安裝Ubuntu

在Docker中運行Ubuntu映像：

拉取Ubuntu映像：

```bash
docker pull ubuntu:latest
```

ubuntu:latest 會下在目前最新的Ubuntu版本

如欲指定下載版本可以使用

```bash
docker pull ubuntu:20.04
```
如果下修改下載後的Image Tag

```bash
docker tag <Image> <New Image Name>:<New Tag>
```

如

```bash
docker tag ubuntu:20.04 ubuntu20:20.04
```

運行Ubuntu容器：

```bash
docker run -it ubuntu:latest
```

如果要為container命名可以使用

```bash
docker run -it --name my-ubuntu-container ubuntu:20.04
```

這會啟動一個新的Ubuntu容器並打開一個交互式終端。

## 使用Ubuntu容器

在Ubuntu容器中，您可以像使用正常的Ubuntu系統一樣使用命令行。

更新包列表：

```bash
apt-get update
```

安裝常用軟體（例如Git, curl, vim等）：

```bash
apt-get install -y git curl vim
```

退出容器：輸入exit命令即可退出Ubuntu容器。

## 管理容器

您可以通過以下命令來管理Docker容器：

查看運行中的容器：
```bash
docker ps
```

查看所有容器（包括已停止的容器）：

```bash
docker ps -a
```

啟動已停止的容器：

```bash
docker start <容器ID或名稱>
```

進入運行中的容器：
```bash
docker exec -it <容器ID或名稱> /bin/```bash
```


重新命名容器： 使用docker rename命令來更改容器名稱：
```bash
docker rename <old-container-name> <new-container-name>
```
例如：
```bash
docker rename my-ubuntu-container new-ubuntu-container
```

將容器提交為映像
使用docker commit命令將容器保存為映像。語法如下：

```bash
docker commit <container-id-or-name> <new-image-name>:<tag>
```
例如，如果您有一個名為my-ubuntu-container的容器，並且您想將其保存為一個名為my-custom-ubuntu的映像，帶有標籤v1，可以這樣做：

```bash
docker commit my-ubuntu-container my-custom-ubuntu:v1
```