const { client } = require('./index')

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
    fetchAllProducts,
    fetchOneProduct,

}