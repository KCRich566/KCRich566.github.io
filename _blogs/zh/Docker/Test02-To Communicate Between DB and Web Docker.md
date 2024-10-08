---
layout: blog
title: "[Docker] Test02-To Communicate Between DB and Web Docker"
date: 2024-09-27 00:00:00 +0800
language: zh
lang: zh
categories: docker
---

使用Web docker來訪問db docker的數據

## 使用docker的一般安裝

拉取鏡像

```bash
# windows bash
docker pull mysql:5.7
docker pull python:3.9
```

建立db容器

```bash
# windows bash
docker run -it --name db --network my_network -e MYSQL_ROOT_PASSWORD=example -e MYSQL_DATABASE=mydb mysql:5.7
```
Ctrl+Z Ctrl+C退出

建立一個app資料夾來存放web的資料

建立web容器

```bash
# windows bash
docker run -it --name web --network my_network -p 5000:5000 -e DATABASE_HOST=db -e DATABASE_USER=root  -e DATABASE_PASSWORD=example  -e DATABASE_NAME=mydb -v {app資料夾位置}:/app python:3.9 /bin/bash
```

確認重啟是否啟動

```bash
# windows bash
docker start web
docker start db
```

在web容器中

```bash
# ubuntu bash
apt update
apt install nano
pip install --upgrade pip
pip install --user flask mysql-connector-python 
python /app/app.py
```



docker exec -it web /bin/bash

## 使用docker-compose

首先要先在一個資料夾並放入docker-compose.yml的檔案，以及建立app檔案並且放入app.py檔案

```python
# app\app.py

from flask import Flask, request, jsonify
import mysql.connector
import os

app = Flask(__name__)

def get_db_connection():
    conn = mysql.connector.connect(
        host=os.getenv('DATABASE_HOST', 'db'),
        user=os.getenv('DATABASE_USER', 'root'),
        password=os.getenv('DATABASE_PASSWORD', 'example'),
        database=os.getenv('DATABASE_NAME', 'mydb')
    )
    return conn

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users;')
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)

@app.route('/users', methods=['POST'])
def create_user():
    new_user = request.get_json()
    name = new_user['name']
    email = new_user['email']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (name, email) VALUES (%s, %s)', (name, email))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(new_user), 201

@app.route('/initdb', methods=['GET'])
def init_db():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DATABASE_HOST', 'db'),
            user=os.getenv('DATABASE_USER', 'root'),
            password=os.getenv('DATABASE_PASSWORD', 'example'),
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DATABASE_NAME', 'mydb')};")
        cursor.execute('USE mydb;')  # 切換到 mydb 數據庫
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100)
            );
        ''')
        conn.commit()
        cursor.close()
        conn.close()
        return "Database initialized!"
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

```

在 Docker Compose 中，服務的名稱可以作為主機名來訪問其他服務。這意味著你可以使用服務的名稱（即在 docker-compose.yml 文件中的 services 部分定義的名稱）來作為數據庫連接的主機名。


```YAML
# docker-compose.yml
version: '3.8'

services:
  web:
    image: python:3.9  # Python 3.9 映像
    ports:
      - "5000:5000"  # 對應的主機和容器端口
    volumes:
      - ./app:/app  # 將當前目錄的 app 文件夾掛載到容器
    working_dir: /app  # 設定容器內的工作目錄
    command: /bin/bash -c "pip install flask mysql-connector-python && python app.py"  # 安裝 Flask 和 MySQL 連接器並啟動應用
    environment:
      - DATABASE_HOST=db  # MySQL 資料庫的主機名，Docker Compose 自動解析服務名稱
      - DATABASE_USER=root
      - DATABASE_PASSWORD=example
      - DATABASE_NAME=mydb
    depends_on:
      - db  # 確保 db 服務先啟動

  db:
    image: mysql:5.7  # 使用 MySQL 5.7 映像
    environment:
      MYSQL_ROOT_PASSWORD: example  # MySQL root 密碼
      MYSQL_DATABASE: mydb  # 預設創建的資料庫名稱
    volumes:
      - db_data:/var/lib/mysql  # 持久化數據

volumes:
  db_data:

```

```bash
# windows bash
docker-compose up
```



初始化DB、建立使用者並且驗證是否執行成功

```bash
# windows bash
curl http://localhost:5000/initdb
curl -X POST http://localhost:5000/users -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"email\": \"john@example.com\"}"
curl http://localhost:5000/users
```

```bash
# windows bash
docker-compose down
```


在 Docker 中，使用 -v 參數來掛載卷（volumes）是為了持久化數據。這特別重要，因為 Docker 容器本身是無狀態的，當容器停止或刪除後，所有容器內的數據都會丟失。因此，將數據存儲在宿主機的卷中可以防止數據丟失，特別是像數據庫這樣需要長期保存的數據。因為Docker容器的無狀態特性： 每次容器被重啟或刪除時，容器內部的數據會丟失。如果不使用卷來保存數據，容器中的所有變更，包括數據庫中的數據，都會消失。

