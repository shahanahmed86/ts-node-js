export const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.APP_PORT || '4000';
export const APP_PORT = parseInt(PORT);

export const IN_PROD = NODE_ENV === 'production';

const APP_PROTOCOL = process.env.APP_PROTOCOL || 'http:';
const APP_HOST = process.env.APP_HOST || 'localhost:4000';
export const BASE_URL = `${APP_PROTOCOL}//${APP_HOST}`;
