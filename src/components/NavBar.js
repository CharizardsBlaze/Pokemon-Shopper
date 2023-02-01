import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from "./images/cart.png";

// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = ({ token, setToken, user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('pokemon-shopper-token');
    setToken("");
    setUser(null);
  };
  return (
    <nav className='nav'>
      <div className='ui blue inverted menu'>
        <NavLink to='/' className=' item'>
          Home
        </NavLink>
        <NavLink to='/cards' className='item'>
          Cards
        </NavLink>
        {user.isAdmin ? (
          <NavLink className='item' to='/admin'>
            Admin
          </NavLink>
        ) : null}
        {token ? (
          <>
            <Link className='item' onClick={handleLogout}>
              Logout
            </Link>
            <NavLink to='/account' className='item'>
              Account
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to='/register' className='item'>
              Register
            </NavLink>
            <NavLink to='/login' className='item'>
              Login
            </NavLink>
          </>
        )}
        <NavLink to='/cart' className='item float right'>
          <img src={cart} className='ui large shopping cart icon' />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
