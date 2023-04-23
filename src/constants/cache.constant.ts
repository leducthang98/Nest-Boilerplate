import { config } from 'dotenv';

config();

const APP_NAME_PREFIX = process.env.APP_NAME.toUpperCase();

export const CACHE_CONSTANT = {
  SESSION_PREFIX: `${APP_NAME_PREFIX}:SESSION_USERID:`,
};
