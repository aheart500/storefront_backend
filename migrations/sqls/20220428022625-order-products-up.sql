CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    status VARCHAR(50),
    product_id BIGINT REFERENCES products(id),
    user_id BIGINT REFERENCES users(id) 
    );