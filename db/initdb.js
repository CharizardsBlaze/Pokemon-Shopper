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
        password VARCHAR(2550) NO NULL,
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

const fetchAllProducts = async() => {
    try {
        const {rows: allProducts} = await client.query(`
        SELECT * FROM products
        ;
        `);
        return allProducts;
    } catch (error) {
        console.log('there was an error fetchingAllProducts from the database: ', error);
        throw error;
    }
}

const fetchOneProduct = async(productId) => {
    try {
        const {rows: OneProduct} = await client.query(`
        SELECT * FROM products
        WHERE id = $1
        ;
        `, [productId]);
        return OneProduct;
    } catch (error) {
        console.log('there was an error in fetchOneProduct from database: ', error);
        throw error;
    }
}

module.exports = {
    dropTables, 
    createTables
}