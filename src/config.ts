import dotenv from "dotenv";
dotenv.config();

const {
  BCRYPT_PEPPER,
  SALT_ROUNDS,
  ROOT_USER_FIRST_NAME,
  ROOT_USER_LAST_NAME,
  ROOT_USER_PASSWORD,
} = process.env;

export const BCRYPT = {
  pepper: BCRYPT_PEPPER!,
  salt: parseInt(SALT_ROUNDS!),
};

export const ROOT_USER = {
  firstName: ROOT_USER_FIRST_NAME!,
  lastName: ROOT_USER_LAST_NAME!,
  password: ROOT_USER_PASSWORD!,
};
export const JWT_SECRET = process.env.JWT_SECRET!;
