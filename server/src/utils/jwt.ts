import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' })

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' })

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_ACCESS_SECRET)

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET)