# Tarea 1
Para crear los datos en postgres ejecutar dentro de la carpeta postgres
```sh
./commands.sh
```

Para iniciar docker-compose meterse en carpeta docker, una vez ahi iniciar 
```sh
docker-compose up
```

Una vez levantado los contenedores ver IP de cada uno y modificar IP segun corresponda tarea-client/redis.js y tarea-server/postgres.js
```sh
docker inspect ID_CONTENEDOR
```

Luego ir tarea-client y tarea-server, en ambos ejecutar
```sh
npm i
```
```sh
npm start
```

Para la consulta de todos los url tenemos :
```sh
curl --location --request GET 'http://localhost:3000/crawler' -w "Tiempo: %{time_starttransfer} segundos\n"
```

Para la consulta de un url especifico (con la sql de prueba se tiene hasta 220 ID'S) :
```sh
curl --location --request GET 'http://localhost:3000/crawler/ID' -w "Tiempo: %{time_starttransfer} segundos\n"
```