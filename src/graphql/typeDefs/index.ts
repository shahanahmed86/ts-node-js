import rootSchema from './root.typeDefs';
import adminSchema from './admin.typeDefs';
import userSchema from './user.typeDefs';
import commonSchema from './common.typeDefs';

const typeDefs = [rootSchema, adminSchema, userSchema, commonSchema];

export default typeDefs;
