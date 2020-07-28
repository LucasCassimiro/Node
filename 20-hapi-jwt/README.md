docker run --name postgres -e POSTGRES_USER=lucas -e POSTGRES_PASSWORD=lucas -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker exec -it postgres /bin/bash

docker run --name adminer -p 8080:8080 --link postgres -d adminer



docker run \
    --name postgres \
    -e POSTGRES_USER=erickwendel \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'lucas', pwd: 'lucas', roles: [{role: 'readWrite', db: 'herois'}]})"

 mongo mongodb:27017  -u lucas -p lucas --authenticationDatabase herois

 docker exec -it mongodb mongo -u lucas -p lucas --authenticationDatabase herois

Para conectar:
Rodar o container do mongo:4 (mongodb); 3bc02501c883
Encontrar o id do container da imagem mongoclient/mongoclient; 0faf6a7a47c3
Startar o container de id encontrado (se precisar); a71f25d8668f
Rodar a imagen do mongoclient/mongoclient.

Postgres: 01d5506bc818  adminer: 9c515af40a41

3bc02501c883 0faf6a7a47c3 01d5506bc818 9c515af40a41