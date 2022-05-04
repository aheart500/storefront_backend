import Express, { Request, RequestHandler, Response } from "express";
import OrderStore, { OrderStatus } from "../models/order";
import { User, UserStore } from "../models/user";
import authenticate from "../utils/middlewares/authenticate";

const store = new UserStore();
const orderStore = new OrderStore();
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
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
  try {
    const userToken = await store.login(req.body);
    res.json(userToken);
  } catch (e) {
    res.status(400).json(e);
  }
};

const getUserOrders: RequestHandler = async (req, res) => {
  try {
    const userOrders = await orderStore.getUserOrders(
      parseInt(req.params.id),
      req.params.status as OrderStatus
    );

    res.json(userOrders);
  } catch (e) {
    res.status(400).json(e);
  }
};

const userRoutes = (app: Express.Application) => {
  app.get("/users", authenticate, index);
  app.get("/users/:id", authenticate, show);
  app.get("/users/:id/orders/:status", authenticate, getUserOrders);
  app.post("/users", create);
  app.post("/users/login", login);
};
export default userRoutes;
