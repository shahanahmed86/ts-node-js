import { default as Admin } from './admin.relation';
import { default as User } from './user.relation';
import { default as SignUp } from './signup.relation';

const relations = Object.create({ Admin, User, SignUp });

export default relations;
