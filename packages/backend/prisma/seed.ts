import { PrismaClient, User, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import argon2 from "argon2";
import { faker } from "@faker-js/faker";

async function main() {
  const createFakeCustomerUser = (): Prisma.UserCreateInput => ({
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
    phone: "1234567890",
    userType: "customer",
    customerDetails: {
      create: {
        sex: "irrelevant",
      },
    },
  });

  const createFakeStaffUser = (): Prisma.UserCreateInput => ({
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
    phone: "1234567890",
    userType: "staff",
    staffDetails: {
      create: {
        position: faker.person.jobTitle(),
        isActivated: true,
      },
    },
  });

  const createFakeProduct = (): Prisma.ProductCreateInput => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    stock: faker.number.int({ max: 100, min: 0 }),
    category: faker.commerce.department(),
    image: faker.image.url(),
  });

  const createFakeCategory = (): Prisma.ProductCategoryCreateInput => ({
    name: faker.commerce.department(),
  })

  const fakeCustomers = faker.helpers.multiple(createFakeCustomerUser, { count: 20 });

  const fakeStaff = faker.helpers.multiple(createFakeStaffUser, { count: 10 });

  const fakeProducts = faker.helpers.multiple(createFakeProduct, { count: 10 });

  const fakeCategories = faker.helpers.multiple(createFakeCategory, { count: 10 });


  await prisma.$transaction([
    prisma.user.upsert({
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
    }),

    prisma.user.upsert({
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
    }),

    ...fakeCustomers.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    ),

    ...fakeStaff.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    ),

    ...fakeProducts.map((product) =>
      prisma.product.create({
        data: product,
      })
    ),

    ...fakeCategories.map((category) =>
      prisma.productCategory.create({
        data: category,
      })
    ),

  ]);
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
