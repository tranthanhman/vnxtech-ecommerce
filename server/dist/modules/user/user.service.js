"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const prisma_1 = require("../../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiResponse_1 = require("../../utils/ApiResponse");
const ApiError_1 = require("../../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
/**
 * Get users with pagination
 * @param page - The page number
 * @param limit - The number of users per page
 * @returns The users and pagination information
 */
const getUsers = async (page, limit) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const skip = (currentPage - 1) * currentLimit;
    const totalUsers = await prisma_1.prisma.user.count();
    const users = await prisma_1.prisma.user.findMany({
        skip,
        take: currentLimit,
    });
    const totalPages = Math.ceil(totalUsers / currentLimit);
    return {
        users,
        pagination: {
            total: totalUsers,
            page: currentPage,
            limit: currentLimit,
            totalPages,
        },
    };
};
exports.getUsers = getUsers;
/**
 * Create a new user
 * @param input - The user data
 * @returns The created user
 */
const createUser = async (input) => {
    const customerRole = await prisma_1.prisma.role.findFirst({
        where: { name: "USER" },
    });
    const uniqueEmail = await prisma_1.prisma.user.findUnique({
        where: { email: input.email },
    });
    if (!customerRole) {
        return new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Default role not found");
    }
    if (uniqueEmail) {
        return new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
    await prisma_1.prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            role: {
                connect: {
                    id: customerRole.id,
                },
            },
        },
    });
    return new ApiResponse_1.ApiResponse(201, [], "User created successfully");
};
exports.createUser = createUser;
