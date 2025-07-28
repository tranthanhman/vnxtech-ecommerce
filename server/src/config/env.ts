import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 8090,
  DATABASE_URL: process.env.DATABASE_URL,
};