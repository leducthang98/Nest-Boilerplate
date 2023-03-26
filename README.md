# nestjs-project

## require:
- docker
- nodejs >=16.0.0

### copy .env
```
cp .env.example .env
```

### run infrastructure services:
```
docker-compose up -d
```

### migrate database:
```
npm run typeorm:migrate
```

### start dev:
```
npm install
npm run start:dev
```

### start prod:
```
npm install
npm run build
npm run start:prod
```

### generate new modules:
```
nest g res ${module-name} modules
```