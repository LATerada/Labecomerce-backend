-- Active: 1680617537489@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

INSERT INTO users VALUES("u000", "user0@email.com", 12300);

INSERT INTO users
    VALUES 
        ("u001", "user1@email.com", 12301), 
        ("u002", "user2@email.com", 12302);

DELETE from users
WHERE "id"='u002';

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

SELECT * FROM products;

INSERT INTO products
    VALUES 
        ("p000", "Product00", 25, "Museum"),
        ("p001", "Product01", 50,"Observatory"),
        ("p002", "Product02", 20, "Zoo"),
        ("p003", "Product03", 5, "Library"), 
        ("p004", "Product04", 30, "Museum");

SELECT * FROM products
WHERE name = 'monitor';

INSERT INTO users
    VALUES ("u003", "user3@email.com", 12303);

INSERT INTO products
    VALUES ("p005", "Product05", 40, "Observatory");

SELECT * FROM products
WHERE id = "p002";

DELETE FROM products
WHERE id = "p005";

UPDATE users
 SET password = 12300 
 WHERE id = 'u000';

UPDATE products
    SET category = "museum"
    WHERE id = "p004";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

SELECT * FROM products
WHERE price > 10 AND price < 30
ORDER BY  price ASC;