"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _securesession = require('@fastify/secure-session'); var _securesession2 = _interopRequireDefault(_securesession);
var _fastify = require('fastify'); var _fastify2 = _interopRequireDefault(_fastify);

// src/auth/strategies/local.strategy.ts
var _passportlocal = require('passport-local');

// src/services/prisma.ts
var _client = require('@prisma/client');
var prisma_default = new (0, _client.PrismaClient)();

// src/auth/strategies/local.strategy.ts
var _argon2 = require('argon2'); var _argon22 = _interopRequireDefault(_argon2);
var local_strategy_default = new (0, _passportlocal.Strategy)(async (username, password, cb) => {
  console.log({ username, password });
  const user = await prisma_default.user.findUnique({ where: { username } });
  if (!user) {
    return false;
  }
  const passwordValid = await _argon22.default.verify(user.password, password);
  if (!passwordValid) {
    return false;
  }
  const { password: _password, ...rest } = user;
  cb(void 0, rest);
});

// src/index.ts

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _passport = require('@fastify/passport'); var _passport2 = _interopRequireDefault(_passport);
var server = _fastify2.default.call(void 0, );
server.register(_securesession2.default, {
  cookieName: "sessionid",
  key: _fs2.default.readFileSync(new URL("../secret_key", import.meta.url)),
  cookie: {
    path: "/"
  }
});
server.get("/", (req, res) => {
  console.log(req.session);
  res.send("Hello");
});
server.register(_passport2.default.initialize());
server.register(_passport2.default.secureSession());
_passport2.default.use("local", local_strategy_default);
_passport2.default.registerUserSerializer(
  async (user, request) => user.username
);
_passport2.default.registerUserDeserializer(async (username, request) => {
  const { password, ...user } = await prisma_default.user.findUniqueOrThrow({
    where: { username }
  });
  return user;
});
server.post(
  "/login",
  {
    preValidation: _passport2.default.authenticate("local", {
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
  const passwordHash = await _argon22.default.hash(password);
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
//# sourceMappingURL=index.cjs.map