
import { Link } from 'react-router-dom'
const AdminDropdown = () => {
    return (
        <div id='dropdown-a'>
            <Link id='dropdown-button' className='item'>
                Admin
            </Link>
                <div className='dropdown-nav'>
                    <Link className='dropdown-links' to='/addProduct'>
                        Add Product
                    </Link>
                    <Link className='dropdown-links' to='/editProduct'>
                        Edit Product
                    </Link>
                </div>
        </div>
    )
}
export default AdminDropdown

{/* <div>
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
</div> */}