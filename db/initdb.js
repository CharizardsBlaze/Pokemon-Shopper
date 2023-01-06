const client = require('./index')
//dropTables and createTables

const dropTables = async () => {
    try {
    console.log("Starting to drop tables")
    await client.query(`
    DROP TABLE IF EXISTS products_category;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `)    
    console.log("Completed drop tables.")
    }catch(error) {
        console.log("There was an error dropping the tables")
        throw error
    }
}
//CREATES TABLE FOR USERS, PRODUCT, PRODUCT CATEGORY, PRODUCT INVENTORY 

const createTables = async() => {
    try {
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255),
        password VARCHAR(2550) NOT NULL,
        "emailAddress" VARCHAR(255) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(255) UNIQUE
        );
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        "imageUrl" VARCHAR(255)
        );
    CREATE TABLE product_category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        product_id INTEGER REFERENCES products(id)
         );
    CREATE TABLE product_inventory (
        id SERIAL PRIMARY KEY,
        quanitity INTEGER NOT NULL,
        product_id INTEGER REFERENCES products(id)
        );
    `)
    }catch(error) {
       throw new Error("There was an error creating the tables!")
    }
}


module.exports = {
    dropTables, 
    createTables
}