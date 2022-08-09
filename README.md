# Typescript NodeJs Server with Graphql/Restful

## Installation

```sh
# Clone
git clone git@github.com:<username>/<repository_name>.git && cd <repository_name>

# development mode
npm run up:dev # start
npm run down:dev # end
npm run down:dev_hard # end with clearing data from the database

# production mode
npm run up:prod # start
npm run down:prod # end
```

## mysql

```sh
# docker to open bash
docker exec -it <container_name> bash

# docker to open mysql
docker exec -it <container_name> mysql -u<user> -p<password> -h<host> <name>

# <name> is the database name

# flags
-it # for interactive
-u # for username
-p # for password
-h # for host
```

## git
```sh
git commit -m "message" --no-verify
# flags
--no-verify # it will not call pre-hook of commit where tests/linting will execute

```
