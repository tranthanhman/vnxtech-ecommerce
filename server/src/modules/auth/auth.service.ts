import bcrypt from "bcrypt";
import { CreateUserDTO } from "../../dto/user.dto";
import { prisma } from "../../config/prisma";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { ApiError } from "../../utils/ApiError";

export const register = async (input: CreateUserDTO) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const customerRole = await prisma.role.findFirst({
    where: { name: "customer" },
  });

  if (!customerRole) {
    throw new ApiError(500, "Default role not found");
  }

  return prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashedPassword,
      roleId: customerRole.id,
    },
  });
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({ userId: user.id });

  const result = await prisma.token.create({
    data: {
      userId: user.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
    },
    include: {
      user: {
        include: {
          role: true,
        },
      },
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    },
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken) as { userId: number };

  const tokenInDb = await prisma.token.findFirst({
    where: {
      refreshToken,
      userId: decoded.userId,
      isRevoked: false,
    },
  });

  if (!tokenInDb) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = signAccessToken({ userId: decoded.userId });

  await prisma.token.update({
    where: { id: tokenInDb.id },
    data: { accessToken: newAccessToken },
  });

  return { accessToken: newAccessToken };
};
