import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@noirelecacy.com" },
    update: {},
    create: {
      email: "admin@noirelecacy.com",
      name: "Noire Admin",
      password: adminPassword,
      role: "ADMIN",
      profile: {
        create: {
          bio: "Administrator of Noire Legacy Magazine.",
          location: "Lagos, Nigeria",
        },
      },
    },
  });

  console.log("✅ Admin seeded:", admin.email);
  console.log("   Password: admin123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
