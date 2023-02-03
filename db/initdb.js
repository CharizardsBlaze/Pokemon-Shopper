const client = require("./index");
//dropTables and createTables

const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS order_item;
    DROP TABLE IF EXISTS order_details;
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS product_condition;
    DROP TABLE IF EXISTS product_rarity;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Completed drop tables.");
  } catch (error) {
    console.log("There was an error dropping the tables");
    throw error;
  }
};
//CREATES TABLE FOR USERS, PRODUCT, PRODUCT CATEGORY, PRODUCT INVENTORY

const createTables = async () => {
  try {
    console.log('creating tables...')
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        "emailAddress" VARCHAR(255) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(255),
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
    );
    CREATE TABLE product_condition (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE product_rarity (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        "pokedexId" INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6,2) NOT NULL,
        type1 VARCHAR(255) NOT NULL,
        type2 VARCHAR(255),
        condition INTEGER REFERENCES product_condition(id) NOT NULL,
        rarity INTEGER REFERENCES product_rarity(id) NOT NULL,
        quantity INTEGER NOT NULL,
        "imageUrl" VARCHAR(255)
    );
    CREATE TABLE cart_item (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL
    );
    CREATE TABLE order_details(
      id SERIAL PRIMARY KEY,
      "shippingAddress" VARCHAR(100) NOT NULL,
      "orderTotal" DECIMAL(6,2) NOT NULL,
      user_id INTEGER REFERENCES users(id),
      date VARCHAR(255) NOT NULL ,
      zip INTEGER NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL
    );
    CREATE TABLE order_item (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES order_details(id),
      product_id INTEGER REFERENCES products(id) NOT NULL,
      quantity INTEGER NOT NULL
    );
    `);
    console.log('done creating tables')
  } catch (error) {
    console.error("There was an error creating the tables!", error)
    throw error
  }
};

module.exports = {
  dropTables,
  createTables,
};