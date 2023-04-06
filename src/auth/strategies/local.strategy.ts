import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../../services/prisma";
import argon2 from "argon2";
export default new LocalStrategy(async (username, password, cb) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return false;
  }
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) {
    return false;
  }

  const { password: _password, ...rest} = user
  cb(undefined, rest)
});
