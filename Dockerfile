FROM node:16-bullseye-slim as base
ENV NODE_ENV=production
RUN apt-get update \
  && apt-get install -y --no-install-recommends default-mysql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
EXPOSE 4000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
HEALTHCHECK --retries=5 --timeout=5s CMD node /app/healthchecks/server-healthcheck.js

### dev stage
FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
RUN npm run build

### test stage
FROM dev as test
ENV NODE_ENV=development

FROM base as source

COPY --chown=node:node . .
COPY --from=dev /app/dist ./dist

### production stage
FROM source as prod
CMD [ "node", "index.js" ]
