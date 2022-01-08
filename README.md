# save-felica

## 概要
read-felica のバックエンドとして使用される。 read-felicaより送付されたデータを受信後、それをCSVなどで読み解き、結果をSequelizeを使ってデータベースに格納する。
重複するものがあった場合は duplicate でエラーになる。

The backend server for read-felica. After receiving the transit history from read-felica, it converts the data to something human-readable, and then stores it to the database. 
The database connection is handled by Sequelize, and when one of the transits was already in the database, the whole transaction fails.

## TODO
<ul>
<li> bulk insert になっているので、それを訂正する </li>
<li>it uses a bulk insert, so need to make it atomic.</li>
<li> node_modules が含まれているので諸々訂正する </li>
<li> node_modules, which aren't necessary because they are dependencies that can be resolved by doing <code>npm install</code>, so learn how to properly do <code>.gitignore</code></li>
</ul>

## 使い方 How to use
First, get yourself a mysql for storage. For example by using <code>docker-compose.yml</code> like this!
     
      version: '3.1'

      services:
        mysql:
          image: mysql
          restart: unless-stopped
          ports:
            - 3306:3306
          environment: 
            MYSQL_ROOT_PASSWORD: password
          volumes:
            - mysqlvolume:/var/lib/mysql
        metabase:
          image: metabase/metabase
          restart: unless-stopped
          ports:
            - 3000:3000
          volumes:
            - metabasevolume:/metabase.db  
      volumes:
        mysqlvolume:
        metabasevolume:

Second,

     git clone https://github.com/ihs-ot-as/save-felica
     
     cd save-felica 
     
     nano ./config/config.json 
     #edit the connection as needed
     
     npm install 
     
     sequelize db:create
     sequelize db:migrate 
     #this should apply all the migraion scripts inside ./migrations
     #the database schema is done!
     
     node . -p some_random_string
     #oringally thought of encrypting the communication between the reader and the backend, 
     #so this was meant to be the password for the private key stored in the backend.
     #but it hasn't been implemented so it basically sits there and does nothing.
     


