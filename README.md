# learn-camel

install jbang via https://www.jbang.dev/documentation/guide/latest/installation.html

install camel via jbang app install camel@apache/camel

to execute

camel run --properties=application.properties



camel run --dep=com.zaxxer:HikariCP:6.0.0,org.postgresql:postgresql:42.6.0 --logging-level=debug --properties=application.properties jdbc-global.yaml 

camel run --dep=com.zaxxer:HikariCP:6.0.0,org.postgresql:postgresql:42.6.0 --logging-level=debug --properties=connection.properties jdbc-conn.yaml 
