import { useState } from 'react'
import { NavLink } from 'react-router-dom'
const AdminDropdown = () => {
    const [dropDown, setDropDown] = useState(false)
    return (
        <div>
            <p className='item' onClick={() => setDropDown(!dropDown)}>
                Admin
            </p>
            {
                dropDown ? <>
                    <NavLink to='/addProduct'>
                        Add Product
                    </NavLink><br></br>
                    <NavLink to='/editProduct'>
                        Edit Product
                    </NavLink>
                </>: null
            }
        </div>
    )
}
export default AdminDropdown