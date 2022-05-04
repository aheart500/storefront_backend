import Express, { RequestHandler } from "express";
import OrderStore, { Order } from "../models/order";
import ProductStore, { ORDER_PRODUCT } from "../models/product";
import authenticate from "../utils/middlewares/authenticate";

const store = new OrderStore();
const productStore = new ProductStore();
const index: RequestHandler = async (_req, res) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (e) {
    res.status(400).json(e);
  }
};
const show: RequestHandler = async (req, res) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (e) {
    res.status(400).json(e);
  }
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
const addOrderProduct: RequestHandler = async (req, res) => {
  try {
    const order_product: ORDER_PRODUCT = {
      order_id: parseInt(req.params.id),
      ...req.body,
    };

    const newProduct = await productStore.addProductToOrder(order_product);

    res.send(newProduct);
  } catch (e) {
    res.status(400).json(e);
  }
};
const orderRoutes = (app: Express.Application) => {
  app.get("/orders", authenticate, index);
  app.get("/orders/:id", authenticate, show);
  app.post("/orders", authenticate, create);
  app.post("/orders/:id/products", authenticate, addOrderProduct);
};
export default orderRoutes;
