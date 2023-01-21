import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from './images/cart.png'

// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = ({token, setToken, user}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('pokemon-shopper-token');
    navigate('/');
    setUser(null);
  }
  return (
    <nav className="nav">
      <div className='ui secondary pointing menu'>
        <NavLink to='/' className='item linkNav'>
          Home
        </NavLink>
        <NavLink to='/cards' className='item linkNav'>
          Cards
        </NavLink>
        {user.isAdmin ? (<NavLink className="item linkNav" to="/admin"> Admin </NavLink>) : null }
        {token ? <Link className='item linkNav' onClick={handleLogout}>Logout</Link> :
        <>
        <NavLink to='/register' className="item linkNav">
        Register
        </NavLink>
        <NavLink to='/login' className="item linkNav">
        Login
        </NavLink>
        </>}
         <NavLink to='/cart' className='item linkNav float right'>
        <img src={cart} className="ui large shopping cart icon"/>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
