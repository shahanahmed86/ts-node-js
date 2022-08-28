import { Admin } from './admin.relation';
import { User } from './user.relation';
import { SignUp } from './signup.relation';

const relations = Object.create({ Admin, User, SignUp });

export default relations;
