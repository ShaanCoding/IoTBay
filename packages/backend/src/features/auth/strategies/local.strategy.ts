import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import prisma from "../../../services/prisma";

/**
 * Used to authenticate a user using a username and password.
 */
export default new LocalStrategy(async (email, password, cb) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    cb(undefined, false)
    return;
  }
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) {
    cb(undefined, false)
    return;
  }

  const { password: _password, ...rest} = user
  cb(undefined, rest)
});
