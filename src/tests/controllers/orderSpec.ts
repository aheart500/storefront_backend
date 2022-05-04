import supertest from "supertest";
import app from "../../server";
import { DUMMY_ORDER } from "../models/orderSpec";
import { DUMMY_PRODUCT } from "../models/productSpec";

import { TOKEN } from "./userSpec";

const request = supertest(app);

describe("Order Route", () => {
  beforeAll(async () => {
    await request
      .post("/orders")
      .send(DUMMY_ORDER)
      .set("Authorization", "Bearer " + TOKEN);
    await request
      .post("/products")
      .send(DUMMY_PRODUCT)
      .set("Authorization", "Bearer " + TOKEN);
  });
  it("Fetches all orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toEqual(200);
  });
  it("Fetches certain order", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toEqual(200);
  });
  it("Creates an order", async () => {
    const response = await request
      .post("/orders")
      .send(DUMMY_ORDER)
      .set("Authorization", "Bearer " + TOKEN);
    expect(response.body.status).toEqual("ACTIVE");
  });
  it("Creates an order product", async () => {
    const response = await request
      .post("/orders/1/products")
      .send({ product_id: 1, quantity: 2 })
      .set("Authorization", "Bearer " + TOKEN);
    expect(response.body.order_id).toEqual("1");
  });
});
