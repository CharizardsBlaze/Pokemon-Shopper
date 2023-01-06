const client = require('./index')
//dropTables and createTables

const dropTables = async () => {
    try {
    console.log("Starting to drop tables")
    await client.query(`
    DROP TABLE IF EXISTS order_item;
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS cart_session
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
        password VARCHAR(255) NOT NULL,
        "emailAddress" VARCHAR(255) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(255) UNIQUE
    );
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        "pokedexId" INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        type1 VARCHAR(255) NOT NULL,
        type2 VARCHAR(255),
        quality VARCHAR(255) NOT NULL,
        rarity VARCHAR(255) NOT NULL,
        "imageUrl" VARCHAR(255)
    );
    CREATE TABLE cart_session (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE NOT NULL,
        total_cost INTEGER NOT NULL
    );
    CREATE TABLE cart_item (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) NOT NULL,
        sesion_id INTEGER REFERENCES cart_session(id) NOT NULL,
        quantity INTEGER NOT NULL
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



//Create order_items
// CREATE TABLE order_item (
//     id SERIAL PRIMARY KEY,
//     session_id INTEGER REFERENCES cart_session(id) NOT NULL,
//     item_id INTEGER REFERENCES product(id) NOT NULL,
//     quantity INTEGER REFERENCES cart_item(quantity) NOT NULL
// );