import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import argon2 from "argon2";

async function main() {
  await prisma.user.upsert({
    where: { email: "staff@example.com" },
    update: {},
    create: {
      email: "staff@example.com",
      name: "Staff",
      password: await argon2.hash("password"),
      address: "123 Fake St",
      phone: "1234567890",
      userType: "staff",
      staffDetails: {
        create: {
          position: "admin",
          isActivated: true,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Customer",
      password: await argon2.hash("password"),
      address: "123 Fake St",
      phone: "1234567890",
      userType: "customer",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
