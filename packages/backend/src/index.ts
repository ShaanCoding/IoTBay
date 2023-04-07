import fastifySecureSession from "@fastify/secure-session";
import localStrategy from "./features/auth/strategies/local.strategy";
import { User } from "@prisma/client";

import fs from "fs";
import path from "path";
import fastifyPassport from "@fastify/passport";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import fastifyCors from "@fastify/cors";
import { config } from "dotenv";
import prisma from "./services/prisma";
import fastifySensible from "@fastify/sensible";

import fastifyAuth from "@fastify/auth";
import server from "./services/server";

// Load environment variables
config();

// Get the root folder of the project
const root = path.join(fileURLToPath(import.meta.url), "../..");

// Get the public folder where the client is
const publicRoot = path.join(root, "public");

// Register nice error messages
await server.register(fastifySensible);

// Register auth rule handler
await server.register(fastifyAuth);

// Setup CORS rules
await server.register(fastifyCors, {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Setup Session
await server.register(fastifySecureSession, {
  cookieName: "sessionid",
  key: fs.readFileSync(new URL("../secret_key", import.meta.url)),
  cookie: {
    path: "/",
  },
});

// Serve Static Files (Client)
await server.register(fastifyStatic, {
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
  async (user: Omit<User, "password">, request) => user.id
);

// This is used to deserialize the user from the session e.g. get userId from session and get user from database
fastifyPassport.registerUserDeserializer(async (id: string, request) => {
  const { password, ...user } = await prisma.user.findUniqueOrThrow({
    where: { id },
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
  const withPrefix = [prefix, route.url].filter(url => url !== "/" && url !== "").join("/");
  route.url = withPrefix;
  return route;
}

// Load all the routes from their folders
console.log("Loading routes...");
const { authRoutes } = await import(`./features/auth`);
const { usersRoutes } = await import(`./features/users`);
console.log("Routes loaded");

// Registers all the auth routes and prefixes them with /api/auth
authRoutes.forEach((route) => {
  const withPrefix = prefixRoute("/api/auth", route);
  server.route(withPrefix);
});

// Register all the user routes and prefix them with /api/users
usersRoutes.forEach((route) => {
  const withPrefix = prefixRoute("/api/users", route);
  server.route(withPrefix);
});


// Set the server to listen on port 3000
await server.listen({ port: 3000, host: "0.0.0.0" });

// await server.ready();

// Log the server address
console.log(
  `Server listening on ${server
    .addresses()
    .map((address) => `${address.family} - ${address.address}:${address.port}`)
    .join("\n")}`
);


  


