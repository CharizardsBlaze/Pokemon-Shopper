const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { fetchAllProducts, fetchOneProduct} = require('../db/products')


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
        const allProducts = await fetchAllProducts().then(results => results.json());
        console.log('this is all products: ', allProducts);
        response.send(allProducts);
    } catch (error) {
        console.log('there was an error getting all productS: ', error);
        throw error;
    }
});

router.get('/products/:productId', async (request, response, next) => {
    try {
        const productId = request.params;
        const oneProduct = await fetchOneProduct(productId).then(results => results.json());
        response.send(oneProduct);
    } catch (error) {
        console.log('there was an error fetching products by productId: ', error);
        throw error;
    }
})

module.exports = router;
