-- Active: 1680617537489@@127.0.0.1@3306

-- |    USERS   |

DROP TABLE users;

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME())
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u000",
        "User0",
        "user0@email.com",
        12300
    ), (
        "u001",
        "User1",
        "user1@email.com",
        12301
    ), (
        "u002",
        "User2",
        "user2@email.com",
        12302
    ), (
        "u003",
        "User3",
        "user3@email.com",
        12303
    );

DELETE from users WHERE "id"='u002';

UPDATE users SET password = 12300 WHERE id = 'u000';

SELECT * FROM users;

SELECT * FROM users ORDER BY email ASC;

-- |    PRODUCTS    |

DROP TABLE products;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO products
VALUES (
        "p000",
        "Product00",
        25,
        "This world-famous museum is comprised of several different Halls, each dedicated to a particular theme.",
        "https://lh3.googleusercontent.com/p/AF1QipOJe1wS9kIJ0TpAo_MwfimBe2umxF0Fnc7Puvle=s680-w680-h510"
    ), (
        "p001",
        "Product01",
        50,
        "Rising over 1,100 feet in the air from the heart of Hudson Yards, Edge is designed to take visitors out of their comfort zone to experience New York as it has never been seen before.",
        "https://lh3.googleusercontent.com/p/AF1QipNGZ-FiefpQnLNu2ws08okVp-rGt0ScDo5VYcZV=s680-w680-h510"
    ), (
        "p002",
        "Product02",
        20,
        "ince the 1860's, animals could be found at Fifth Avenue and 64th Street in Central Park. Growing from a collection of donated animals - 72 'white swans' and a black bear cub, the Zoo today is host to over 1,400 animals of 130-plus species.",
        "https://centralparkbikerental.nyc/content/uploads/attractions/5823a691df459_central_park_zoo_sm.JPG"
    ), (
        "p003",
        "Product03",
        5,
        "The majestic Beaux-Arts building, flanked by the two famous marble lions, Patience and Fortitude, has been the heart and soul of the New York library system for nearly a century.",
        "https://toc.h-cdn.co/assets/16/41/4000x2666/gallery-1476461604-public-library.jpg"
    ), (
        "p004",
        "Product04",
        30,
        "The American Museum of the Moving Image is dedicated to educating the public about the art, history, technique, and technology of film, television, and digital media, and to examining their impact on culture and society",
        "https://www.new-york-city-travel-tips.com/wordpress/wp-content/uploads/2014/11/Museum-of-the-Moving-Image-MPVNY-BPVNY-NYCTT-2.jpg"
    );

DELETE FROM products WHERE id = "p005";

SELECT * FROM products;

SELECT * FROM products WHERE name = 'monitor';

SELECT * FROM products WHERE id = "p002";

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT *
FROM products
WHERE price > 10 AND price < 30
ORDER BY price ASC;

-- |    PURCHASES   |

DROP TABLE purchases;

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at DATE DEFAULT (DATETIME()),
        paid INTEGER DEFAULT (0),
        -- delivered_at TEXT NOT NULL,
        Foreign Key (buyer) REFERENCES users(id)
    );

INSERT INTO
    purchases (id, buyer, total_price)
VALUES ("pr000", "u000", 120), ("pr001", "u000", 50), ("pr002", "u001", 500), ("pr003", "u002", 50), ("pr004", "u002", 110), ("pr005", "u003", 90);

DELETE FROM purchases WHERE id = "pr003";

SELECT * FROM purchases;

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id
WHERE users.id = "u000";

-- |  PURCHASE PRODUCTS   |

DROP TABLE purchases_products;

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL
    );

INSERT INTO purchases_products
VALUES ("pr000", "p002", 1), ("pr000", "p001", 2), ("pr001", "p000", 2), ("pr002", "p003", 10), ("pr002", "p000", 10), ("pr002", "p002", 10);

SELECT
    purchases.id as purchaseId,
    purchases.total_price,
    purchases.buyer as buyerId,
    products.id AS productId,
    products.name AS productName,
    products.price AS productPrice
FROM purchases
    INNER JOIN purchases_products ON purchases.id = purchases_products.purchase_id
    INNER JOIN products ON purchases_products.product_id = products.id;