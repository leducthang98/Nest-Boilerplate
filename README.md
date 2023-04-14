# nestjs-project

## require:
- docker
- nodejs >=16.0.0
- yarn >=1.22.0

### change to your project configs (name, port):
```
.env.example
docker-compose.yaml
package.json
```

### copy .env
```
cp .env.example .env
```

### run infrastructure services (db, redis):
```
docker-compose up -d
```

### prepare migration (manual):
```
cat src/migrations/MIGRATION-GUIDE.md
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
```
