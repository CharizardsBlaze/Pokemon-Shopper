const {client} = require('./index')

const createCartItem = async({user_id, product_id, quantity}) => {
    try {
        const {rows: [cart_item]} = await client.query(` 
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [user_id, product_id, quantity])
        return cart_item
    }catch(error) {
        console.log("There was an error creating cart Item in the database", error)
        throw error
    }
}

const getCartItemsByUserId = async({id}) => {
    try {
        const{rows: cartItem} = await client.query(`
        SELECT cart_item.*, products."pokedexId", products.name, products.price, products.type1, products.type2, products.condition, products.rarity, products."imageUrl"
        FROM cart_item
        LEFT JOIN products
        ON cart_item.product_id=product.id
        WHERE cart_item.user_id=$1
        `, [id])
        for(let i = 0; i < cartItem.length; i++) {
            cartItem['itemCost'] = (cartItem[i].price * cartItem[i].quantity)
            delete cartItem[i].price
        }
        let totalSum = 0
        for(let i = 0; i < cartItem.length; i++) {
            totalSum += cartItem[i].itemCost
        }
        cartItem['totalCost'] = totalSum
        return cartItem
    }catch(error) {
        console.log("There was an error getting cartItems by userId", error)
        throw error
    }
}

const deleteCartItemsByUserId = async({id}) => {
    try {
        const {rows: cartItems} = await client.query(`
        DELETE FROM cart_item 
        WHERE user_id=$1;
        `, [id])
        return cartItems
    }catch(error) {
        console.error('There was an error trying to delete the users cart by user id', error)
        throw error
    }
}

module.exports = {
    createCartItem,
    getCartItemsByUserId,
    deleteCartItemsByUserId
}