import {CreateCategoryInput} from '../../dto/category.dto';
import { prisma } from '../../config/prisma';

export const createCategory =  async (data: CreateCategoryInput) => {
  return prisma.category.create({ data });
};
