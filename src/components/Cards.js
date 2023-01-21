import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import {getAllProducts, getProductsByCondition, getAllConditions, getAllRarities} from '../api'

const Cards = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [conditions, setAllConditions] = useState([])
    const [rarities, setAllRarities] = useState([])
    const [conditionOption, setConditionOption] = useState('')
    const [rarityOption, setRarityOption] = useState('')
    // eachProduct: id, pokedexId:, name, cost, type1, type2, quality, rarity, img_url

    const gettingAllProducts = async() => {
        const allProducts = await getAllProducts();
        const allConditions = await getAllConditions()
        const allRarities = await getAllRarities()
        setAllRarities(allRarities)
        setAllConditions(allConditions)
        setAllProducts(allProducts);
       
      };
    useEffect(() => {
        gettingAllProducts();
      }, [])
      const handleFilter = async() => {
        if (!conditionOption) {
            gettingAllProducts()
        }else {
        const filteredProducts = await getProductsByCondition({conditionId: conditionOption, rarityId: rarityOption})
        setAllProducts(filteredProducts)
        }
      }
    return (
        <div className='cards-page'>
                <div className='filter-container'>
                    <SearchBar allProducts={allProducts}/>
                        <div className='filter-bar'>
                                <select className='select-quality'onChange={(event) => setConditionOption(event.target.value)}>
                                <option value=''>All</option>
                                {conditions.map(con => 
                                <option value={con.id}>{con.name}</option>
                                )}
                                </select>
                                <select className='select-quality'onChange={(event) => setRarityOption(event.target.value)}>
                                <option value='all'>All</option>
                                {rarities.map(rare => 
                                <option value={rare.id}>{rare.name}</option>
                                )}
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
                       
                            <Link className='viewLink' to={`/cards/${eachProduct.id}`}>
                            <button 
                            className="ui button"
                            // onClick={(event) => {
                            //     event.preventDefault();
                            //     handleSeeDetails(eachProduct.id)
                            >
                            See more </button></Link>
                        {/* <CardDetail product={eachProduct}/>  */}
                    </div>
                )}
            </div>
            }
        </div>
    )
}

export default Cards;
