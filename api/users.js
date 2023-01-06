const express = require('express')
const usersRouter = express.Router();
const {createUser, getUserByEmail, getUserById, getUser} = require('../db/users')

usersRouter.post('/register', async (req, res, next) => {
    if(!username, !password, !email, !sessionId){
        res.status(401).send({
            error: "MissingFields",
            message: "Please enter all required fields to register"
        })
    try{
        const userCheck = await getUserByEmail(email);
        if(userCheck){
            res.status(401).send({
                error: "EmailTaken",
                message: "Email is already in use, please choose another"
            })
            return
        }else{
            const newUser = await createUser(req.body)
            const user = getUser(newUser);
            res.send({
                user,
                message: `Account for ${user.username} has been created`
            })
        }
    }catch({name, message}){
        throw {name, error}
        }
}})