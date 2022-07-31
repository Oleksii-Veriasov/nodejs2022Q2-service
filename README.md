# Using Docker Compose

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