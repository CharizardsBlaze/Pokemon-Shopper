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

router.get('/products', async (request, response, next) => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const allProducts = await response.json();
        console.log('this is all products: ', allProducts);
        response.send(allProducts);
    } catch (error) {
        console.log('there was an error getting all productS: ', error);
        throw error;
    }
})

module.exports = router;
