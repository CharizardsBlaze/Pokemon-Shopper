import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Cards = ({allProducts}) => {

    console.log('allproducts: ', allProducts)

    const handleSeeDetails = (productId) => {
        console.log(`you are going to see details for ${productId}`)
    }

    // eachProduct: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url
    return (
        <div className="all-cards-container">
            {!allProducts 
            ? (<h4>Loading...</h4>) 
            : (allProducts.map((eachProduct) => {
                return (
                    <div key={eachProduct.id} className="card-container">
                        <img href={eachProduct.iamgeUrl} />
                        <h5>Card name: {eachProduct.name}</h5>
                        <p>Price: {eachProduct.cost}</p>
                        <button 
                            className="ui button"
                            onClick={(event) => {
                                event.preventDefault();
                                handleSeeDetails(eachProduct.id)
                            }}><Link to={`/cards/${eachProduct.id}`}>See more</Link></button>

                        {/* <CardDetail product={eachProduct}/>  */}
                    </div>
                )
            }))}
        </div>
    )
}

export default Cards;