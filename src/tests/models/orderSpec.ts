import OrderStore, { Order } from "../../models/order";

const store = new OrderStore();
export const DUMMY_ORDER: Omit<Order,'id'>= {
quantity: 2,
status: "ACTIVE",
product_id: '1',
user_id: '1'
};

describe("Order Model", () => {
  beforeAll(async () => {
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
    expect(result.product_id).toEqual('1');
  });

  it("gets a product", async () => {
    const result = await store.show(1);
    expect(result.status).toEqual("ACTIVE");
  });
 
});
