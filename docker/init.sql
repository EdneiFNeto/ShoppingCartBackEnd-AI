CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
    ('Laptop', 1200.50),
    ('Mouse', 25.00),
    ('Keyboard', 75.75);
