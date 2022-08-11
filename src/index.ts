import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer as enablePlayground,
	ApolloServerPluginLandingPageLocalDefault as disablePlayground,
} from 'apollo-server-core';
import http from 'http';
import app from './restful';
import { IN_PROD, APP_PORT } from './config';
import { directives, resolvers, typeDefs } from './graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

let schema = makeExecutableSchema({ typeDefs, resolvers });
Object.entries(directives).forEach(([key, directive]): void => {
	schema = directive(schema, key);
});

export const httpServer = http.createServer(app);

export const graphqlServer = new ApolloServer({
	csrfPrevention: true,
	cache: 'bounded',
	schema,
	plugins: [IN_PROD ? disablePlayground({ embed: true }) : enablePlayground({ httpServer })],
	context: ({ req, res }) => ({ req, res }),
});

graphqlServer.start().then(() => {
	graphqlServer.applyMiddleware({ app, path: '/graphql', cors: false });

	httpServer.listen(APP_PORT, (): void => {
		console.log(`Server is running at http://localhost:${APP_PORT}`);
	});
});
