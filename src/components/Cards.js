import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api'

const Cards = ({allProducts}) => {

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
                    <div className="card-container">
                        <img href={eachProduct.img_url} />
                        <h5>Card name: {eachProduct.name}</h5>
                        <p>Price: {eachProduct.cost}</p>
                        <button 
                            className="ui button"
                            onClick={(event) => {
                                event.preventDefault();
                                handleSeeDetails(eachProduct.id)
                            }}><Link to={`/products/${eachProduct.id}`}>See more</Link></button>

                        {/* <CardDetail product={eachProduct}/>  */}
                    </div>
                )
            }))}
        </div>
    )
}

export default Cards;