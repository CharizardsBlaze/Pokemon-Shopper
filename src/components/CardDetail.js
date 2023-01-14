
import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct, addToCart} from '../api';
// import fetchUser from '../App'

const CardDetail = ({user}) => {

    const [oneItem, setOneItem] = useState({})
    const [quantity, setQuantity] = useState ('')
    const [errorMessaage, setErrorMessage] = useState('')
    // /cards/:cardId is our params
    const {cardId} = useParams();

    const getOneItem = async() => {
        const oneItem = await getOneProduct(cardId);
        setOneItem(oneItem);
    };

    useEffect(() => {
        // get one product from params and load it into use state
        getOneItem();
    }, []);

    const handleAddToCart = async (productId) => {
        const response = await addToCart({
            token: user.token,
            product_id: productId,
            quantity: quantity
        })
        if(response.error) {
            setErrorMessage(response.message)
        }else {
        setErrorMessage('')
        //Update the quantity on the product inventory
        //Re-fetch ther user data
        //Re-fetch the item
        }
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
                            <input value={quantity} onChange={(event) => setQuantity(event.target.value)}type='number'></input>
                            <h2>{errorMessaage} </h2>
                    </div>
                </div>
            )
        }
        </>
    )
};

export default CardDetail;
