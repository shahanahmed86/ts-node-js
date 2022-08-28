import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer as enablePlayground,
	ApolloServerPluginLandingPageLocalDefault as disablePlayground,
} from 'apollo-server-core';
import http from 'http';
import app from './restful';
import { IN_PROD, APP_PORT } from './config/app.config';
import { directives, resolvers, typeDefs } from './graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlCatch as formatError } from './utils/errors.utils';

let schema = makeExecutableSchema({ typeDefs, resolvers });
Object.entries(directives).forEach(([key, directive]): void => {
	schema = directive(schema, key);
});

const httpServer = http.createServer(app);

const server = new ApolloServer({
	csrfPrevention: true,
	cache: 'bounded',
	schema,
	plugins: [IN_PROD ? disablePlayground({ embed: true }) : enablePlayground({ httpServer })],
	context: ({ req, res }) => ({ req, res }),
	formatError,
});

server.start().then(() => {
	server.applyMiddleware({ app, path: '/graphql', cors: false });

	httpServer.listen(APP_PORT, (): void => {
		console.log(`Server is running at http://localhost:${APP_PORT}`);
	});
});

export default httpServer;
