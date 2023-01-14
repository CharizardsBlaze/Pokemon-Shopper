import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../api';

const CardDetail = () => {

    const [oneItem, setOneItem] = useState({})

    // /cards/:cardId is our params
    const {cardId} = useParams();

    const getOneItem = async() => {
        const oneItem = await getOneProduct(cardId);
        setOneItem(oneItem);
    };

    useEffect(() => {
        // get one product from params and load it into use state
        getOneItem();
    }, [cardId]);

    const handleAddToCart = (productId) => {
        console.log(`You have added ${productId} to your cart.`)
    }

    // product: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url
    return (
        <>
        {!oneItem 
            ? (<p>Loading ...</p>) 
            : (
                <div key={oneItem.id}>
                    <h3>{oneItem.name}</h3>
                    <p>Price: {oneItem.price}</p>
                    <img src={oneItem.imageUrl} />
                    <div>
                        <p>Quality: {oneItem.condition}</p>
                        <p>Rarity: {oneItem.rarity}</p>
                        <p>{oneItem.name} first type: {oneItem.type1}</p>
                        {!oneItem.type2 ? null : (<p>{oneItem.name} second type: {oneItem.type2}</p>)}
                    </div>
            {/* do we want buttons for "Add to cart" under each card? */}
                    <div className="add-to-cart-form">
                        <button 
                            className="ui button"
                            onClick={() => {
                                handleAddToCart(oneItem.id)
                            }}>Add To Cart</button>
                    </div>
                </div>
            )
        }
        </>
    )
};

export default CardDetail;
