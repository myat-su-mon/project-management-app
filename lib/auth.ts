import bcrypt from "bcrypt";

export const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePasswords = (plainTextPassword, hashedPassword) =>
  bcrypt.compare(plainTextPassword, hashedPassword);
