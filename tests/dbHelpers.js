const client = require('../db/index')



const createFakeUser = async() => {
let fakeData = {}
fakeData.username = Math.random()
fakeData.firstName = Math.random()
fakeData.lastName = Math.random()
fakeData.password = Math.random()
fakeData.emailAddress = Math.random()
fakeData.phoneNumber = Math.random()

    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users (username, "firstName", "lastName", password, "emailAddress", "phoneNumber")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,[...Object.values(fakeData)])
        return user
    }catch(error) {
        console.error('There was an error creating fake user in the tests', error)
        throw error
    }
}

const getFakeUserByEmail = async({emailAddress}) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE "emailAddress"=$1;
        `, [emailAddress])
        delete user.password
        return user
    }catch(error) {
        console.error('There was an error getting fake user by email', error)
    }
}

const getFakeUserById = async ({id}) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE id=$1;
        `, [id])
        delete user.password
        return user
    }catch(error) {
        console.error(error)
    }
}

module.exports = {
    createFakeUser,
    getFakeUserByEmail,
    getFakeUserById
}