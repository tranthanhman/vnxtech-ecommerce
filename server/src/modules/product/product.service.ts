import { CreateProductInput } from './../../dto/product.dto';
import { prisma } from '../../config/prisma';

export const createProduct = async (data: CreateProductInput) => {
  return prisma.product.create({ data });
};
