# save-felica

## 概要
read-felica のバックエンドとして使用される。 read-felicaより送付されたデータを受信後、それをCSVなどで読み解き、結果をSequelizeを使ってデータベースに格納する。
重複するものがあった場合は duplicate でエラーになる。

The backend server for read-felica. After receiving the transit histories from read-felica, this application converts them to something human-readable, and then stores it to the database. 
The database connection is handled by Sequelize, and when one of the transits was already in the database, the whole transaction fails.

## TODO
<ul>
<li> bulk insert になっているので、それを訂正する </li>
<li>it uses a bulk insert, so need to make it atomic.</li>
<li> <code>node_modules</code> が含まれているので諸々訂正する </li>
     <li> <code>node_modules</code>, which aren't necessary because they are dependencies that can be resolved by doing <code>npm install</code>, so learn how to properly do <code>.gitignore</code></li>
</ul>

## 使い方 How to use
日本語での説明は割愛

First, get yourself a mysql for storage. For example by using <code>docker-compose.yml</code> like this!
Metabase is only there just in case you fancy seeing what you've got via a BI tool.
     
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
     

## どうやって動くの how does it work
再度になるが、このコードは以下のQiitaの投稿なしではできなかった。深謝。

[https://qiita.com/gebo/items/cb2dd393170767852fb3](https://qiita.com/gebo/items/cb2dd393170767852fb3)

書かれている通りに読み替えているだけだが、読み替えるデータを逐次ファイルから読み出すと遅くなるので、
起動時にすべてメモリに読み込むように工夫している。結果、もしCSVなど変更があったら再起動しないと変更が適用されないことになるが、
それよりもパフォーマンスのほうが重要という判断である。


Once again, this code wouldn't have been possible without the following post on Qiita. Many thanks go to the creator of this post🌹

[https://qiita.com/gebo/items/cb2dd393170767852fb3](https://qiita.com/gebo/items/cb2dd393170767852fb3)

This program merely translates the incoming data before saving it to the database, and one detail that I paid attention to is that this program loads all the mappings and stuff into memory upon initialization. This is because reading files on the disk every time is extremely expensive. This means any change to these files requires a restart before they take effect, but in our case performance should be more important.

## その他改善点 how could I improve this code?
いわゆる enum 的なところは object つまり hashtable でもっているのだが、CSVに関してはただそのままarrayとして持っているだけである。
（JSのarrayはC#などのその他の言語にあるように linked list ではなくて hashtable で key がインデックスなのである...が、論点は同じで検索するときの O(n) は良くない）

一辺倒な検索の仕方しかしないので、これも key-value がたにしたほうが検索が早くなるのは言う間でもないが、データの加工を伴うためそこまで至っていない。



For data that could also be called enums, I store it as pure objects, which in JavaScript are treated as hashtables. However as for the data on stations, it's just an array.
(in JavaScript it's not actually a linked list as seen in languages like C#; rather it's an hashtable where the key is the index... but the problem remains the same, the O(n) isn't very good. )

Since the program only queries for a match always in the same way, I could modify the CSV and make it a pure JS object as well, but I haven't seen such a significant performance issue up until this point.




