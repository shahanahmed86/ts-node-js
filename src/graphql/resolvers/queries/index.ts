import admin from './admin.query';
import user from './user.query';
import common from './common.query';

const Query = Object.assign({}, admin, user, common);

export default Query;
