docker run --name postgres -e POSTGRES_USER=lucas -e POSTGRES_PASSWORD=lucas -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker exec -it postgres /bin/bash

docker run --name adminer -p 8080:8080 --link postgres -d adminer

