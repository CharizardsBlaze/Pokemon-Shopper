
import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProduct, addToCart, deleteProduct} from '../api';
// import fetchUser from '../App'

const CardDetail = ({token, user}) => {
    const navigate = useNavigate()
    const [oneItem, setOneItem] = useState({})
    const [quantity, setQuantity] = useState (1)
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
    const handleDelete = async () => {
        if(confirm('Are you sure you want to delete this product?')){
        await deleteProduct(user, cardId, token)
        navigate('/cards')
        }
    }
    // product: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url
    return (
        <>
        {!oneItem 
            ? (<p>Loading ...</p>) 
            : (
            <div className='viewCardContainer'>
                <div className='cardContainer'key={oneItem.id}>
                    <img src={oneItem.imageUrl} />
                    <div className='left-view-card'>
                        <h1>{oneItem.name}</h1>
                        <h2>Price: <span className='itemPrice'>${oneItem.price}</span></h2>
                        <div className='viewAboutCart'>
                            <div>
                                <h3>About this card</h3>
                                <p>Quality: {oneItem.condition}</p>
                                <p>Rarity: {oneItem.rarity}</p>
                                <p>{oneItem.name} first type: {oneItem.type1}</p>
                                {!oneItem.type2 ? null : (<p>{oneItem.name} second type: {oneItem.type2}</p>)}
                                <p>Quantity available: {oneItem.quantity}</p>
                            </div> 
                            {!token
                            ? (<p>You must be logged in to add this to your cart</p>)
                            :
                                (
                                <div className='addToCartForm'>
                                    <input min="1" required className="quantity-input" value={quantity} onChange={(event) => setQuantity(event.target.value)} type='number'></input>
                                <button 
                                    className="ui button"
                                    onClick={() => {
                                    handleAddToCart(cardId, token)
                                }}>Add To Cart</button>
                                    {user.isAdmin ? <button className="ui button" onClick={handleDelete}>Delete</button> : null}
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
};

export default CardDetail;
