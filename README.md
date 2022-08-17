# @shahanahmed86/ts-app

## Prerequisites

- ### Resources
  - [Docker Engine](https://get.docker.com/ 'https://get.docker.com/')
  - [Docker Compose](https://docs.docker.com/engine/install/ubuntu/ 'https://docs.docker.com/engine/install/ubuntu/')
  - [NODE](https://nodejs.org/en/ 'https://nodejs.org/en/') or [NVM](https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm 'https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm')
  - [Make](https://linuxhint.com/install-make-ubuntu/ 'https://linuxhint.com/install-make-ubuntu/')
- ### Knowledge
  - Typescript
  - Restful
  - GraphQL with custom directives
  - Docker architecture
  - Container orchestration with docker-compose **_(at-least)_**
  - node:16 and its npm installer

## Implemented Feature

- User authentication APIs
- File Upload with express-fileupload
- Pre-commit hook to check linting/testing and formatting
- Chai & Mocha used to cover unit/api testing

## Installation

```sh
# Clone
git clone git@github.com:shahanahmed86/ts-app.git && cd ts-app-main

# to initiate the server run
node setup

# flags
--yes || -Y # to skip question and go with default options
--force-reinstall || -F # to reinstall

# make a docker image
make build-image
make run-dev-up-rebuild

# development mode
npm run dev:up # start
npm run dev:down # end
npm run down:dev_hard # end with clearing data from the database

# production mode
make run-prod-up # start
make run-prod-down # end
```

## server
```sh
# execute bash inside of the container
docker exec -it <container_name> bash

# migrations can only run in development environment
# because start script has a pre script that run migration for it
# copy the DATABASE_URL from your secrets or .env file and
# paste the url and replace the @<host> with @localhost
# for example:
DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run db:deploy
# or replace the run-migration value in the Makefile like above and run
make run-migration

# to run test cases while development run like:
DATABASE_URL="mysql://root:prisma@localhost:3306/mydb" npm run --ignore-scripts exec-tests
# or replace the run-test value in the Makefile like above and run
make run-test
```

## mysql

```sh
# execute bash inside of the container
docker exec -it <container_name> bash

# execute  open mysql
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

## nginx
```sh
# to reload nginx run this command
docker exec <container> nginx -s reload
```

## Development hacks
```sh
# ec2 or any other instance of linux
echo "Host ssh-app
  StrictHostKeyChecking no
  Hostname <ip>
  User <user>
  IdentityFile <path/to/file.pem>\n" >> ~/.ssh/config

# to ssh into the server, run this in your terminal
ssh ssh-app

# you can make an alias in your bashrc or zshrc file or create
# the script in the Makefile

# make short aliases to run bigger commands
alias make_server_image="docker build -t <image_name>:<tag> path/to/project-folder && docker push <image_name>:<tag> && docker save -o path/to/image.tar <image_name>:<tag>"

# an alias can also be called in another alias
alias ssh_deploy_server_prod="make_server_image && scp path/to/image.tar ssh-app:image.tar && ssh ssh-app 'docker load -i image.tar && cd path/to/project && git pull && make run-prod-up'"

# I preferred uploading tar file of the docker image to the 
# server rather than building a docker build on it because
# it will be consuming server resources.

# Now only need to know is to run the aliases which you've created.
```
NOTE: in order to avoid prompt on git pull command on ssh_deploy_server_prod alias you need add ssh id_rsa.pub key to your github authorized SSH Keys
[SSH Keys](https://github.com/settings/keys 'https://github.com/settings/keys')