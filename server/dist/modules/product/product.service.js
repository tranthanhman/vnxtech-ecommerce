"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.createProduct = void 0;
const prisma_1 = require("../../config/prisma");
const createProduct = async (data) => {
    return prisma_1.prisma.product.create({ data });
};
exports.createProduct = createProduct;
const getProducts = async (page, limit) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const skip = (currentPage - 1) * currentLimit;
    const totalProducts = await prisma_1.prisma.product.count();
    const products = await prisma_1.prisma.product.findMany({
        include: {
            category: true,
            brand: true,
        },
        skip,
        take: currentLimit,
    });
    const totalPages = Math.ceil(totalProducts / currentLimit);
    return {
        products,
        pagination: {
            total: totalProducts,
            page,
            limit: currentLimit,
            totalPages,
        },
    };
};
exports.getProducts = getProducts;
