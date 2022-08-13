run-dev-up:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.dev.yml up -d
run-dev-up-rebuild:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.dev.yml up -dV --build --no-deps server
run-dev-down:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.dev.yml down
run-dev-down-hard:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.dev.yml down -v

run-test-up:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.test.yml up --abort-on-container-exit --build
run-test-down:
	docker-compose -p ts-app -f docker-compose.yml -f docker-compose.test.yml down -v

run-prod-up:
	docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml ts-app
run-prod-down:
	docker stack rm ts-app

run-migration:
	DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run db:dev
