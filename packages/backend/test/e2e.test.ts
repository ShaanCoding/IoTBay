import { expect, test, beforeAll, describe, afterEach, afterAll } from "vitest";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../dist";
import { faker } from "@faker-js/faker";
import childProcess from "child_process";
import path from "path";
import { fileURLToPath } from "node:url";

import fetchCookie from "fetch-cookie";

let childProcessInstance: childProcess.ChildProcess;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    const pathOfFile = fileURLToPath(import.meta.url);

    const root = path.join(pathOfFile, "..", "..");

    childProcessInstance = childProcess.fork(
      path.join(root, "dist", "index.js"),
      { stdio: "inherit" }
    );

    childProcessInstance.on("message", (message) => {
      if (message === "ready") {
        resolve();
      }
    });
  });
});

afterAll(async () => {
  childProcessInstance.kill();
});

describe("auth", () => {
  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://127.0.0.1:3000/api/trpc",
        fetch: fetchCookie(fetch),
      }),
    ],
  });

  const testUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    name: faker.internet.userName(),
    phone: "1234567890",
    address: faker.location.streetAddress(),
  };



  test("should register a new user", async () => {
    const userMutation = trpcClient.auth.register.mutate(testUser);

    expect(userMutation).resolves.toBeDefined();
  });

  test("should be able to get the current user", async () => {
    const userQuery = trpcClient.users.me.query();

    expect(userQuery).resolves.toBeDefined();
  });

  test("should not register a user with the same email", async () => {
    const userMutation = trpcClient.auth.register.mutate(testUser);

    expect(userMutation).rejects.toThrow();
  });

  test("should not register a user with an invalid email", async () => {
    const userMutation = trpcClient.auth.register.mutate({
      ...testUser,
      email: "invalid",
    });

    expect(userMutation).rejects.toThrow();
  });

  test("should not register a user with an invalid phone number", async () => {
    const userMutation = trpcClient.auth.register.mutate({
      ...testUser,
      phone: "invalid",
    });

    expect(userMutation).rejects.toThrow();
  })

  test("logout", async () => {
    const logoutMutatuion = trpcClient.auth.logout.mutate();

    expect(logoutMutatuion).resolves.toBeDefined() ;
  });

  test("should not be able to get the current user", async () => {
    const currentUserQuery = trpcClient.users.me.query();

    expect(currentUserQuery).resolves.toBeNull();
  });

  test("should not be able to delete the current user", async () => {
    const deleteMutation = trpcClient.users.deleteMe.mutate()

    expect(deleteMutation).rejects.toThrow();
  });

  test("should login a user", async () => {
    const userQuery = trpcClient.auth.login.mutate({
      email: testUser.email,
      password: testUser.password,
    });

    expect(userQuery).resolves.toBeDefined();
  });

  test("should be able to delete the current user", async () => {
    const deleteMutation = trpcClient.users.deleteMe.mutate()
    
    expect(deleteMutation).resolves.toBeDefined();
  });
});

describe("catalog", () => {
  let testProductId: string;
  let categoryId: string;

  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://127.0.0.1:3000/api/trpc",
        fetch: fetchCookie(fetch),
      }),
    ],
  });

  test("login as staff", async () => {
    const loginMutation = trpcClient.auth.login.mutate({
      email: "staff@example.com",
      password: "password",
    });

    expect(loginMutation).resolves.toBeDefined();
  });

  const testCategory = {
    name: faker.commerce.department(),
  };

  test("should create a new category", async () => {
    const category = await trpcClient.categories.create.mutate(
      testCategory.name
    );

    categoryId = category.categoryId;

    expect(category).toBeDefined();
  });

  const testProduct = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    quantity: faker.number.int({ min: 0 }),
    stock: faker.number.int({
      min: 0,
      max: 100,
    }),
    image: faker.image.url(),
    category: testCategory.name,
  };

  test("should not create a new product with invalid image url", async () => {
    const productMutation = trpcClient.products.create.mutate({
      ...testProduct,
      image: "invalid",
    });

    expect(productMutation).rejects.toThrow();
  });

  test("should not create a new product with invalid price", async () => {
    const productMutation = trpcClient.products.create.mutate({
      ...testProduct,
      price: -1,
    });

    expect(productMutation).rejects.toThrow();
  })

  test("should create a new product", async () => {
    const product = await trpcClient.products.create.mutate(testProduct);

    expect(product).toBeDefined();

    testProductId = product.productId;
  });

  test("should get a product", async () => {
    const productQuery = trpcClient.products.product.query(testProductId);

    expect(productQuery).resolves.toBeDefined();
  });

  let updatedPrice = parseFloat(faker.commerce.price());

  test("should update a product", async () => {
    const product = await trpcClient.products.update.mutate({
      productId: testProductId,
      price: updatedPrice,
    });

    expect(product.price).toBe(updatedPrice);
  });

  test("should get a list of products", async () => {
    const products = await trpcClient.products.products.query();

    const createdProduct = products.find(
      (product) => product.productId === testProductId
    );

    expect(createdProduct).toBeDefined();
  });

  test("delete a product", async () => {
    const product = await trpcClient.products.delete.mutate(testProductId);

    expect(product).toBeDefined();
  });

  test("should delete a category", async () => {
    const category = await trpcClient.categories.delete.mutate(categoryId);

    expect(category).toBeDefined();
  });
});

describe("staff", () => {
  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://127.0.0.1:3000/api/trpc",
        fetch: fetchCookie(fetch),
      }),
    ],
  });

  

  // login
  test("register a new customer",async () => {
      const testCustomer = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: "1234567890",
        address: faker.location.streetAddress(),
      };

      const customer = await trpcClient.auth.register.mutate(testCustomer);

      customerId = customer.userId;
  });

  test("should login as staff", async () => {
    const loggedInUser = await trpcClient.auth.login.mutate({
      email: "staff@example.com",
      password: "password",
    });

    expect(loggedInUser).toBeDefined();
  });

  const testStaff = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: "1234567890",
    address: faker.location.streetAddress(),
    position: faker.person.jobTitle(),
  };

  let staffId: string;

  let customerId: string;

  test("should create a new staff from blank", async () => {
    const staff = await trpcClient.staff.create.mutate(testStaff);
    staffId = staff.userId;
    expect(staff).toBeDefined();
  });
  

  test("should get staff list with new staff member", async () => {
    const staff = await trpcClient.staff.staff.query();

    const newUser = staff.find((user) => user.userId === staffId);

    expect(newUser).toBeDefined();
  });

  test("should promote a customer to staff", async () => {
    const staff = await trpcClient.staff.activate.mutate({
      position: faker.person.jobTitle(),
      userId: customerId,
    });

    expect(staff).toBeDefined();
  });

  test("should get staff list with promoted customer", async () => {
    const staff = await trpcClient.staff.staff.query();

    const newUser = staff.find((user) => user.userId === customerId);

    expect(newUser).toBeDefined();
  });

  test("should deactivate staff", async () => {
    const staff = await trpcClient.staff.deactivate.mutate(customerId);

    expect(staff).toBeDefined();
  });

  test("should get staff list with demoted promoted customer", async () => {
    const staff = await trpcClient.staff.staff.query();

    const newUser = staff.find((user) => user.userId === customerId);
    expect(newUser).toBeUndefined();
  });

  test("should delete staff", async () => {
    const staff = await trpcClient.staff.delete.mutate(staffId);

    expect(staff).toBeDefined();
  });

  test("should be able to delete the customer user",async () => {
    await trpcClient.users.deleteUser.mutate(customerId);
  });
});