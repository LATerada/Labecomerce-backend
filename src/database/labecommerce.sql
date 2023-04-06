-- Active: 1680617537489@@127.0.0.1@3306


-- |    USERS   |

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO users VALUES("u000", "user0@email.com", 12300);

INSERT INTO users
    VALUES 
        ("u001", "user1@email.com", 12301), 
        ("u002", "user2@email.com", 12302);
INSERT INTO users VALUES ("u003", "user3@email.com", 12303);

DELETE from users
WHERE "id"='u002';

UPDATE users
 SET password = 12300 
 WHERE id = 'u000';

SELECT * FROM users;

SELECT * FROM users
ORDER BY email ASC;


-- |    PRODUCTS    |

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO products
    VALUES 
        ("p000", "Product00", 25, "Museum"),
        ("p001", "Product01", 50,"Observatory"),
        ("p002", "Product02", 20, "Zoo"),
        ("p003", "Product03", 5, "Library"), 
        ("p004", "Product04", 30, "Museum");

INSERT INTO products VALUES ("p005", "Product05", 40, "Observatory");

DELETE FROM products
WHERE id = "p005";

UPDATE products
    SET category = "museum"
    WHERE id = "p004";

SELECT * FROM products;

SELECT * FROM products
WHERE name = 'monitor';

SELECT * FROM products
WHERE id = "p002";

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

SELECT * FROM products
WHERE price > 10 AND price < 30
ORDER BY price ASC;


-- |    PURCHASES   |

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);

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

SELECT * FROM purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u000";


-- |  PURCHASE PRODUCTS   |

DROP TABLE purchases_products;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO purchases_products
    VALUES
        ("pr000", "p002", 1),
        ("pr000", "p001", 2),
        ("pr001", "p000", 2),
        ("pr002", "p003", 10),
        ("pr002", "p000", 10),
        ("pr002", "p002", 10);

SELECT 
purchases.id as purchaseId,
purchases.total_price,
purchases.buyer_id as buyerId,
products.id AS productId,
purchases_products.quantity,
products.name AS productName,
products.category,
products.price AS productPrice
FROM purchases
INNER JOIN purchases_products ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON purchases_products.product_id = products.id;