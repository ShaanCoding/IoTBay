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
import { UserDto, UserDtoType } from "./auth/dto/UserDto";
import { ErrorDto, ErrorDtoType } from "./errors/ErrorDto";
import fastifySensible from "@fastify/sensible";

config();

const root = path.join(fileURLToPath(import.meta.url), "../..");
const publicRoot = path.join(root, "public");

// Register all the plugins
const main = async () => {
  const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

  server.register(fastifySensible);

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
    async (user: Omit<User, "password">, request) => user.id
  );

  fastifyPassport.registerUserDeserializer(async (id: string, request) => {
    const { password, ...user } = await prisma.user.findUniqueOrThrow({
      where: { id },
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
      const user = req.user;

      if (!user) {
        return res.status(401).send({
          message: "Invalid credentials",
        });
      }


      return res.status(200).send(user);
    },
  });

  // Register Route
  server.route<{ Body: RegisterDtoType; Reply: UserDtoType | ErrorDtoType }>({
    schema: {
      body: RegisterDto,
      response: {
        201: UserDto,
        400: ErrorDto,
      },
    },
    method: "POST",
    url: "/api/auth/register",
    handler: async (req, res) => {
      const { email, password } = req.body;
      console.log(req.body);
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
          id: true,
          isStaff: true,
        },
      });

      return res.status(201).send(user);
    },
  });

  // Logout Route
  server.route({
    method: "POST",
    url: "/api/auth/logout",
    handler: async (req, res) => {
      await req.logOut();
      return res.status(200).send({ message: "Logged out" });
    },
  });

  // Get User Route
  server.route<{ Reply: null | UserDtoType }>({
    schema: {
      response: {
        200: UserDto,
        401: ErrorDto,
      },
    },
    method: "GET",
    url: "/api/auth/user",
    // preValidation: [fastifyPassport.authenticate("local", { session: true })],
    handler: async (req, res) => {
      if (!req.user) {
        return res.status(204).send(null);
      }

      const { user } = req;

      return res.status(200).send({
        email: user.email,
        id: user.id,
        isStaff: user.isStaff,
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
      .map(
        (address) => `${address.family} - ${address.address}:${address.port}`
      )
      .join("\n")}`
  );
};

start();
