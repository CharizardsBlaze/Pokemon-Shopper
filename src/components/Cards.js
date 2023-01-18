import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import {getAllProducts, getProductsByCondition} from '../api'

const Cards = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [conditionOption, setConditionOption] = useState('')
    // eachProduct: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url

    const gettingAllProducts = async() => {
        const allProducts = await getAllProducts();
        setAllProducts(allProducts);
      };
    useEffect(() => {
        gettingAllProducts();
      }, [])
      const handleFilter = async() => {
        if (conditionOption == 'All') {
            gettingAllProducts()
        }else {
        const filteredProducts = await getProductsByCondition(conditionOption)
        setAllProducts(filteredProducts)
        }
      }
    return (
        <div className='cards-page'>
                <div className='filter-container'>
                    <SearchBar allProducts={allProducts}/>
                        <div className='filter-bar'>
                                <select onChange={(event) => setConditionOption(event.target.value)}>
                                <option value='All'>All</option>
                                <option value='Fair'>Fair</option>
                                <option value='Good'>Good</option>
                                <option value='Very Good'>Very Good</option>
                                <option value='Near Mint'>Near Mint</option>
                                <option value='Mint'>Mint</option>
                                </select>
                                <button onClick={handleFilter}>Search</button>
                            </div>
                        </div>
            {!allProducts 
            ? (<h4>Loading...</h4>) 
            : 
            <div className="all-cards-container">
                {  allProducts.map(eachProduct => 
                    <div key={eachProduct.id} className="card-container">
                        <img src={eachProduct.imageUrl} />
                        <h5>Card name: {eachProduct.name}</h5>
                        <p>Price: {eachProduct.price}</p>
                        <button 
                            className="ui button"
                            // onClick={(event) => {
                            //     event.preventDefault();
                            //     handleSeeDetails(eachProduct.id)
                            >
                            <Link to={`/cards/${eachProduct.id}`}>See more</Link></button>
                        {/* <CardDetail product={eachProduct}/>  */}
                    </div>
                )}
            </div>
            }
        </div>
    )
}

export default Cards;
