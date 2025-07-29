"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryInputSchema = void 0;
const zod_1 = require("zod");
exports.CreateCategoryInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    slug: zod_1.z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),
    parentId: zod_1.z.number().int().optional().nullable(), // optional parent category
});
