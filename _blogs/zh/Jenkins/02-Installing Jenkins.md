---
layout: blog
title: "[Jenkins] 02-Installing Jenkins"
date: 2024-09-30 00:00:00 +0800
language: zh
lang: zh
categories: Jenkins
---

我們使用Docker來安裝Jenkins

拉取映像檔並且建立容器

```bash
# ubuntu bash
docker pull ubuntu:latest
docker run -it -p 8080:8080 --name myubnutu ubuntu:latest
```

更新並且安裝相關軟體

```bash
# ubuntu bash
apt update -y
apt install -y fontconfig openjdk-17-jre wget systemctl 
```

取得Jenkins下載資料

```bash
# ubuntu bash
wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
  
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]"   https://pkg.jenkins.io/debian-stable binary/ |  tee   /etc/apt/sources.list.d/jenkins.list > /dev/null
```

更新apt安裝軟體，並且安裝Jenkins

```bash
# ubuntu bash
apt update
apt install -y jenkins
```

確認Java是否已經安裝完成

```bash
# ubuntu bash
java -version
```

啟動Jenkins

```bash
# ubuntu bash
systemctl enable jenkins
systemctl start jenkins
systemctl status jenkins
```

使用Browser登入Jenkins網頁

```url
# Browser url
http://localhost:8080/jenkins
```

使用Browser第一次登入時，Jenkins會要求解鎖，其密鑰會在/var/lib/jenkins/secrets/initialAdminPassword檔案中。輸入後按照Jenkins的網頁提示安裝完相應套件