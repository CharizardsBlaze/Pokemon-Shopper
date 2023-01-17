
import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct, addToCart} from '../api';
// import fetchUser from '../App'

const CardDetail = ({token}) => {

    const [oneItem, setOneItem] = useState({})
    const [quantity, setQuantity] = useState (0)
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
    }, [cardId]);

    const handleAddToCart = async (productId, token) => {
        const response = await addToCart({
            product_id: productId,
            quantity: quantity,
            token: token
        })
        if(response.error) {
            alert(response.message);
            setQuantity(0)
            setErrorMessage(response.message)
        }else {
        setErrorMessage('')
        //Update the quantity on the product inventory
        //Re-fetch ther user data
        //Re-fetch the item
        alert('Item added to cart!')
        getOneItem();
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
                        <p>Quantity available: {oneItem.quantity}</p>
                    </div>
            {/* do we want buttons for "Add to cart" under each card? */}
                    <div className="add-to-cart-form">
                        <button 
                            className="ui button"
                            onClick={() => {
                                handleAddToCart(oneItem.id, token)
                            }}>Add To Cart</button>
                            <label htmlFor='quantity-input'>Amount to purchase: </label>
                            <input className="quantity-input" required value={quantity} onChange={(event) => setQuantity(event.target.value)}type='number'></input>
                            <h2>{errorMessaage} </h2>
                    </div>
                </div>
            )
        }
        </>
    )
};

export default CardDetail;
