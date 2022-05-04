ALTER TABLE order_products DROP COLUMN user_id;
ALTER TABLE order_products DROP COLUMN status;
ALTER TABLE order_products ADD order_id BIGINT REFERENCES orders(id);

