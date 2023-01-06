const e = require('express');
const express = require('express')
const usersRouter = express.Router();
const {createUser, getUserByEmail, getUserById, getUser} = require('../db/users')

usersRouter.post('/register', async (req, res, next) => {
    console.log(req.body)
    const {username, password, emailAddress} = req.body
    if(!username || !password || !emailAddress){
        res.status(401).send({
            error: "MissingFields",
            message: "Please enter all required fields to register"
        })
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
            // const user = await getUser(newUser);
            res.send({
                newUser,
                message: `Account has been created`
            })
    }catch(error){
        throw error
        }
})
module.exports = usersRouter;