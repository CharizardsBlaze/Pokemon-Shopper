import React, {ReactDOM}  from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({allProducts}) => {

    const [search, setSearch] = useState("");

    return (
        <div>
            <input 
            className="filter-search"
            onChange={(event) => {
                setSearch(event.target.value);
            }}
            value={search}
            placeholder="Search"
            type="text" />
            <div className="search-results">
            {search
            ?   <div>
                    {allProducts.map((eachProduct) => {
                        if (eachProduct.name.toLowerCase().includes(search)) {
                            return (
                                <p><Link to={`/cards/${eachProduct.id}`}>{eachProduct.name}</Link></p>
                            )
                        }
                    })}
                </div>
            : null}
            </div>
        </div>
    )
}

export default SearchBar;