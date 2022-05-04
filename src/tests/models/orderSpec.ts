import OrderStore, { Order } from "../../models/order";
import { UserStore } from "../../models/user";
import { DUMMY_USER } from "./usersSpec";

const store = new OrderStore();
const usersStore = new UserStore();
export const DUMMY_ORDER: Omit<Order, "id"> = {
  status: "ACTIVE",
  user_id: "1",
};

describe("Order Model", () => {
  beforeAll(async () => {
    await usersStore.create(DUMMY_USER);
    await store.create(DUMMY_ORDER);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });
  it("creates an order", async () => {
    const result = await store.create(DUMMY_ORDER);
    expect(result.user_id).toEqual("1");
  });

  it("gets an order", async () => {
    const result = await store.show(1);
    expect(result.status).toEqual("ACTIVE");
  });
});
