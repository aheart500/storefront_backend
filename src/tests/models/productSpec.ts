import OrderStore from "../../models/order";
import ProductStore from "../../models/product";
import { UserStore } from "../../models/user";
import { DUMMY_ORDER } from "./orderSpec";
import { DUMMY_USER } from "./usersSpec";

const store = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

export const DUMMY_PRODUCT = {
  name: "Book",
  price: 100,
  category: "Education",
};

describe("Product Model", () => {
  beforeAll(async () => {
    await userStore.create(DUMMY_USER);
    await orderStore.create(DUMMY_ORDER);
    await store.create(DUMMY_PRODUCT);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index should return a list of products", async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });
  it("creates a product", async () => {
    const result = await store.create(DUMMY_PRODUCT);
    expect(result.name).toEqual("Book");
  });

  it("gets a product", async () => {
    const result = await store.show(1);
    expect(result.name).toEqual("Book");
  });
  it("adds a product to an order", async () => {
    const result = await store.addProductToOrder({
      product_id: 1,
      order_id: 1,
      quantity: 2,
    });
    expect(result.id).toBeDefined();
  });
});
