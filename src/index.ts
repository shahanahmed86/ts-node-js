import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { createServer } from 'http';
import app from './restful';
import { APP_PORT } from './config/app.config';
import { directives, resolvers, typeDefs } from './graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { graphqlCatch as formatError } from './utils/errors.utils';
import { sessionTask } from './library/cron.library';

let schema = makeExecutableSchema({ typeDefs, resolvers });

Object.entries(directives).forEach(([key, directive]): void => {
	schema = directive(schema, key);
});

const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
	schema,
	csrfPrevention: true,
	cache: 'bounded',
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						await serverCleanup.dispose();
					},
				};
			},
		},
		ApolloServerPluginLandingPageLocalDefault({ embed: true }),
	],
	context: ({ req, res }) => ({ req, res }),
	formatError,
});

server
	.start()
	.then(() => {
		server.applyMiddleware({ app, path: '/graphql', cors: false });

		httpServer.listen(APP_PORT, (): void => {
			sessionTask.start();
			console.log(`Server is running at http://localhost:${APP_PORT}`);
		});
	})
	.catch(() => sessionTask.stop());

export default httpServer;
