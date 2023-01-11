const client = require("./index");
//dropTables and createTables

const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS products;
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
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        "emailAddress" VARCHAR(255) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(255) UNIQUE
    );
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        "pokedexId" INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6,2) NOT NULL,
        type1 VARCHAR(255) NOT NULL,
        type2 VARCHAR(255),
        condition VARCHAR(255) NOT NULL,
        rarity VARCHAR(255) NOT NULL,
        "imageUrl" VARCHAR(255)
    );
    CREATE TABLE cart_item (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL
    );
    `);
  } catch (error) {
    throw new Error("There was an error creating the tables!");
  }
};

module.exports = {
  dropTables,
  createTables,
};

//Potential look at the tables for order items
//Create order_items
// CREATE TABLE order_item (
//     id SERIAL PRIMARY KEY,
//     order_id INTEGER REFERENCES order_details(id),
//     item_id INTEGER REFERENCES product(id) NOT NULL,
//     quantity INTEGER REFERENCES cart_item(quantity) NOT NULL
// );
