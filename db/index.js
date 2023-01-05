const {Client} = require('pg')
const client = new Client('postgres://localhost:/pokemon-shopper')



module.exports = client
