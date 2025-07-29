import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET || 'access_secret_key';
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';

const accessTokenOptions: SignOptions = {
  expiresIn: Number(process.env.JWT_EXPIRES_IN) || 15 * 60 * 1000,
};

const refreshTokenOptions: SignOptions = {
  expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 7 * 24 * 60 * 60 * 1000,
};

export const signAccessToken = (payload: object): string =>
  jwt.sign(payload, JWT_ACCESS_SECRET, accessTokenOptions);

export const signRefreshToken = (payload: object): string =>
  jwt.sign(payload, JWT_REFRESH_SECRET, refreshTokenOptions);

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET);
