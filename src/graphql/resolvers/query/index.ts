import admin from './admin.query';
import user from './user.query';

const Query = Object.assign({}, admin, user);

export default Query;
