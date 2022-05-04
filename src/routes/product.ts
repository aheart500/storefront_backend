import Express, { RequestHandler } from "express";
import ProductStore, { ORDER_PRODUCT, Product } from "../models/product";
import authenticate from "../utils/middlewares/authenticate";

const store = new ProductStore();

const index: RequestHandler = async (_req, res) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (e) {
    res.status(400).json(e);
  }
};
const show: RequestHandler = async (req, res) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (e) {
    res.status(400).json(e);
  }
};

const create: RequestHandler = async (req, res) => {
  try {
    const product: Product = req.body;
    const newProduct = await store.create(product);
    res.send(newProduct);
  } catch (e) {
    res.status(400).json(e);
  }
};

const productRoutes = (app: Express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", authenticate, create);
};
export default productRoutes;
