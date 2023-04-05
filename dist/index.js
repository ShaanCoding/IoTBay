// src/index.ts
import fastifySecureSession from "@fastify/secure-session";
import fastify from "fastify";

// src/auth/strategies/local.strategy.ts
import { Strategy as LocalStrategy } from "passport-local";

// src/services/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma_default = new PrismaClient();

// src/auth/strategies/local.strategy.ts
import argon2 from "argon2";
var local_strategy_default = new LocalStrategy(async (username, password, cb) => {
  console.log({ username, password });
  const user = await prisma_default.user.findUnique({ where: { username } });
  if (!user) {
    return false;
  }
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) {
    return false;
  }
  const { password: _password, ...rest } = user;
  cb(void 0, rest);
});

// src/index.ts
import argon22 from "argon2";
import fs from "fs";
import fastifyPassport from "@fastify/passport";
var server = fastify();
server.register(fastifySecureSession, {
  cookieName: "sessionid",
  key: fs.readFileSync(new URL("../secret_key", import.meta.url)),
  cookie: {
    path: "/"
  }
});
server.get("/", (req, res) => {
  console.log(req.session);
  res.send("Hello");
});
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());
fastifyPassport.use("local", local_strategy_default);
fastifyPassport.registerUserSerializer(
  async (user, request) => user.username
);
fastifyPassport.registerUserDeserializer(async (username, request) => {
  const { password, ...user } = await prisma_default.user.findUniqueOrThrow({
    where: { username }
  });
  return user;
});
server.post(
  "/login",
  {
    preValidation: fastifyPassport.authenticate("local", {
      authInfo: false,
      session: true
    })
  },
  (req, res) => {
    return res.status(200).send({
      message: "Logged in"
    });
  }
);
server.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await argon22.hash(password);
  const user = await prisma_default.user.create({
    data: {
      username,
      password: passwordHash
    },
    select: {
      username: true
    }
  });
  return res.status(201).send({
    message: "Successfully created user"
  });
});
var start = async () => {
  try {
    console.log("Server Started");
    await server.listen({ port: 3e3 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
//# sourceMappingURL=index.js.map