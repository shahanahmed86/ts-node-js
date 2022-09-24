create-server-image:
	docker build -t shahandocker1986/ts-app-server:0.0.1 . && \
	docker push shahandocker1986/ts-app-server:0.0.1

run-dev-up:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.dev.yml \
	up -d
run-dev-up-rebuild:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.dev.yml \
	up -d --build --renew-anon-volumes
run-dev-down:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.dev.yml \
	down -v

run-test-up:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.test.yml up \
	--abort-on-container-exit --build
run-test-down:
	docker-compose -p ts-app \
	-f docker-compose/docker-compose.yml -f docker-compose/docker-compose.test.yml \
	down -v

run-prod-up:
	docker stack deploy \
	-c docker-compose/docker-compose.yml -c docker-compose/docker-compose.prod.yml \
	ts-app
run-prod-down:
	docker stack rm ts-app

# only for dev environment
run-migration:
	DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run db:dev
run-test:
	DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run --ignore-scripts exec-tests
