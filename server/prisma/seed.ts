import { PrismaClient } from "@prisma/client";
import categories from "./data/categories.json";
import brands from "./data/brands.json";
import rawProducts from "./data/products.json";
import { Product } from "../src/types/product";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting seed...");

  // Xóa dữ liệu cũ
  await prisma.productVariantOption.deleteMany();
  await prisma.media.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // Reset auto-increment sequences (PostgreSQL)
  await prisma.$executeRaw`ALTER SEQUENCE "Brand_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Media_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "ProductVariant_id_seq" RESTART WITH 1`;

  // Seed brands
  const brandMap: Record<string, number> = {};
  for (const brand of brands) {
    const created = await prisma.brand.create({ data: brand });
    brandMap[brand.slug] = created.id;
    console.log(`✅ Created brand: ${brand.name}`);
  }

  // Seed categories
  const categoryMap: Record<string, number> = {};
  for (const category of categories) {
    const parentId = category.parentSlug
      ? categoryMap[category.parentSlug]
      : null;
    const created = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        parentId,
      },
    });
    categoryMap[category.slug] = created.id;
    console.log(`✅ Created category: ${category.name}`);
  }

  // Seed products
  const products: Product[] = rawProducts as Product[];
  for (const product of products) {
    const categoryId = product.categoryId;
    const brandId = product.brandId;

    if (!categoryId || !brandId) {
      console.warn(`⚠️ Missing category or brand for product: ${product.slug}`);
      continue;
    }

    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        discountPrice: product.discountPrice ?? null,
        stock: product.stock,
        description: product.description,
        categoryId,
        brandId,
      },
    });

    // Product Specifications
    for (const spec of product.specifications ?? []) {
      await prisma.productSpecification.create({
        data: {
          productId: createdProduct.id,
          name: spec.name,
          value: spec.value,
          unit: spec.unit || null,
        },
      });
    }

    // Product Variants
    for (const variant of product.variants ?? []) {
      const createdVariant = await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: variant.sku,
          name: variant.name,
          price: variant.price,
          discountPrice: variant.discountPrice ?? null,
          stock: variant.stock,
        },
      });

      // Add media (image) to variant
      for (const [index, img] of (variant.images ?? []).entries()) {
        await prisma.media.create({
          data: {
            url: img.imageUrl,
            altText: img.altText || null,
            type: "image",
            mimeType: "image/jpeg",
            size: 1000,
            isPrimary: index === 0, // First image isPrimary
            sortOrder: index,
            productVariantId: createdVariant.id,
          },
        });
      }

      // Variant Options
      for (const opt of variant.options ?? []) {
        await prisma.productVariantOption.create({
          data: {
            variantId: createdVariant.id,
            name: opt.name,
            value: opt.value,
          },
        });
      }
    }
  }

  // Seed Roles
  const [adminRole, userRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: { name: "ADMIN", description: "Admin role" },
    }),
    prisma.role.upsert({
      where: { name: "USER" },
      update: {},
      create: { name: "USER", description: "User role" },
    }),
  ]);

  // Seed Users
  const users = [
    {
      name: "Admin",
      email: "admin@admin.com",
      password: await bcrypt.hash("123123123", 10),
      roleId: adminRole.id,
    },
    ...await Promise.all(
      Array.from({ length: 10 }).map(async () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("123456", 10),
        phone: faker.phone.number(),
        avatar: faker.image.avatar(),
        roleId: userRole.id,
        createdAt: faker.date.past(),
      }))
    ),
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
