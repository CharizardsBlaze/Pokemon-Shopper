const bcrypt = require('bcrypt')
const client = require('.')

const createUser = async ({username, firstName, lastName, password, email, address, sessionId}) => {
    const cryptedPassword = await bcrypt.hash(password, 10)
    try{
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, "firstName", "lastName", password, "emailAddress", address, "sessonId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (email) DO NOTHING
        RETURNING *
        ;
        `, [username, firstName, lastName, password, email, address, sessionId])
        return user;
    }catch(error){
        throw new Error({
            error: 'UserNotCreated',
            message: 'User was not created, please try again' 
        })
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
        throw new Error({
            error: "NoUserWithId",
            message: `No user found with Id#${id}`
        })
    }
}
const getUserByEmail = async ({email}) => {
    try{
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE email = $1
            ;
        `, [email])
    }catch(error){
        throw new Error({
            error: 'NoUserWithEmail',
            message: `No user found with an email of ${email}`
        })
    }
}
const getUser = async ({email, password}) => {
    try{
        // if no user is returned the try should fail and the error should be handled
        const user = await getUserByEmail(email)
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: '1w'
            })
            delete user.password
            user.token = token
            return user
        }else{
            throw new Error({
                error: 'UnauthorizedAccess',
                message: `Login was not successful, please check your usernme or password`
            })
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
