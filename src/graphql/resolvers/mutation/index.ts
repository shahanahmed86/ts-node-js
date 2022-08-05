import admin from './admin.mutation';
import user from './user.mutation';

const Mutation = Object.assign({}, admin, user);

export default Mutation;
