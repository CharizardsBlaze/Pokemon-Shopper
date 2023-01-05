const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.use('/', async (req, res, next) => {
    const auth = req.header('Authorization')
    if(auth){
        const [_, token] = auth.split(' ');
        const data =jwt.verify(token, process.env.JWT_SECRET);
        if(!data) {
        next({
         error: "InvalidToken",
         name: "InvalidToken",
         message: "Token is invalid"
        })
        }
        const user = await getUserById(data.id)
        req.user = user
        next()
    }else {
        next()
    }
})

module.exports = router;
