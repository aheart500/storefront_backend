import Client from "../database";
export type OrderStatus = "ACTIVE" | "COMPLETE";
export interface Order {
  id: number;
  quantity: number;
  status: OrderStatus;
  product_id: number;
  user_id: number;
}

class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error("Error getting orders: " + e);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from orders WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Error getting order with id ${id}: ${e}`);
    }
  }
  async getUserOrders(user_id: number, status: OrderStatus): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from orders WHERE user_id=$1 AND status=$2";
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Error getting user's order: ${e}`);
    }
  }
  async create(order: Omit<Order, "id">): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (quantity, status, product_id, user_id) VALUES ($1,$2,$3)";
      const result = await conn.query(sql, [
        order.quantity,
        order.status,
        order.product_id,
        order.user_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error("Error creating order: " + e);
    }
  }
}

export default OrderStore;
