"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const jwt_1 = require("../../utils/jwt");
const register = async (input) => {
    const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
    const customerRole = await prisma_1.prisma.role.findFirst({
        where: { name: 'customer' },
    });
    if (!customerRole) {
        throw new Error('Default role not found');
    }
    return prisma_1.prisma.user.create({
        data: {
            email: input.email,
            name: input.name,
            password: hashedPassword,
            roleId: customerRole.id,
        },
    });
};
exports.register = register;
const login = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const accessToken = (0, jwt_1.signAccessToken)({ userId: user.id });
    const refreshToken = (0, jwt_1.signRefreshToken)({ userId: user.id });
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            accessToken,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
        },
    });
    return { accessToken, refreshToken };
};
exports.login = login;
const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const tokenInDb = await prisma_1.prisma.token.findFirst({
            where: {
                refreshToken,
                userId: decoded.userId,
                isRevoked: false,
            },
        });
        if (!tokenInDb) {
            throw new Error('Invalid refresh token');
        }
        const newAccessToken = (0, jwt_1.signAccessToken)({ userId: decoded.userId });
        await prisma_1.prisma.token.update({
            where: { id: tokenInDb.id },
            data: { accessToken: newAccessToken },
        });
        return { accessToken: newAccessToken };
    }
    catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};
exports.refreshAccessToken = refreshAccessToken;
