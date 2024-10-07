---
layout: blog
title: "02-Ubuntu"
date: 2024-09-07 09:56:00 +0800
language: zh
lang: zh
categories: Ubuntu
---

在 Ubuntu 和其他類 Unix 操作系統中，PATH 是一個環境變量，它告訴系統在哪些目錄中尋找可執行程序或命令。當你在終端中輸入命令時，系統會根據 PATH 環境變量中定義的路徑來查找對應的可執行文件。如果沒有在 PATH 中找到該命令，就會出現 "command not found" 的錯誤。

如何查看 PATH
要查看當前的 PATH 設置，可以使用以下命令：

bash
複製程式碼
echo $PATH
這將輸出一個以冒號 : 分隔的目錄列表。例如：

bash
複製程式碼
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
這個列表中的每個目錄都是系統在執行命令時會搜索的路徑。當你在終端中輸入 ls 或 vim 等命令時，系統會在這些目錄中尋找對應的可執行文件。

如何修改 PATH
你可以通過編輯 shell 配置文件（如 ~/.bashrc 或 ~/.profile）來永久更改 PATH。

打開 .bashrc 文件：

bash
複製程式碼
nano ~/.bashrc
在文件末尾添加新的路徑。例如，要將 /opt/myprogram/bin 添加到 PATH，可以在文件末尾添加：

bash
複製程式碼
export PATH=$PATH:/opt/myprogram/bin
保存並退出編輯器（如果使用 nano，按 Ctrl + X，然後按 Y 保存）。

重新加載 .bashrc 文件：

bash
複製程式碼
source ~/.bashrc
這樣，你新添加的路徑就會生效，並在之後的終端會話中自動應用。

添加 PATH 的用途
當你安裝新的程序或工具到非標準目錄（例如 /opt/ 或自定義的腳本目錄）時，將這些目錄添加到 PATH 中，方便你在任何位置都能夠執行這些程序，而不必輸入完整路徑。

總結
PATH 是一個環境變量，定義了系統在哪些目錄中查找命令。
可以通過 echo $PATH 查看當前路徑。
可以通過編輯 ~/.bashrc 等文件來修改和擴展 PATH。


在 Linux 或其他類 Unix 操作系統中，export 和 source 是兩個常用的命令，分別用來設置環境變量和加載腳本或配置文件。以下是它們的作用及區別：

1. export 是什麼？
export 命令用來將變量設置為環境變量，使它們可以在當前 shell 以及從這個 shell 派生出的所有子進程中使用。這意味著，當你使用 export 將一個變量設置為環境變量後，該變量在子進程中也會被繼承和使用。

使用範例：
bash
複製程式碼
MY_VAR="hello"
export MY_VAR
在這裡，MY_VAR 被設置為環境變量。設置環境變量後，這個變量會在當前終端的所有子進程中可用。如果你啟動了一個新的 shell 或執行一個腳本，它們都可以訪問這個變量。

不使用 export 的情況：
如果你只是使用如下命令：

bash
複製程式碼
MY_VAR="hello"
那麼 MY_VAR 變量只會在當前 shell 會話中可用，不會傳遞給任何子進程。例如，如果你在這個 shell 中運行另一個程序或腳本，它們將無法使用 MY_VAR。

2. source 是什麼？
source 命令用來讀取和執行當前 shell 的腳本文件，與直接運行腳本不同的是，source 不會啟動一個新的子進程，而是在當前 shell 中執行腳本中的命令。這通常用於重新加載配置文件（如 .bashrc、.profile）以使更改立即生效，而不必重新打開終端。

使用範例：
bash
複製程式碼
source ~/.bashrc
這個命令會在當前 shell 中執行 ~/.bashrc 文件中的所有命令，讓配置更改立即生效，而不需要登出或重啟終端。

source 的作用：
當你修改了環境變量或其他配置文件時，使用 source 可以使這些變更在當前會話中生效，而不必重啟 shell。
用來執行腳本中的命令，而不啟動新的 shell 進程。
区别：
export：用來將變量導出到環境中，使其在當前 shell 及其子進程中都可用。
source：用來在當前 shell 中讀取和執行腳本，並立即應用腳本中的配置或變更，而不會啟動新的 shell 進程。
3. source 和 . 的關係
在 Bash 中，source 和 . 是等價的。你可以使用任何一個來加載腳本。例如：

bash
複製程式碼
. ~/.bashrc
這和使用 source ~/.bashrc 是一樣的效果。

總結
export：將變量設為環境變量，使其在當前 shell 及子進程中可用。
source：執行腳本文件中的命令，並在當前 shell 中加載變更或配置，不啟動新的進程。


systemctl 是一個用來管理 systemd 服務管理器的命令行工具。systemd 是現代 Linux 發行版的初始化系統（init system），負責管理系統啟動時的各種服務和進程。

使用 systemctl，你可以啟動、停止、重啟、啟用或禁用系統服務，檢查服務的狀態，以及管理系統和服務的開機自動啟動行為。

常見的 systemctl 命令
啟動服務

bash
複製程式碼
sudo systemctl start service_name
這會啟動指定的服務，例如啟動 MySQL 服務：

bash
複製程式碼
sudo systemctl start mysql
停止服務

bash
複製程式碼
sudo systemctl stop service_name
重啟服務

bash
複製程式碼
sudo systemctl restart service_name
檢查服務狀態

bash
複製程式碼
sudo systemctl status service_name
這會顯示指定服務的運行情況和日誌信息，例如：

bash
複製程式碼
sudo systemctl status nginx
啟用服務（開機自啟動）

bash
複製程式碼
sudo systemctl enable service_name
這會配置服務在系統啟動時自動啟動。

禁用服務（取消開機自啟動）

bash
複製程式碼
sudo systemctl disable service_name
列出所有正在運行的服務

bash
複製程式碼
sudo systemctl list-units --type=service
查看 systemd 的日誌

bash
複製程式碼
journalctl
systemctl 與 systemd 的作用
systemd 是負責啟動和管理系統進程的核心管理工具。
systemctl 是與 systemd 交互的命令，用來控制和管理服務、掛載點、目標單元等。
舉例來說，當你使用 systemctl start mysql，systemd 會根據定義的服務單元檔案來啟動 MySQL 服務並進行管理。