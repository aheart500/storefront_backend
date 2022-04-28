import Client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BCRYPT, JWT_SECRET } from "../config";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error("Error getting users: " + e);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Error getting user with id ${id}: ` + e);
    }
  }
  async create(user: Omit<User, "id">): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1,$2,$3)";
      const hash = bcrypt.hashSync(user.password + BCRYPT.pepper, BCRYPT.salt);

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);

      conn.release();

      return result.rows[0];
    } catch (e) {
      throw new Error("Error creating user: " + e);
    }
  }
  async login(user: Omit<User, "id">): Promise<string | null> {
    const conn = await Client.connect();
    const sql = "SELECT * from users WHERE firstName=$1 AND lastName=$2";
    const result = await conn.query(sql, [user.firstName, user.lastName]);
    conn.release();
    if (result.rows.length) {
      const savedUser: User = result.rows[0];
      if (
        bcrypt.compareSync(user.password + BCRYPT.pepper, savedUser.password)
      ) {
        const token = jwt.sign({ user: savedUser }, JWT_SECRET);
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
