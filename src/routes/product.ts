import Express, { RequestHandler } from "express";
import ProductStore, { Product } from "../models/product";
import authenticate from "../utils/middlewares/authenticate";

const store = new ProductStore();

const index: RequestHandler = async (_req, res) => {
  const products = await store.index();
  res.json(products);
};
const show: RequestHandler = async (req, res) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
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
