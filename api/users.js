const express = require('express')
const usersRouter = express.Router();
const {createUser, getUserByEmail, getUserById, getUser} = require('../db/users')
var jwt = require('jsonwebtoken');

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, emailAddress} = req.body
    if(!username || !password || !emailAddress){
        next({
            error: "MissingFields",
            message: "Please enter all required fields to register"
        }).status(401)
        return
    }else{
        const userCheck = await getUserByEmail(req.body);
        if(userCheck){
            res.status(401).send({
                error: "EmailTaken",
                message: "Email is already in use, please choose another"
            })
            return
        }
    }
    try{
            const newUser = await createUser(req.body)
            res.send({
                newUser,
                message: `Account has been created`
            })
    }catch(error){
        throw error
        }
})
usersRouter.post('/login', async (req, res, next) => {
    const {emailAddress, password} = req.body
    if(!emailAddress || !password){
        res.status(401).send({
            error: "MissingFields",
            message: "Please enter all required fields to register"
        })
        return
    }
    try{
        const user = await getUserByEmail(req.body)
        if(user){
            const loggedInUser = await getUser(req.body)
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: '1w'
            })
            delete loggedInUser.password
            loggedInUser.token = token
            res.send({
                loggedInUser,
                message: "Thank you for logging in!"
            })
        }
    }catch(error){
        throw error
    }
})

module.exports = usersRouter;


