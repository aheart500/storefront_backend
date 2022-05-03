import ProductStore from "../../models/product";

const store = new ProductStore();
export const DUMMY_PRODUCT = {
  name: "Book",
  price: 100,
  category: "Education",
};

describe("Product Model", () => {
  beforeAll(async () => {
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
 
});
