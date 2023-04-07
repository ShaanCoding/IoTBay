import localStrategy from "./features/auth/strategies/local.strategy";
import { User } from "@prisma/client";

import fs from "fs";
import path from "path";
import fastifyPassport from "@fastify/passport";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import prisma from "./services/prisma";

import server from "./services/server";
import { UserCollectionDto, UserDto } from "./features/users";
import { LoginDto } from "./features/auth/models/LoginDto";
import { RegisterDto } from "./features/auth/models/RegisterDto";
import fastify from "fastify";

// Load environment variables
config();

// Get the root folder of the project
const root = path.join(fileURLToPath(import.meta.url), "../..");

// Get the public folder where the client is
const publicRoot = path.join(root, "public");

// Register nice error messages
await server.register(await import("@fastify/sensible"));

// Register swagger
await server.register(await import("@fastify/swagger"), {
  openapi: {
    servers: [
      { url: "http://localhost:3000", description: "Development server" },
      {
        url: "https://isd.sebasptsch.dev",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        sessionid: {
          type: "apiKey",
          name: "sessionid",
          in: "cookie",
        },
      },
      schemas: {
        UserDto,
        UserCollectionDto,
        LoginDto,
        RegisterDto
      },
    },
    info: {
      title: "IoTBay API",
      version: "0.1.0",
      description: "IoTBay API",
    },

  },
  refResolver: {
    buildLocalReference (json, baseUri, fragment, i) {
      return json.$id?.toString() || `my-fragment-${i}`
    }
  }
});

server.addSchema(UserDto);
server.addSchema(UserCollectionDto);
server.addSchema(LoginDto);
server.addSchema(RegisterDto);

await server.register(await import("@fastify/swagger-ui"), {
  routePrefix: "/docs",
});

// Register auth rule handler
await server.register(await import("@fastify/auth"));

// Setup CORS rules
await server.register(await import("@fastify/cors"), {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Setup Session
await server.register(await import("@fastify/secure-session"), {
  cookieName: "sessionid",
  key: fs.readFileSync(new URL("../secret_key", import.meta.url)),
  cookie: {
    path: "/",
  },
});

// Serve Static Files (Client)
await server.register(await import("@fastify/static"), {
  root: publicRoot,
  wildcard: false,
});

// Initialise Passport for Authentication
await server.register(fastifyPassport.initialize());
await server.register(fastifyPassport.secureSession());

// Register the local strategy (username and password)
fastifyPassport.use("local", localStrategy);

// This is used to serialize the user into the session e.g. get userId and put it in the session
fastifyPassport.registerUserSerializer(
  async (user: Omit<User, "password">, request) => user.userId
);

// This is used to deserialize the user from the session e.g. get userId from session and get user from database
fastifyPassport.registerUserDeserializer(async (userId: string, request) => {
  const { password, ...user } = await prisma.user.findUniqueOrThrow({
    where: { userId },
  });
  return user;
});

// If there's no route, send the index.html file
server.setNotFoundHandler((req, res) => {
  res.sendFile("index.html");
});

/** Used to type up routes */
export type RouteHandler = Parameters<typeof server.route>[0];

/**
 * Prefixes a route with a prefix
 * @param prefix The prefix to add to the route e.g. /api/auth
 * @param route The route to prefix
 * @returns The route with the prefix
 */
const prefixRoute = (prefix: string, route: RouteHandler) => {
  const withPrefix = [prefix, route.url]
    .filter((url) => url !== "/" && url !== "")
    .join("/");
  route.url = withPrefix;
  return route;
};

// Load all the routes from their folders
console.log("Loading routes...");
const { authRoutes } = await import(`./features/auth`);
const { usersRoutes } = await import(`./features/users`);
console.log("Routes loaded");

// Register all the user routes and prefix them with /api/users
usersRoutes.forEach((route) => {
  const withPrefix = prefixRoute("/api/users", route);
  server.route(withPrefix);
});

// Registers all the auth routes and prefixes them with /api/auth
authRoutes.forEach((route) => {
  const withPrefix = prefixRoute("/api/auth", route);
  server.route(withPrefix);
});

// Set the server to listen on port 3000
await server.listen({ port: 3000, host: "0.0.0.0" });

// Log the server address
console.log(
  `Server listening on ${server
    .addresses()
    .map(
      (address) =>
        `\r\n ${address.family} - http://${address.address}:${address.port}`
    )
    .join("\n")}`
);
