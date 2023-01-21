const client = require('./index')
const getAllConditions = async () => {
    try {
        const {rows: conditions} = await client.query(`
        SELECT * FROM
        product_condition;
        `)
        return conditions
    }catch(error) {
        console.error("There was an error getting all the conditions", error)
        throw error
    }
}
const createCondition = async(name) => {
    try {
        const {rows: [condition]} = await client.query(`
        INSERT INTO product_condition (name)
        VALUES ($1)
        RETURNING *;
        `, [name])
        return condition
    }catch(error) {
        console.error("There was an error creating the condition table", error)
    }
}

module.exports = {
    createCondition,
    getAllConditions
}