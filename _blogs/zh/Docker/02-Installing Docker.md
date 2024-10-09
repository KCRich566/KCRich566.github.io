---
layout: blog
title: "[Docker] 02-Installing Docker"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Docker
---

安裝Docker的步驟會根據你使用的操作系統有所不同。以下是針對主要操作系統的安裝指南：

## 在 Windows 上安裝 Docker


### 下載 Docker Desktop

訪問 Docker Desktop for Windows 下載頁面，下載 Docker Desktop 安裝程序。

### 安裝 Docker Desktop

雙擊下載的exe安裝程序，並按照指示完成安裝。安裝過程中可能會要求你安裝 WSL 2（Windows Subsystem for Linux 2），這是 Docker 的一個要求。

### 啟動 Docker Desktop

安裝完成後，啟動Docker Desktop應用程序，並按照提示進行設置。你可能需要登錄 Docker Hub 賬戶。

### 驗證安裝

打開命令提示符或 PowerShell，輸入 docker --version 和 docker-compose --version 來確認 Docker 是否成功安裝。


## 在 macOS 上安裝 Docker


### 下載 Docker Desktop

訪問 Docker Desktop for Mac 下載頁面，下載 Docker Desktop 安裝程序。

### 安裝 Docker Desktop

打開下載的 .dmg 文件，將 Docker 圖標拖到應用程序文件夾中。

### 啟動 Docker Desktop

打開應用程序文件夾，啟動 Docker Desktop。根據提示完成初始化設置。

### 驗證安裝

打開終端機，輸入 docker --version 和 docker-compose --version 來確認 Docker 是否成功安裝。

## 在 Linux 上安裝 Docker

### 更新與安裝軟體包

```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

### 添加 Docker 的官方 GPG 密鑰

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### 添加 Docker 的 APT 存儲庫

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 更新與安裝軟體包

```bash
sudo apt-get update
sudo apt-get install docker-ce
```

### 啟動 Docker 並設置開機啟動

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 驗證安裝

輸入 docker --version 來確認 Docker 是否成功安裝。

## 安裝 Docker Compose

Docker Compose 是 Docker 的一個工具，用於定義和運行多容器 Docker 應用程序，在使用前需要建立一個YAML檔案(docker-compese.yml)來配置應用程式的服務。

如果是使用Windows下載Docker Desktop本身就會有此程式，可以使用驗證安裝來查詢。

### 下載 Docker Compose

在 Linux 上，你可以使用以下命令安裝 Docker Compose：

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 設置執行權限:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### 驗證安裝:

輸入 docker-compose --version 來確認 Docker Compose 是否成功安裝。
這些步驟應該能幫助你在不同的操作系統上安裝Docker。如果遇到問題，可以參考 Docker 官方文檔 獲取更多幫助。