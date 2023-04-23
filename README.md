# nest boilerplate

## features:
- eslint
- dockerize
- swagger
- typeorm
- logger
- cron-job
- exception-filter
- response-format 
- health-check-module
- auth-module
    - login
    - register
    - refresh-token
    - revoke-token

## technical requirements:
- docker
- docker-compose
- nodejs >=16.0.0
- yarn >=1.22.0

## installation guide:
#### 1. prepare project's configurations:
```
.env.example
docker-compose.yaml
package.json
```

#### 2. copy `.env`
```
cp .env.example .env
```

#### 3. run infrastructure services:
```
docker-compose up db redis -d
```

#### 4. prepare migration (please read MIGRATION-GUIDE.md, and then manually perform the migration following the steps outlined in the guide):
```
cat src/migrations/MIGRATION-GUIDE.md
```

#### 5.1. start dev:
```
yarn install
yarn start:dev
```

#### 5.2. start prod:
```
yarn install
yarn build
yarn start:prod
```

## other notes:
#### generate new modules:
```
nest g res ${module-name} modules
```
