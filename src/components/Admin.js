import React from "react";
import { useState } from "react";

const Admin = ({admin}) => {

    // const [newProduct, setNewProduct] = useState({newName: "", pokedex: 0, firstType: "", secondType: "", cost: 0, condition: "", rarity: "", quantity: 0, imageUrl: ""})
    const [newName, setNewName] = useState("")
    const [pokedex, setPokedex] = useState(0)
    const [firstType, setFirstType] = useState("")
    const [secondType, setSecondType] = useState("")
    const [cost, setCost] = useState(0)
    const [condition, setCondition] = useState("")
    const [rarity, setRarity] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [imageUrl, setImageUrl] = useState("")

    const handleAddProduct = () => {
        console.log('you have added a prodcut: ', {newName, pokedex, firstType, secondType, cost, condition, rarity, quantity, imageUrl});
    }
    // checks for admin status (set on login)
    // in case someone just tries to go to /admin in the browser
    if (!admin) {
        return (
            <div>
                <p>You aren't an admin.</p>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h3>Admin:</h3>
                <h4>Add a product:</h4>
                    <form onSubmit={(event) => {event.preventDefault(); handleAddProduct()}}>
                        <label>Name:</label>
                            <input required type="text" placeholder="Pokemon name" value={newName} onChange={(event) => setNewName(event.target.value)}/>
                        <label>Pokedex:</label>
                            <input required type="text" placeholder="Pokemon Pokedex" value={pokedex} onChange={(event) => setPokedex(event.target.value)}/>
                        <label>Primary type:</label>
                            <input required type="text" placeholder="Pokemon first type" value={firstType} onChange={(event) => setNewProduct(event.target.value)} />
                        <label>Secondary type:</label>
                            <input type="text" placeholder="Pokemon second type" value={secondType} onChange={(event) => setFirstType(event.target.value)}/>
                        <label>Cost:</label>
                            <input required type="text" placeholder="Card cost" value={cost} onChange={(event) => setCost(event.target.value)}/>
                        <label>Condition:</label>
                            <select onChange={(event) => setCondition(event.target.value)}>
                                <option value="1" default>Fair</option>
                                <option value="2">Good</option>
                                <option value="3">Very Good</option>
                                <option value="4">Near Mint</option>
                                <option value="5">Mint</option>
                            </select>
                        <label>Rarity:</label>
                            <input required type="text" placeholder="Card rarity" value={rarity} onChange={(event) => setRarity(event.target.value)}/>
                        <label>Quantity:</label>
                            <input required type="text" placeholder="Card quanitity to sell" value={quanitity} onChange={(event) => setQuantity(event.target.value)}/>
                        <label>Image url:</label>
                            <input required type="text" placeholder="image url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                        <label>Submit</label>
                        <button type="submit">Submit new Product</button>
                    </form>
                <h4>Edit a product.</h4>
                <h4>View / edit users.</h4>

            </div>
            
        )
    }
}

export default Admin;