import { prisma } from '../../config/prisma';

export const getUsers = () => prisma.user.findMany();
