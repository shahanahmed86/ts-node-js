import 'dotenv/config';

const PRE_BCRYPT_SALT = process.env.BCRYPT_SALT || '12';
export const BCRYPT_SALT = parseInt(PRE_BCRYPT_SALT);

export const JWT_SECRET = process.env.JWT_SECRET || 'pussy-cat';

const PRE_JWT_EXPIRES = process.env.JWT_EXPIRES || '3600000';
export const JWT_EXPIRES = parseInt(PRE_JWT_EXPIRES);

const PRE_BCRYPT_MAX_BYTES = process.env.BCRYPT_MAX_BYTES || '72';
export const BCRYPT_MAX_BYTES = parseInt(PRE_BCRYPT_MAX_BYTES);
