import { expect, test, beforeAll, describe, afterEach, afterAll } from "vitest";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../src";
import { faker } from "@faker-js/faker";

import fetchCookie from "fetch-cookie";
import SuperJSON from "superjson";


describe("test", () => {
  test("true is true", () => {
    expect(true).toBe(true);
  })
});
