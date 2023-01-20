const client  = require('./index')

const createProduct = async({pokedexId, name, price, type1, type2, condition, rarity, quantity, imageUrl}) => {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products ("pokedexId", name, price, type1, type2, condition, rarity, quantity, "imageUrl")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `, [pokedexId, name, price, type1, type2, condition, rarity, quantity, imageUrl])
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
        SELECT products."imageUrl", products.name, products.price, products.id, products.quantity, product_condition.name AS condition
        FROM products
        JOIN product_condition 
        ON products.condition = product_condition.id;
        `);
        console.log("All products", allProducts)
        return allProducts;
    } catch (error) {
        console.log('there was an error fetchingAllProducts from the database: ', error);
        throw error;
    }
}

const getOneProduct = async(productId) => {
    try {
        const {rows: [oneProduct]} = await client.query(`
        SELECT products."pokedexId", products.name, products.price, products.type1, products.type2, products.rarity, products.quantity, products."imageUrl", product_condition.name AS condition
        FROM products
        JOIN product_condition
        ON products.condition=product_condition.id
        WHERE products.id = $1
        ;
        `, [productId]);
        console.log('one product in database', oneProduct)
        return oneProduct;
    } catch (error) {
        console.log('there was an error in fetchOneProduct from database: ', error);
        throw error;
    }
}
const getProductByCondition = async(condition) => {
    try {   
        const {rows: cards} = await client.query(`
        SELECT products."imageUrl", products.name, products.price, products.id, products.quantity, product_condition.name AS condition
        FROM products
        JOIN product_condition
        ON products.condition=product_condition.id
        WHERE product_condition.name=$1
        `, [condition])
        return cards
    }catch(error) {
        console.error('There was a problem getting the product by the condition', error)
        throw error
    }
}

const updateProductQuantity = async(productId, quantity) => {
    try {
        const {rows: [product]} = await client.query(`
        UPDATE products
        SET quantity = quantity - $2
        WHERE id=$1
        RETURNING *
        ;
        `, [productId, quantity]);
        return product;
    } catch (error) {
        console.log('there was an error updating product quantity: ', error);
        throw error;
    }
}
const deleteProduct = async (productId) => {
    try{
        const {rows: [deletedProduct]} = await client.query(`
            DELETE from products
            WHERE id = $1
            RETURNING *
            ;
        `, [productId])
        return deletedProduct
    } catch(error){
        throw error
    }
}
module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProductQuantity,
    getProductByCondition,
    deleteProduct
}