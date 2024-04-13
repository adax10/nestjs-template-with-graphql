## NestJS starter with graphQL

## Installation

```bash
$ npm install
```

or using yarn

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Env configuration

```
NODE_ENV=development|production (optional enum NodeEnv, default development)
```

```
# express
API_PORT=3000 (optional number, default 3000)
API_HOST=0.0.0.0 (optional string, default 0.0.0.0)
```

```
# cors
CORS_ALLOWED_ORIGING=string (optional string, default *, for eg. http://localhost:3000)
```

```
# throttler
THROTTLER_LIMIT=100 (optional number, default 100 - count of request in time window)
THROTTLER_TTL_S=60 (optional number, default 60 - time window)
```

```
# body parser
MAX_FILE_SIZE_KB=20971520 (optional number, default 20971520 - 20MB)
```

```
# graphql
USE_GQL_PLAYGROUND=true (optional boolean, default false)
```
