import {
  CreateTRPCProxyClient,
  TRPCClientRuntime,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import { beforeAll, describe, expect, test } from "vitest";
import { AppRouter } from "./root.router";
import fetchCookie from "fetch-cookie";
import SuperJSON from "superjson";
import { faker } from "@faker-js/faker";

let testProductId: string;
let categoryId: string;

let trpcClient: CreateTRPCProxyClient<AppRouter>;

beforeAll(async () => {
  trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://127.0.0.1:3000/api/trpc",
        fetch: fetchCookie(fetch),
      }),
    ],
    transformer: SuperJSON,
  });
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
  const category = await trpcClient.categories.create.mutate(testCategory.name);

  categoryId = category.name;

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
});

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
