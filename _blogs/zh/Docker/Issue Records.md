---
layout: blog
title: "Issue Records"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: docker
---
如果docker run -d --name myubuntu ubuntu:latest的話
但docker run -it --name myubuntu ubuntu:latest卻沒事情。
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
