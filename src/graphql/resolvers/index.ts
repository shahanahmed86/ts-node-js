import Mutation from './mutation';
import Query from './query';
import Relations from './relations';

const resolvers = Object.assign({ Query, Mutation }, Relations);

export default resolvers;
