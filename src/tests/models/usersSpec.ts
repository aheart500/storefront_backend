import { UserStore } from "../../models/user";

const store = new UserStore();
const DUMMY_USER = {
  firstname: "Mohamed",
  lastname: "Nasser",
  password: "01149707289",
};

describe("User Model", () => {
  beforeAll(async () => {
    await store.create(DUMMY_USER);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index should return a list of users", async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });
  it("creates a user", async () => {
    const result = await store.create(DUMMY_USER);
    expect(result.firstname).toEqual("Mohamed");
  });

  it("gets a user", async () => {
    const result = await store.show(1);
    expect(result.firstname).toEqual("Mohamed");
  });
  it("gets a user token", async () => {
    const result = await store.login(DUMMY_USER);
    expect(result).toBeTruthy();
  });
});
