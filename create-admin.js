const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123!", 12);

  const user = await prisma.user.upsert({
    where: { email: "admin@noirelecacy.com" },
    update: { password, role: "ADMIN" },
    create: {
      email: "admin@noirelecacy.com",
      name: "Noire Admin",
      password,
      role: "ADMIN",
      profile: { create: {} },
    },
  });

  console.log("✅ Admin created:", user.email);
  console.log("   Email:    admin@noirelecacy.com");
  console.log("   Password: admin123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
