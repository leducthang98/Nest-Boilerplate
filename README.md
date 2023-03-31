# nestjs-project

## require:
- docker
- nodejs >=16.0.0
- yarn >=1.22.0

### copy .env
```
cp .env.example .env
```

### run infrastructure services (db, redis):
```
docker-compose up -d
```

### migrate database:
```
yarn typeorm:migrate
```

### start dev:
```
yarn install
yarn start:dev
```

### start prod:
```
yarn install
yarn build
yarn start:prod
```

### generate new modules:
```
nest g res ${module-name} modules
// NOTE: remember to import typeorm entities
```