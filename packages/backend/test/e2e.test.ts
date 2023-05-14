import { expect, test, beforeAll, describe, afterEach, afterAll } from "vitest";
import { CreateTRPCProxyClient, createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../src";
import { faker } from "@faker-js/faker";

import fetchCookie from "fetch-cookie";
import SuperJSON from "superjson";

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

const testUser = {
  password: faker.internet.password(),
  email: faker.internet.email(),
  name: faker.internet.userName(),
  phone: "1234567890",
  address: faker.location.streetAddress(),
};

test("register a new customer", () => {
  const registration = trpcClient.auth.register.mutate(testUser);
  expect(registration).resolves.toBeDefined();
})

// add a product to cart

// checkout
