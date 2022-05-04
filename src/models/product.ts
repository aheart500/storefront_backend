import Client from "../database";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface ORDER_PRODUCT {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error("Error getting products: " + e);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from products WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Error getting product with id ${id}: ${e}`);
    }
  }
  async create(product: Omit<Product, "id">): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error("Error creating product: " + e);
    }
  }
  async addProductToOrder(
    o: Omit<ORDER_PRODUCT, "id">
  ): Promise<ORDER_PRODUCT> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [
        o.order_id,
        o.product_id,
        o.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error("Error adding product to order: " + e);
    }
  }
}

export default ProductStore;
