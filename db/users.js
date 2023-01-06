const bcrypt = require('bcrypt')
const client = require('.')

const createUser = async ({username, firstName, lastName, password, emailAddress, phoneNumber}) => {
    const cryptedPassword = await bcrypt.hash(password, 10)
    try{
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, "firstName", "lastName", password, "emailAddress", "phoneNumber")
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT ("emailAddress") DO NOTHING
        RETURNING *
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
    }catch(error){
        throw new Error('Error getting use by Email')
    }
}
const getUser = async ({emailAddress, password}) => {
    try{
        // if no user is returned the try should fail and the error should be handled
        const user = await getUserByEmail({emailAddress})
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: '1w'
            })
            delete user.password
            user.token = token
            return user
        }else{
            throw new Error('Could not Login in User')
        }
    }catch(error){
        throw new Error({
            error: "UnauthorizedAccess",
            message: 'Login was not successful, please check your usernme or password'
        })
    }
}
module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUser
}