數據庫需要持久化數據： 數據庫（如 MySQL、PostgreSQL）通常需要將數據存儲到磁盤，這樣在服務器重啟、容器重啟或升級時，數據不會丟失。如果數據庫的數據僅存儲在容器內部，則容器一旦停止，這些數據就會丟失。因此，必須使用 -v 參數將數據保存到宿主機的持久存儲中。

方便備份與恢復： 將數據存儲到外部卷中，可以方便地進行數據的備份、恢復或遷移到另一個環境。

如何使用 -v 掛載卷來儲存數據：
使用 docker run 命令中的 -v 參數將宿主機的某個目錄掛載到容器內的某個目錄。對於數據庫來說，通常是掛載數據庫的數據目錄。例如：

```bash
# windows bash
docker run -d \
  -v /path/on/host:/var/lib/mysql \
  --name mysql-container \
  mysql:latest
  ```
/path/on/host 是宿主機上保存數據的目錄。
/var/lib/mysql 是容器內部 MySQL 用來存儲數據的目錄。
這樣，數據會保存到宿主機的 /path/on/host，即使容器被刪除或重新啟動，數據依然會保持完整。

總結：
使用 -v 掛載卷是為了持久化數據，特別是對於像數據庫這樣的應用，保存數據庫數據到宿主機是防止數據丟失的關鍵。






你說：
Docker 容器的無狀態特性： 每次容器被重啟或刪除時，容器內部的數據會丟失。如果不使用卷來保存數據，容器中的所有變更，包括數據庫中的數據，都會消失

那我安裝的東西也會消失嗎?
ChatGPT 說：
ChatGPT
是的，Docker 容器的無狀態特性意味著如果容器被刪除或重建，容器內的所有變更，包括你在運行中的容器內安裝的軟體，都會丟失。這是因為每次運行或重啟 Docker 容器時，容器會根據定義的 Docker 映像（image）進行重建，而映像本身是靜態的，無法保存運行時的變更。

如何避免安裝的軟體丟失？
構建自定義映像： 如果你想保留容器內安裝的軟體，應該將這些安裝步驟寫入 Dockerfile 中，然後構建自定義的 Docker 映像。這樣，軟體就會成為映像的一部分，不會在容器重啟或刪除後丟失。

例如：

```dockerfile
# dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y vim curl
```
然後構建映像：

```bash
# windows bash
docker build -t mycustomimage .
```



接下來每次你使用這個映像運行容器時，vim 和 curl 會自動安裝好。

使用卷（volumes）來保存數據： 卷僅用於保存容器的持久數據，比如數據庫數據。至於軟體本身，必須通過映像進行持久化。因此，即使你使用了卷來保存數據，運行時安裝的軟體仍然會丟失，除非它們已經包含在映像中。

總結：
數據 可以使用卷來持久化。
安裝的軟體 必須在 Dockerfile 中進行定義，然後構建成映像，否則在容器刪除或重啟後，軟體會丟失。

2/2

你說：
那我不用刪除與重建的話，容器仍然會保存我的資料呀，那我會合還要-v來掛載
ChatGPT 說：
ChatGPT
如果你不刪除或重建容器，那麼容器內的數據和安裝的軟體會暫時保留。但問題在於，Docker 容器並不是為長期運行設計的，它們經常會因為各種原因（例如重新啟動、更新、升級等）而被停止或刪除。因此，依賴容器的內部存儲是風險較大的做法。

為什麼即使不刪除容器，仍然建議使用 -v 掛載卷？
避免意外丟失數據： 如果容器因為某些原因崩潰或被重啟，沒有使用卷的話，容器內的數據可能會永久丟失。而掛載卷後，數據會保存在宿主機上，即使容器崩潰或刪除，數據仍然會被保留。

容器的臨時性： 即便你長期運行某個容器，Docker 容器的設計理念是“可替換、可重建”。如果你需要更新映像或配置，一般會刪除舊容器並啟動新容器。使用卷來保存數據確保在這種情況下不會丟失重要的資料。

容器更新和升級的需要： 當你需要更新某個應用或系統環境時，通常會重新構建映像並啟動新的容器。這樣做會丟失原來容器中的數據，除非你使用了卷來保留數據。

數據備份和恢復方便： 使用卷將數據存儲在宿主機上，讓數據備份變得更簡單。如果你不使用卷，數據只能存儲在容器內，備份和恢復都會變得非常複雜。

使用卷的最佳實踐：
數據庫服務：數據庫類型的服務（如 MySQL、PostgreSQL）一定要使用卷，這樣你可以安全地重啟容器或升級應用，而不會丟失數據。

應用程序配置或數據：像 Redmine、WordPress 這類應用也需要使用卷來保留數據或配置文件，以確保容器重啟後配置不會丟失。

總結：
即使你暫時不打算刪除或重建容器，使用卷來保存數據仍然是個好習慣，因為這能確保在容器崩潰、意外刪除或更新的情況下不會丟失重要數據。此外，掛載卷還能方便地進行數據備份和遷移。