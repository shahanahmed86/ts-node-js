export const NODE_ENV = (process.env.NODE_ENV as string) || 'development';
export const APP_PORT = parseInt(process.env.APP_PORT as string) || 4000;

export const IN_PROD = NODE_ENV === 'production';
