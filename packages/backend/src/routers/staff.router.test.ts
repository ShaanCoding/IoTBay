import { CreateTRPCProxyClient, TRPCClientRuntime, createTRPCProxyClient, httpBatchLink } from "@trpc/client";
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
        transformer: SuperJSON
      });
})

    
  
    // login
    test("register a new customer", async () => {
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
  
    test("should be able to delete the customer user", async () => {
      await trpcClient.users.deleteUser.mutate(customerId);
    });
  