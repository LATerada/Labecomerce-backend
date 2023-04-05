-- Active: 1680617537489@@127.0.0.1@3306

-- ---------------------- | USERS | --------------------------
-- Create users
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

-- getAllUsers
SELECT * FROM users;

-- createUsers
INSERT INTO users VALUES("u000", "user0@email.com", 12300);

-- createUsers
INSERT INTO users
    VALUES 
        ("u001", "user1@email.com", 12301), 
        ("u002", "user2@email.com", 12302);

-- deleteUsers
DELETE from users
WHERE "id"='u002';

-- createUser
INSERT INTO users
    VALUES ("u003", "user3@email.com", 12303);

-- editUser
UPDATE users
 SET password = 12300 
 WHERE id = 'u000';

-- sortUsersByEmail
SELECT * FROM users
ORDER BY email ASC;



--  --------------------| PRODUCTS |---------------------------
-- Create products
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

-- getAllProducts
SELECT * FROM products;

-- createProducts
INSERT INTO products
    VALUES 
        ("p000", "Product00", 25, "Museum"),
        ("p001", "Product01", 50,"Observatory"),
        ("p002", "Product02", 20, "Zoo"),
        ("p003", "Product03", 5, "Library"), 
        ("p004", "Product04", 30, "Museum");

-- getProductById
SELECT * FROM products
WHERE name = 'monitor';

-- createProducts
INSERT INTO products
    VALUES ("p005", "Product05", 40, "Observatory");

-- getProductById
SELECT * FROM products
WHERE id = "p002";

-- deleteProduct
DELETE FROM products
WHERE id = "p005";

-- editProducts
UPDATE products
    SET category = "museum"
    WHERE id = "p004";

-- sortProductsByPrice / limit 20
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- sortProductByPrice / between 10 and 30
SELECT * FROM products
WHERE price > 10 AND price < 30
ORDER BY price ASC;


--  --------------------| PURCHASES |---------------------------
-- createPurchases
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);
SELECT * FROM purchases;

-- createPurchase
INSERT INTO purchases
    VALUES
        ("pr000", 120, 0, NUll, "u000"),
        ("pr001", 50, 0, NUll, "u000"),
        ("pr002", 500, 0, NUll, "u001"),
        ("pr003", 50, 0, NUll, "u002"),
        ("pr004", 110, 0, NUll, "u002"),
        ("pr005", 90, 0, NUll, "u003");

DELETE FROM purchases
WHERE id = "pr003";

UPDATE purchases
SET delivered_at = DATE("now") 
WHERE id in ("p000","p001","pr002","pr003","p004","p005");

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u000";