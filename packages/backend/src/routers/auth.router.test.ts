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
});

test("logout", async () => {
  const logoutMutatuion = trpcClient.auth.logout.mutate();

  expect(logoutMutatuion).resolves.toBeDefined();
});

test("should not be able to get the current user", async () => {
  const currentUserQuery = trpcClient.users.me.query();

  expect(currentUserQuery).resolves.toBeNull();
});

test("should not be able to delete the current user", async () => {
  const deleteMutation = trpcClient.users.deleteMe.mutate();

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
  const deleteMutation = trpcClient.users.deleteMe.mutate();

  expect(deleteMutation).resolves.toBeDefined();
});
