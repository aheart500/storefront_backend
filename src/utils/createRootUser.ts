import { ROOT_USER } from "../config";
import { UserStore } from "../models/user";

const store = new UserStore();

const createRootUser = async (): Promise<void> => {
  const rootUser = await store.create(ROOT_USER);
  console.log("Created root user: ", rootUser);
  return;
};
export default createRootUser;
