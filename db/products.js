const client  = require('./index')

const createProduct = async({pokedexId, name, price, type1, type2, condition, rarity, imageUrl}) => {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products ("pokedexId", name, price, type1, type2, condition, rarity, "imageUrl")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `, [pokedexId, name, price, type1, type2, condition, rarity, imageUrl])
        console.log(product)
        return product
    }catch(error) {
    console.log('There was an error createProduct from the database', error)
    throw error
    }
}

const getAllProducts = async() => {
    try {
        const {rows: allProducts} = await client.query(`
        SELECT "imageUrl", name, price, condition FROM products
        ;
        `);
        return allProducts;
    } catch (error) {
        console.log('there was an error fetchingAllProducts from the database: ', error);
        throw error;
    }
}

const getOneProduct = async(productId) => {
    try {
        const {rows: [oneProduct]} = await client.query(`
        SELECT * FROM products
        WHERE id = $1
        ;
        `, [productId]);
        return oneProduct;
    } catch (error) {
        console.log('there was an error in fetchOneProduct from database: ', error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct
}