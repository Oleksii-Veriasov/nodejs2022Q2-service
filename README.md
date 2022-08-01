# Using Docker Compose
create .env
```
"PORT=4000

POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
"
```
Here is the `docker-compose.yml` that powers the whole setup.

```yaml
version: '3.5'
services:
  nest-api:
    container_name: nest-api
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - ${PORT}:${PORT}
    depends_on:
      - postgres
    volumes:
      - "../.app:/var/lib/app"
    env_file:
      - .env
    networks:
      - nest-postgres-network

  postgres:
    container_name: postgres
    build:
      context: .
      dockerfile: /postgres/Dockerfile
    restart: always
    ports:
      - ${DB_PORT}:${DB_PORT}
    env_file:     
      - .env
    volumes:
      - "../.postgres:/var/lib/postgresql/data"
    networks:
      - nest-postgres-network

volumes:
  postgres:
  app: 
networks:
  nest-postgres-network:
    name: nest-postgres-network
    driver: bridge
```

## Installing docker containers
Run all containers with comand 
```
docker-compose up
```
## Restart docker container with App
```
docker restart nest-api
```
## Restart docker container with Postgres DB
```
docker restart postgres
```