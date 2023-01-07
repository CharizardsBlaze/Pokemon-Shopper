import React, {useEffect, useState} from 'react';

const Cards = () => {

    // allproducts: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url
    const [allProducts, setAllProducts] = useState([]);

    // get all products on load
    useEffect(() => {
        const fetching = async() => {
            const allProducts = await fetchAllProducts();
            setAllProducts(allProducts);
        } 
    })


    return (
        <div>
            {!allProducts 
            ? (<h4>Loading...</h4>) 
            : (allProducts.map((eachProduct) => {
                return (
                    <CardDetail product={eachProduct}/> 
                )
            }))}
        </div>
    )
}

export default ViewAll;