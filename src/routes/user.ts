import Express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import authenticate from "../utils/middlewares/authenticate";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};
const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};
const create = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await store.create(user);
    res.send(newUser);
  } catch (e) {
    res.status(400).json(e);
  }
};
const login = async (req: Request, res: Response) => {
  const userToken = await store.login(req.body);
  res.json(userToken);
};

const userRoutes = (app: Express.Application) => {
  app.get("/users", authenticate, index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/users/login", login);
};
export default userRoutes;
