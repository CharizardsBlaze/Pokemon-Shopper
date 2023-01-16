import React from "react";
import SearchBar from "./SearchBar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from './images/cart.png'

// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = ({token, setToken, allProducts}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('pokemon-shopper-token')
    navigate('/')
  }
  return (
    <nav>
      <div className='ui secondary pointing menu'>
        <NavLink to='/' className='item'>
          Home
        </NavLink>
        <NavLink to='/cards' className='item'>
          Cards
        </NavLink
        </NavLink>
        {token ? <button onClick={handleLogout}>Logout</button> :
        <>
        <NavLink to='/register' className="item">
        Register
        </NavLink>
        <NavLink to='/login' className="item">
        Login
        </NavLink>
        </>}
        <SearchBar allProducts={allProducts}/>
         <NavLink to='/cart' className='item float right'>
        <img src={cart} className="ui large shopping cart icon"/>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
