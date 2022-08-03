export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT as string) || 12;

export const JWT_SECRET = (process.env.JWT_SECRET as string) || 'jwt_secret';

export const BCRYPT_MAX_BYTES = parseInt(process.env.BCRYPT_MAX_BYTES as string) || 72;