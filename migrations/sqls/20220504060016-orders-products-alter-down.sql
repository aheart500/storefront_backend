ALTER TABLE order_products ADD user_id BIGINT REFERENCES users(id) ;
ALTER TABLE order_products ADD  status VARCHAR(50);
ALTER TABLE order_products DROP COLUMN order_id;

