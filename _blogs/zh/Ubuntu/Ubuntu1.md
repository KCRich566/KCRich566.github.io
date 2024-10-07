---
layout: blog
title: "01-Ubuntu"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Ubuntu
---

这个命令会显示详细的Ubuntu版本信息，包括发行版名称、版本号和代号


文本文件中搜尋符合指定模式的行:
```bash
grep [options] pattern [file...]
```

pattern：要搜尋的模式，可以是普通字符串或正則表達式。

file：要搜尋的文件。如果未指定文件，grep 將從標準輸入讀取數據

其常用參數:

-i：忽略大小寫。例如，grep -i "pattern" file.txt 將匹配 "pattern" 和 "PATTERN"。

-v：顯示不匹配模式的行。例如，grep -v "pattern" file.txt 將顯示不包含 "pattern" 的行。

-r 或 -R：遞歸搜尋目錄中的文件。例如，grep -r "pattern" /path/to/dir 會搜尋目錄及其子目錄中的所有文件。

-n：顯示匹配行的行號。例如，grep -n "pattern" file.txt 會在每行前顯示行號。

-l：僅顯示包含匹配模式的文件名。例如，grep -l "pattern" *.txt 會顯示所有包含 "pattern" 的文件名。

-c：顯示匹配模式的行數。例如，grep -c "pattern" file.txt 會顯示匹配 "pattern" 的行數。

-H：顯示匹配模式的文件名和行內容（默認在多個文件中顯示）。

-o：僅顯示匹配的部分。例如，grep -o "pattern" file.txt 只會顯示匹配的部分，而不是整行。

使用以下命令：

```bash
cat /etc/os-release
```
或是可以安裝lsb-release來查看,使用上要注意一下名稱

```
sudo apt-get install lsb-release
lsb_release -a
```

查看安裝的包:

以下兩著解渴以查看已安裝在系統上的軟體

```bash
dpkg -l
```

或是

```bash
apt list --installed
```


更新包列表：

apt-get install [-y] 元件

-y: 自动回答所有提示为“是”，如是否继续安装。

```bash
sudo apt-get update
```

这个命令会从配置的源服务器获取最新的软件包列表，并更新本地的包数据库。

升级已安装的软件包：

```bash
sudo apt-get upgrade
```

显示当前用户的用户名：

```bash
whoami
```

这个命令会返回当前正在使用的用户名。

显示用户详细信息：

```bash
id
```

这个命令会显示当前用户的UID（用户ID）、GID（组ID）以及附属的组信息。