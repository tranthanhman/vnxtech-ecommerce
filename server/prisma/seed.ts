import bcrypt from "bcrypt";
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users with posts
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@admin.com",
      role: {
        create: {
          name: "Admin",
          description: "Admin role",
        },
      },
      password: bcrypt.hashSync("password", 10),
    },
  });

  console.log("🌱 Database seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
