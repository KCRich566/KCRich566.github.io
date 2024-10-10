---
layout: blog
title: "[Others] netsh"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: netsh
---

netsh 是 Windows 中的命令行工具，用來配置和管理網絡設置。它可以用來查看、修改和診斷網絡配置，包括防火牆、IP 地址、無線網絡等。以下是一些常見的 netsh 用法教學：

## 查看網絡接口配置信息

```bash
# windows bash
netsh interface ipv4 show config
```

這條命令會顯示所有網絡接口的 IPv4 配置信息，如 IP 地址、子網掩碼和網關。

## 設置靜態 IP 地址
如果需要將一個網卡的 IP 地址設置為靜態：

```bash
# windows bash
netsh interface ip set address "本地連接" static 192.168.1.100 255.255.255.0 192.168.1.1
```

此命令將 "本地連接" 網卡的 IP 地址設置為 192.168.1.100，子網掩碼為 255.255.255.0，網關為 192.168.1.1。

## 設置自動獲取 IP 地址 (DHCP)

要設置網卡使用 DHCP 來自動獲取 IP 地址：

```bash
# windows bash
netsh interface ip set address "本地連接" dhcp
```

## 配置 DNS 伺服器

設置首選 DNS 伺服器：

```bash
# windows bash
netsh interface ip set dns "本地連接" static 8.8.8.8
```

設置次選 DNS 伺服器：

```bash
# windows bash
netsh interface ip add dns "本地連接" 8.8.4.4 index=2
```

## 查看無線網絡配置

查看所有無線網絡的配置：

```bash
# windows bash
netsh wlan show profiles
```

顯示具體的無線網絡配置：

```bash
# windows bash
netsh wlan show profile name="網絡名稱" key=clear
```

此命令可以查看存儲的 Wi-Fi 密碼。

## 開啟或關閉防火牆

開啟防火牆：

```bash
# windows bash
netsh advfirewall set allprofiles state on
```

關閉防火牆：

```bash
# windows bash
netsh advfirewall set allprofiles state off
```

## 重置 TCP/IP 協議

如果遇到網絡連接問題，重置 TCP/IP 協議可能會有幫助：

```bash
# windows bash
netsh int ip reset
```

這會將 TCP/IP 協議設置重置為默認值。

## 查看防火牆規則

查看當前的防火牆入站規則：

```bash
# windows bash
netsh advfirewall firewall show rule name=all
```

## 添加防火牆規則

如果需要允許一個應用通過防火牆：

```bash
# windows bash
netsh advfirewall firewall add rule name="MyApp" dir=in action=allow program="C:\Path\To\MyApp.exe" enable=yes
```

## 刪除防火牆規則

要刪除防火牆規則：

```bash
# windows bash
netsh advfirewall firewall delete rule name="MyApp"
```

## 結語

netsh 是一個強大的網絡配置工具，可以自動化許多網絡設置任務，特別是當你需要批量操作或遠程管理網絡配置時。熟悉這些命令可以幫助你更好地管理 Windows 網絡環境。



## 停用自動 IP 配置（APIPA）

當 DHCP 無法分配 IP 時，Windows 會自動使用 APIPA 地址。以下是停用這項功能的步驟：

開啟命令提示符 以管理員身份運行（右鍵點擊 "開始" > "命令提示符（管理員）" 或 "Windows PowerShell（管理員）"）。

查看網絡接口名稱

首先，查看網絡接口的名稱，這個名稱會在後續命令中使用：

```bash
# windows bash
netsh interface ipv4 show interfaces
```

停用自動配置
找到網絡接口名稱後，使用下面的命令停用自動配置：

```bash
# windows bash
netsh interface ipv4 set interface "本地連接" dadtransmits=0 store=persistent
netsh interface ipv4 set interface "本地連接" routerdiscovery=disabled
```

將 "本地連接" 替換為你的實際網絡接口名稱。

dadtransmits=0: 停用重複地址檢測 (Duplicate Address Detection)，從而阻止 Windows 自動配置地址。
routerdiscovery=disabled: 停用路由器發現協議，這樣 Windows 不會自動嘗試獲取網關信息。
確保使用靜態 IP 或 DHCP 配置: 為了確保網絡接口使用靜態 IP 或是通過 DHCP 正常配置，可以使用以下命令：

設置靜態 IP 地址

```bash
# windows bash
netsh interface ip set address name="本地連接" static 192.168.1.100 255.255.255.0 192.168.1.1
```
或

設置 DHCP 配置

```bash
# windows bash
netsh interface ip set address name="本地連接" dhcp
```

使用命令來禁用和重新啟用網絡適配器：

```bash
# windows bash
netsh interface set interface "本地連接" admin=disable
netsh interface set interface "本地連接" admin=enable
```

這樣可以確保系統不會自動分配 APIPA 地址，並使用你配置的網絡設置。
