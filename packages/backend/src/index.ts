import { Authenticator } from "@fastify/passport";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import fastify from "fastify";
import localStrategy from "./auth/strategies/local.strategy";
import { User } from "@prisma/client";

import argon2 from "argon2";
import fs from "fs";
import path from "path";
import fastifyPassport from "@fastify/passport";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import fastifyCors from "@fastify/cors";
import { RegisterDto, RegisterDtoType } from "./auth/dto/RegisterDto";
import { LoginDto, LoginDtoType } from "./auth/dto/LoginDto";
import { config } from "dotenv";
import prisma from "./prisma";

config()

const root = path.join(fileURLToPath(import.meta.url), "../..");
const publicRoot = path.join(root, "public");

// Register all the plugins
const main = async () => {
  const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

  await server.register(fastifyCors, {
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await server.register(fastifySecureSession, {
    cookieName: "sessionid",
    key: fs.readFileSync(new URL("../secret_key", import.meta.url)),
    cookie: {
      path: "/",
    },
  });

  // Serve Static Files (Client)
  server.register(fastifyStatic, {
    root: publicRoot,
    wildcard: false,
  });

  // Initialise Passport for Authentication
  await server.register(fastifyPassport.initialize());
  await server.register(fastifyPassport.secureSession());

  fastifyPassport.use("local", localStrategy);

  fastifyPassport.registerUserSerializer(
    async (user: Omit<User, "password">, request) => user.id.toString()
  );

  fastifyPassport.registerUserDeserializer(async (id: string, request) => {
    const { password, ...user } = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    return user;
  });

  server.setNotFoundHandler((req, res) => {
    res.sendFile("index.html");
  });

  return server;
};

const registerRoutes = async () => {
  // Wait for the server to be ready
  const server = await main();

  // Login Route
  server.route<{ Body: LoginDtoType }>({
    method: "POST",
    schema: LoginDto,
    url: "/api/auth/login",
    preValidation: [
      fastifyPassport.authenticate("local", {
        authInfo: false,
        session: true,
      }),
    ],
    handler: (req, res) => {
      return res.status(200).send({
        message: "Logged in",
      });
    },
  });

  // Register Route
  server.route<{ Body: RegisterDtoType }>({
    schema: RegisterDto,
    method: "POST",
    url: "/api/auth/register",
    handler: async (req, res) => {
      try {
        if (!req.body) return res.status(400).send({ message: "Bad request" });
        const { email, password } = req.body;
        console.log(req.body)
        console.log(email, password);
        const passwordHash = await argon2.hash(password);

        const user = await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            isStaff: false,
          },
          select: {
            email: true,
          },
        });

        return res.status(201).send({
          message: `Successfully created user: ${user.email}`,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Logout Route
  server.route({
    method: "POST",
    url: "/api/auth/logout",
    preValidation: [fastifyPassport.authenticate("local", { session: true })],
    handler: (req, res) => {
      req.logOut();
      return res.status(200).send({
        message: "Logged out",
      });
    },
  });

  // Get User Route
  server.route({
    method: "GET",
    url: "/api/auth/user",
    // preValidation: [fastifyPassport.authenticate("local", { session: true })],
    handler: (req, res) => {
      return res.status(200).send({
        message: "User",
        user: req.user,
      });
    },
  });

  return server;
};

const start = async () => {
  const server = await registerRoutes();

  await server.listen({ port: 3000, host: "0.0.0.0" });

  console.log(
    `Server listening on ${server
      .addresses()
      .map((address) => `${address.family} - ${address.address}:${address.port}`)
      .join("\n")}`
  );
};

start();
