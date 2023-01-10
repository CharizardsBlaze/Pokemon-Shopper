const bcrypt = require('bcrypt')
const client = require('.')

const createUser = async ({username, firstName, lastName, password, emailAddress, phoneNumber}) => {
    const cryptedPassword = await bcrypt.hash(password, 10)
    try{
        // add error handling for dup username
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, "firstName", "lastName", password, "emailAddress", "phoneNumber")
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT ("emailAddress") DO NOTHING
        RETURNING username, "firstName", "lastName", "emailAddress", "phoneNumber"
        ;
        `, [username, firstName, lastName, cryptedPassword, emailAddress, phoneNumber])
        return user;
    }catch(error){
        throw new Error('Error creating user')
    }
}
const getUserById = async ({id}) => {
    try{
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE id = $1
            ;
        `, [id])
        return user;
    }catch(error){
        throw new Error('Error getting user by Id')
    }
}
const getUserByEmail = async ({emailAddress}) => {
    try{
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE "emailAddress" = $1
            ;
        `, [emailAddress])
        return user;
    }catch(error){
        throw new Error('Error getting use by Email')
    }
}
const verifyUser = async ({emailAddress, password}) => {
    try{
        // if no user is returned the try should fail and the error should be handled
        const {rows: [userPassword]} = await client.query(`
            SELECT password
            FROM users
            WHERE "emailAddress" = $1
            ;
        `, [emailAddress])
        return await bcrypt.compare(password, userPassword.password)
    }catch(error){
        throw new Error('Login was not successful, please check your username or password')
    }
}
module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    verifyUser
}