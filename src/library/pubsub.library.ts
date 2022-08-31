import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const SESSION_EXPIRED = 'SESSION_EXPIRED';

export default pubsub;
