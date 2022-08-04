# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```
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
## Create migration
```
npm run typeorm:generate
```
## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
