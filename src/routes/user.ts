import Express, { Request, Response } from "express";
import { UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const userRoutes = (app: Express.Application) => {
  app.get("/users", index);
};
export default userRoutes;
