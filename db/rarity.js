const client = require('./index')

const createRarity = async(name) => {
    try {
        const {rows: [rarity]} = await client.query(`
        INSERT INTO product_rarity (name)
        VALUES ($1)
        RETURNING *;
        `, [name])
        return rarity
    }catch(error) {
        console.error("There was an error creating the rarities", error)
        throw error
    }
}
const getAllRarities = async() => {
    try {
        const {rows: rarities} = await client.query(`
        SELECT * 
        FROM
        product_rarity
        `)
        console.log(rarities)
        return rarities
    }catch(error) {
        console.error("There was an error fetching all the rarities", error)
        throw error
    }
}
module.exports = {
    createRarity,
    getAllRarities,
    getAllRarities
}