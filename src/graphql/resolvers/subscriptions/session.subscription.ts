import { ResolverFn, withFilter } from 'graphql-subscriptions';
import { SESSION_EXPIRED, pubsub } from '../../../library';

const session: { subscribe: ResolverFn } = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(SESSION_EXPIRED),
		(payload, variables) => payload.session.debugMessage === variables.token,
	),
};

export default session;
