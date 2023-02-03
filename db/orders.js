const client = require('./index')

const createOrderDetail = async({address, orderTotal, userId, date, zip, city, state}) => {
    try {
        const {rows: [order_detail]} = await client.query(`
            INSERT INTO order_details ("shippingAddress", "orderTotal", user_id, date, zip, city, state)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [address, orderTotal, userId, date, zip, city, state])
    return order_detail
}catch(error) {
        console.log("There was an error creating the order detail in the database", error)
        throw error
    }
}

const createOrderItem = async({order_id, product_id, quantity}) => {
    try {
        const {rows: [order_item]} = await client.query(`
            INSERT INTO order_item (order_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [order_id, product_id, quantity])
        return order_item
    }catch(error) {
        console.error("There was an error creating the order item", error)
        throw error
    }
}

const getAllOrders = async(user_id) => {
    try {
    const {rows: order_detail} = await client.query(`
    SELECT order_details.id, order_details."shippingAddress", order_details.zip, order_details.city, order_details.state, order_details."orderTotal", order_details.date , order_item."quantity", order_item.product_id, products.name, products."imageUrl"
    FROM order_details
    JOIN order_item ON order_details.id=order_item.order_id
    JOIN products ON order_item.product_id=products.id
    WHERE order_details.user_id=$1
    `, [user_id])
    let allOrders = []
    let emptyObject = {}
    for(let i = 0; i < order_detail.length; i++) {
        if (!emptyObject.id) {
            console.log(order_detail[i])
            emptyObject['id'] = order_detail[i].id
            emptyObject['shippingAddress'] = order_detail[i].shippingAddress
            emptyObject['orderTotal'] = order_detail[i].orderTotal
            emptyObject['date'] = order_detail[i].date
            emptyObject['zip'] = order_detail[i].zip
            emptyObject['city'] = order_detail[i].city
            emptyObject['state'] = order_detail[i].state
            emptyObject['products'] = []
           
        }else if (emptyObject.id != order_detail[i].id) {
            allOrders.push(emptyObject)
            emptyObject = {}
            i -= 1
            continue
        }
        emptyObject.products.push({
            product_id: order_detail[i].product_id,
            name: order_detail[i].name,
            quantity: order_detail[i].quantity,
            imageUrl: order_detail[i].imageUrl
            })
        if(i == order_detail.length - 1) {
            allOrders.push(emptyObject)
        }
    }
    console.log('all orders', allOrders)
    return allOrders
    }catch(error) {
        console.error("There was an error getting the order details", error)
        throw error
    }
}

module.exports = {
    createOrderDetail,
    createOrderItem,
    getAllOrders
}