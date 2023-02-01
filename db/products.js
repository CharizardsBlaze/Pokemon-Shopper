const client  = require('./index')

const createProduct = async({pokedexId, name, price, type1, type2, condition, rarity, quantity, imageUrl}) => {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products ("pokedexId", name, price, type1, type2, condition, rarity, quantity, "imageUrl")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `, [pokedexId, name, price, type1, type2, condition, rarity, quantity, imageUrl])
        return product
    }catch(error) {
    console.log('There was an error createProduct from the database', error)
    throw error
    }
}

const getAllProducts = async() => {
    try {
        const {rows: allProducts} = await client.query(`
        SELECT products."pokedexId", products."imageUrl", products.name, products.price, products.id, products.type1, products.type2, products.quantity, product_condition.name AS condition
        FROM products
        JOIN product_condition 
        ON products.condition = product_condition.id;
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
        SELECT products."pokedexId", products.name, products.price, products.type1, products.type2, products.rarity, products.quantity, products."imageUrl", product_condition.name AS condition
        FROM products
        JOIN product_condition
        ON products.condition=product_condition.id
        WHERE products.id = $1
        ;
        `, [productId]);
        return oneProduct;
    } catch (error) {
        console.log('there was an error in fetchOneProduct from database: ', error);
        throw error;
    }
}
const getProductsByQuery = async(fields) => {
    const keys = Object.keys(fields)
    const beforeString = keys.map(name => `JOIN product_${name} ON products.${name}=product_${name}.id`)
    const joinString = beforeString.join(' ')
    const whereString = keys.map((name, index) => `product_${name}.id=$${index+1}`).join(' AND ')
    try {   
        const {rows: cards} = await client.query(`
        SELECT products."imageUrl", products.name, products.price, products.id, products.quantity
        FROM products
        ${joinString}
        WHERE ${whereString};
        `, [...Object.values(fields)])
        return cards
    }catch(error) {
        console.error('There was a problem getting the product by the query', error)
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
const updateProduct = async ({pokedexId, name, price, type1, type2, condition, quantity, imageUrl, productId}) => {
    try{
        const {rows: [updatedProduct]} = await client.query(`
            UPDATE products
            set "pokedexId" = $1, name = $2, price = $3, type1 = $4, type2 = $5, condition = $6, quantity = $7, "imageUrl" = $8
            WHERE id = $9
            RETURNING *
            ;
        `, [pokedexId, name, price, type1, type2, condition, quantity, imageUrl, productId])
        return updatedProduct
    }catch(error){
        throw error
    }
}
module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProductQuantity,
    deleteProduct,
    updateProduct,
    getProductsByQuery,
}
