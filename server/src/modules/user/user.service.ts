import { CreateUserDTO } from "../../dto/user.dto";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../utils/ApiResponse";
import {ApiError} from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";

/**
 * Get users with pagination
 * @param page - The page number
 * @param limit - The number of users per page
 * @returns The users and pagination information
 */
export const getUsers = async (page: number, limit: number) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;
  const totalUsers = await prisma.user.count();

  const users = await prisma.user.findMany({
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

/**
 * Create a new user
 * @param input - The user data
 * @returns The created user
 */
export const createUser = async (input: CreateUserDTO) => {
  const customerRole = await prisma.role.findFirst({
    where: { name: "USER" },
  });

  const uniqueEmail = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!customerRole) {
    return new ApiError(StatusCodes.BAD_REQUEST, "Default role not found");
  }

  if (uniqueEmail) {
    return new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await prisma.user.create({
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

  return new ApiResponse(201, [], "User created successfully");
};
