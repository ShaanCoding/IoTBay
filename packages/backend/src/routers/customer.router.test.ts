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
sex: "other" as const
};

test("should register a new customer", async () => {
    const userMutation = trpcClient.auth.register.mutate(testUser);

    expect(userMutation).resolves.toBeDefined();
});

test("should login a customer", async () => {
    const userMutation = trpcClient.auth.login.mutate({
        email: testUser.email,
        password: testUser.password,
    });

    expect(userMutation).resolves.toBeDefined();
});

test("should switch anonymous mode without mode", async () => {
    const userMutation = await trpcClient.customer.anonymous.mutate();

    expect(userMutation.isAnonymous).toBe(true);
})

test("should switch anonymous mode with mode", async () => {
    const userMutation = await trpcClient.customer.anonymous.mutate(true);

    expect(userMutation.isAnonymous).toBe(true);
})

test("should switch anonymous mode with mode", async () => {
    const userMutation = await trpcClient.customer.anonymous.mutate(false);

    expect(userMutation.isAnonymous).toBe(false);
})

test("should get my customer", () => {
    const userQuery = trpcClient.customer.myCustomer.query();

    expect(userQuery).resolves.toBeDefined();
})

test("should update my customer", async () => {
    const userMutation = await trpcClient.customer.editMyCustomer.mutate({
        sex: "male"
    });

    expect(userMutation.sex).toBe("male")
})

