import React, {useEffect, useState, useParams} from 'react';

const CardDetail = () => {

    const [oneItem, setOneItem] = useState({})

    const getOneItem = async(productId) => {
        const oneItem = await getOneItem(productId);
        setOneItem(oneItem);
    };

    useEffect(() => {
        // /products/:productId is our params
        const {productId} = useParams();
        // get one product from params and load it into use state
        getOneItem(productId);
    }, []);

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
                    <p>Price: {oneItem.cost}</p>
                    <img href={oneItem.img_url} />
                    <div>
                        <p>Quality: {oneItem.quality}</p>
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
