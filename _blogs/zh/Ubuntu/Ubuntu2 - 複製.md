---
layout: blog
title: "02-Ubuntu"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Ubuntu
---

很多程式不看副檔名歐，只看檔名內容。

ssh連線可能會擋住Root權限進入。

## ubuntu的基本資料夾與檔案和環境參數意義

Ubuntu（以及其他Linux系統）使用一個層級式的文件系統結構，所有的資料夾和檔案都是從根目錄 / 開始的。以下是一些主要的資料夾：

/ (根目錄): 所有檔案和資料夾的頂層目錄。Ubuntu的所有東西都在這裡展開。

/bin: 儲存基本的可執行檔，例如系統啟動過程中會用到的命令，如 ls, cp, mv, bash 等。

/boot: 含有啟動系統所需的檔案，例如內核、引導加載程式（如 grub）。

/dev: 虛擬裝置文件所在目錄，Linux中的硬體設備都映射為這些文件，例如硬碟、光碟機、鍵盤等。

/etc: 儲存系統的配置檔案。例如網路配置檔案、系統服務的設定等。

	/etc/fstab: 包含文件系統的自動掛載資訊。

	/etc/passwd: 記錄所有系統使用者的相關資訊。

	/etc/shadow: 儲存加密過的使用者密碼。

	/etc/hostname: 系統的主機名稱。

	/etc/hosts: 主機IP地址的靜態查詢表，用於將主機名映射為IP地址。

	/etc/network/interfaces: 網路介面配置文件。

/home: 每個使用者的個人資料夾。使用者的文檔、配置文件和桌面環境的個人設定都儲存在這裡，如 /home/username。

/lib: 儲存系統庫文件，供可執行文件使用。

/media 和 /mnt: 用於臨時掛載外部設備，例如USB設備或外部硬碟。

/opt: 用於安裝附加的應用程式軟體包。

/proc: 一個虛擬檔案系統，動態反映系統的運行狀態，如系統內存使用情況、已加載的模組等。

/root: root使用者的家目錄。

/run: 儲存系統運行時的數據，例如臨時套接字和進程ID文件。

/sbin: 儲存系統管理命令，例如 shutdown, reboot，這些命令通常需要系統管理員權限。

/tmp: 儲存臨時文件，系統或應用程式運行時需要的臨時文件通常會被放在這裡。

/usr: 儲存大多數用戶級應用程序和文件。包括 /usr/bin（普通使用者的可執行文件）、/usr/lib（普通程式的庫文件）、/usr/share（共享數據，如文檔、圖標等）。

/var: 儲存可變數據文件，例如日誌文件（/var/log）、郵件（/var/mail）、暫存檔案（/var/tmp）等。

2. 基本檔案

除了資料夾外，Linux系統中有一些常用的基本檔案：


3. 環境變數
環境變數用來設定系統的操作環境。這些變數通常在登錄時設置，可以影響到系統執行程式和腳本的行為。以下是一些常見的環境變數：

PATH: 指定可執行檔的搜尋路徑，當你輸入一個命令時，系統會依次在這些路徑下尋找對應的執行檔。

HOME: 使用者的家目錄。例如 /home/username。

USER: 當前使用者名稱。

SHELL: 當前使用的Shell，例如 /bin/bash。

PWD: 當前工作目錄，即用 cd 命令更改的目錄。

LANG: 定義系統語言和地區設置。

LOGNAME: 使用者的登入名。

EDITOR: 指定默認的文字編輯器，如 vim 或 nano。

## ???

在終端機中可以在每行命令裂開頭都會看到以下內容，其代表使用者名稱@主機名稱

```bash
user@hostname
```

常見的使用如使用ssh指令連線主機

```bash
ssh username@ipaddress
```

Ctrl+C: 是強制程式中斷的命令

clear: 清空目前終端機上的紀錄

## 訪問目錄

ls [-a]: 列出目前目錄資料

-a: 列出所有內容，包含隱藏檔案

-l: 列出詳細的修改時間，與大小。如果大小為4096Byte通常資料夾的檔頭大小

pwd: 顯示目前終端機的絕對路徑

cd : 前進到指定目錄

前進根目錄，以此斜線開始的位置為絕對路徑

```bash
cd /
```

前進上一個目錄

```bash
cd ..
```

前進目前使用者家目錄
```bash
cd ~
```

以上也可以使用以下絕對路徑內容

```bash
cd /home/<user>
```

如果你的資料夾名稱有空白，如"test A"，且你要進入此資料夾，那需要使用跳脫空白字元

```bash
cd test\ A
```

# 取得使用教學

man <指令名稱>

如

```bash
man pwd
```

# 操作資料夾

mkdir: 建立資料夾

-p: 如果已經建立，則跳過

touch: 建立一個檔案

# ??

在端機上打印hi

```bash
echo "Hi"
```

寫入文字到檔案中

```bash
echo "Hi" > file.txt
```

附加內容到檔案尾端
```bash
echo "Hello" >> file.txt
```

cat: 顯示檔案內容

```bash
cat 1.txt
```

printf: 打印內容到終端機上(相較於echo，這種作法不會在末端換行)

## 套件管理

更新套件

```bash
sudo apt-get update
```

安裝套件

```bash
sudo apt-get install [套件...]
```

移除套件

```bash
sudo apt-get remove [套件...]
```

移除套件與其他相依套件

```bash
sudo apt-get autoremove [套件...]
```

查找套件的路徑

```bash
whereis <套件>
```

```bash
which <套件>
```
會回傳一個路徑，此路徑可能只是一個路口(如卓面連結, 製作替身, 軟連結)，而不是軟體實際的路徑

如使用
```bash
which vim # 得到 /usr/bin/vim
ls -al /usr/bin/vim # 得到lrwxrwxrwx 1 root root 21 Aug 27 12:08 /usr/bin/vim -> /etc/alternatives/vim
ls -al /etc/alternatives/vim # 得到 lrwxrwxrwx 1 root root 18 Aug 27 12:08 /etc/alternatives/vim -> /usr/bin/vim.basic
```

# DNS(全寫)

Domain Name Service: 主要用來將IP對應網址的服務，實務上會取解析網址成IP，在使用IP來找尋目標/etc/resolv.conf檔案就是用來管理Name Service

# Web Server(Apache)

總Port有65536(0xffff)數量網站預設是走80 Port；HTTPS是443 Port; ssh對應的是22 Port

.htaccess檔案為專用Apache的設定檔案，但其他Nginx也可以讀取，但只有部分功能

/etc/apache2/apache2.conf為apache的核心工設定，裏頭有很多Directory，其功能是累加的

```bash

set  158
<Directory>設定Apache可以存取的路徑</Directory>
```

top: 列出目前進程，其本身也是一個進程

```bash
sudo service apache2 restart
```

/etc/apache2/sites-enabled/000-default.conf定義的內容?? DOCUMENTROOT

