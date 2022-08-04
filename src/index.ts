import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer as enablePlayground,
	ApolloServerPluginLandingPageLocalDefault as disablePlayground,
} from 'apollo-server-core';
import http from 'http';
import app from './restful';
import { IN_PROD, PORT } from './config';
import { resolvers, typeDefs } from './graphql';

const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: 'bounded',
	plugins: [IN_PROD ? disablePlayground({ embed: true }) : enablePlayground({ httpServer })],
});

server.start().then(() => {
	server.applyMiddleware({ app, path: '/graphql', cors: false });

	httpServer.listen(PORT, (): void => {
		console.log(`Server is running at http://localhost:${PORT}`);
	});
});

export default server;
