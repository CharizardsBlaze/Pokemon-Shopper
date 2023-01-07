import React, {useEffect, useState} from 'react';

const CardDetail = ({product}) => {

    const handleAddToCart = (productId) => {
        console.log(`You have added ${productId} to your cart.`)
    }

    // product: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url
    return (
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: {product.cost}</p>
            <img href={product.img_url} />
                <div>
                    <p>Quality: {product.quality}</p>
                    <p>Rarity: {product.rarity}</p>
                    <p>{product.name} first type: {product.type1}</p>
                    {!product.type2 ? null : (<p>{product.name} second type: {product.type2}</p>)}
                </div>
            {/* do we want buttons for "Add to cart" under each card? */}
            <div className="add-to-cart-form">
                <button 
                    className="ui button"
                    onClick={() => {
                        handleAddToCart(product.id)
                    }}>Add To Cart</button>
            </div>
        </div>
    )
};

export default CardDetail;