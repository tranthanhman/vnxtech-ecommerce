"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';
const accessTokenOptions = {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || 15 * 60 * 1000,
};
const refreshTokenOptions = {
    expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 7 * 24 * 60 * 60 * 1000,
};
const signAccessToken = (payload) => jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, accessTokenOptions);
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, refreshTokenOptions);
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET);
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
exports.verifyRefreshToken = verifyRefreshToken;
