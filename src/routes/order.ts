import Express, { RequestHandler } from "express";
import OrderStore, { Order } from "../models/order";
import authenticate from "../utils/middlewares/authenticate";

const store = new OrderStore();

const index: RequestHandler = async (_req, res) => {
  const orders = await store.index();
  res.json(orders);
};
const show: RequestHandler = async (req, res) => {
  const order = await store.show(parseInt(req.params.id));
  res.json(order);
};

const create: RequestHandler = async (req, res) => {
  try {
    const order: Order = req.body;
    const newOrder = await store.create(order);
    res.send(newOrder);
  } catch (e) {
    res.status(400).json(e);
  }
};

const orderRoutes = (app: Express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", authenticate, create);
};
export default orderRoutes;
