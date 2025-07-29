"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const prisma_1 = require("../../config/prisma");
const createCategory = async (data) => {
    return prisma_1.prisma.category.create({ data });
};
exports.createCategory = createCategory;
