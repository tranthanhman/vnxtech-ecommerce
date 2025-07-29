import { PrismaClient } from "@prisma/client";
import categories from "./data/categories.json";
import brands from "./data/brands.json";
import products from "./data/products.json";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clear old data (optional)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  // Seed brands
  const brandMap: Record<string, number> = {};
  for (const brand of brands) {
    const created = await prisma.brand.create({ data: brand });
    brandMap[brand.slug] = created.id;
  }

  // Seed categories with parent-child support
  const categoryMap: Record<string, number> = {};
  for (const category of categories) {
    let parentId: number | null = null;
    if (category.parentSlug) {
      parentId = categoryMap[category.parentSlug] ?? null;
    }
    const created = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        parentId,
      },
    });
    categoryMap[category.slug] = created.id;
  }

  // Seed products
  for (const product of products) {
    const categoryId = categoryMap[product.categorySlug];
    const brandId = brandMap[product.brandSlug];
    
    if (!categoryId) {
      throw new Error(`Category with slug "${product.categorySlug}" not found`);
    }
    if (!brandId) {
      throw new Error(`Brand with slug "${product.brandSlug}" not found`);
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        description: product.description,
        isFeatured: product.isFeatured || false,
        categoryId,
        brandId,
      },
    });
  }

  // Seed Roles
  await prisma.role.createMany({
    data: [
      {
        name: "ADMIN",
        description: "Admin role",
      },
      {
        name: "USER",
        description: "User role",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Users
  const users = [
    {
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin", 10),
      roleId: 1,
    },
    ...Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      roleId: 1,
      createdAt: faker.date.past(),
    })),
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
