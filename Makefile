sync-db:
	find src/migrations -type f ! -name MIGRATION-GUIDE.md -delete
	yarn typeorm:generate
	yarn typeorm:migrate

run-prod:
	docker-compose build
	docker-compose up -d