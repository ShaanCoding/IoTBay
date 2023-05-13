import { expect, test, beforeAll, describe, afterEach, afterAll } from "vitest";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../dist";
import { faker } from "@faker-js/faker";
import childProcess from "child_process";
import path from 'path'
import { fileURLToPath } from "node:url";

import fetchCookie from "fetch-cookie";

const fetchCookieInstance = fetchCookie(fetch);

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://127.0.0.1:3000/api/trpc",
      fetch: fetchCookieInstance,
    }),
  ],
});

let childProcessInstance: childProcess.ChildProcess;



beforeAll(async () => {
    await new Promise<void>((resolve) => {
        const pathOfFile = fileURLToPath(import.meta.url);

        const root = path.join(pathOfFile, "..", "..");
        
        childProcessInstance = childProcess.fork(path.join(root, "dist", "index.js"));

        childProcessInstance.on("message", (message) => {
            if (message === "ready") {
                resolve();
            }
        })
    
    });
    


});

afterAll(async () => {
    childProcessInstance.kill();
});

describe("auth", () => {
  const testUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    name: faker.internet.userName(),
    phone: "1234567890",
    address: faker.location.streetAddress(),
  };

  afterAll(async () => {
    await trpcClient.users.deleteMe.mutate();
  });

  test("should register a new user", async () => {
    const user = await trpcClient.auth.register.mutate(testUser);

    expect(user).toBeDefined();
  });

  

  test("should be able to get the current user", async () => {
    const user = await trpcClient.users.me.query();

    expect(user).toBeDefined();
  });

  test("should not register a user with the same email", async () => {
    try {
      await trpcClient.auth.register.mutate(testUser);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("logout", async () => {
    const user = await trpcClient.auth.logout.mutate();

    expect(user).toBeDefined();
  });

  test("should not be able to get the current user", async () => {
    try {
      await trpcClient.users.me.query();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("should not be able to delete the current user", async () => {
    try {
      await trpcClient.users.deleteMe.mutate();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("should login a user", async () => {
    const user = await trpcClient.auth.login.mutate({
      email: testUser.email,
      password: testUser.password,
    });

    expect(user).toBeDefined();
  });

  
});
