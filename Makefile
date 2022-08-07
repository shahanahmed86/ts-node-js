run-dev-up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --detach

run-dev-down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

run-dev-down-hard:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --volume

run-prod-up:
	docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml ts-node-server

run-prod-down:
	docker stack rm ts-node-server

run-migration:
	DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run db:deploy
