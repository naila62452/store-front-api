# Database schema tables and columns

Database tables
1. User table:
CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    password VARCHAR,
    email VARCHAR);
To get the data from database the following are the routes to store user, get user, authenticate user.

 app.post('/signup', addUser);
 app.get('/user', getUser);
 app.get('/users', index);
 app.post('/auth', authenticate);

2. Product table:
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price integer NOT NULL
);
To get the data from database the following are the routes to store product, get all products and get product by id.

 app.post('/addproduct', add);
 app.get('/showall', showAllProducts);
 app.get('/show', showById);

3. Order table:
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id bigint REFERENCES users(id),
    product_id bigint REFERENCES products(id),
    quantity integer
);
To get the data from database the following are the routes to store order, get order.

    app.post('/addorder', addOrder);
    app.post('/order/:id/product', addProduct)
    app.get('/get-order', currentOrder)






