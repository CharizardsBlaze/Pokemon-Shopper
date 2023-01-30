import { useState } from 'react'
import { createNewProduct } from '../api'
const ProductForm = ({editProduct}) => {
    const [newName, setNewName] = useState(editProduct ? editProduct.name : "")
    const [pokedex, setPokedex] = useState(editProduct ? editProduct.pokedexId : 0)
    const [firstType, setFirstType] = useState(editProduct ? editProduct.type1: "")
    console.log(editProduct)
    const [secondType, setSecondType] = useState("")
    const [cost, setCost] = useState(editProduct ? editProduct.price : 0)
    const [condition, setCondition] = useState(editProduct ? editProduct.condition : 1)
    const [rarity, setRarity] = useState("")
    const [quantity, setQuantity] = useState(editProduct ? editProduct.quantity : 0)
    const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imageUrl : "")

    const handleAddProduct = async (event) => {
        event.preventDefault()
        const newstuff = await createNewProduct(pokedex, newName, cost, firstType, secondType, condition, rarity, quantity, imageUrl, token, user)
        setNewName("")
        setPokedex(0);
        setFirstType("")
        setSecondType("")
        setCost(0)
        setCondition(1)
        setRarity("")
        setQuantity(0)
        setImageUrl("")
    }
    return (
        <div className="container">
            <form className="user-forms" onSubmit={handleAddProduct}>
                <label>Name:</label>
                    <input className='text-input' required type="text" placeholder="Pokemon name" value={newName} onChange={(event) => setNewName(event.target.value)}/>
                <label>Pokedex:</label>
                    <input className='text-input' required type="text" placeholder="Pokemon Pokedex" value={pokedex} onChange={(event) => setPokedex(event.target.value)}/>
                <label>Primary type:</label>
                    <input className='text-input' required type="text" placeholder="Pokemon first type" value={firstType} onChange={(event) => setFirstType(event.target.value)} />
                <label>Secondary type:</label>
                    <input className='text-input' type="text" placeholder="Pokemon second type" value={secondType} onChange={(event) => setSecondType(event.target.value)}/>
                <label>Cost:</label>
                    <input className='text-input' required type="text" placeholder="Card cost" value={cost} onChange={(event) => setCost(event.target.value)}/>
                <label>Condition:</label>
                    <select onChange={(event) => setCondition(event.target.value)}>
                        <option value={1}>Fair</option>
                        <option value={2}>Good</option>
                        <option value={3}>Very Good</option>
                        <option value={4}>Near Mint</option>
                        <option value={5}>Mint</option>
                    </select>
                <label>Rarity:</label>
                    <input required type="text" placeholder="Card rarity" value={rarity} onChange={(event) => setRarity(event.target.value)}/>
                <label>Quantity:</label>
                    <input required type="text" placeholder="Card quanitity to sell" value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
                <label>Image url:</label>
                    <input required type="text" placeholder="image url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                <label>Submit</label>
                <button type="submit">Submit new Product</button>
            </form>
    </div>
    )
}
export default ProductForm