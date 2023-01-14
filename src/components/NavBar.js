import React from "react";
import { Link, NavLink } from "react-router-dom";
import cart from './images/cart.png'
// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = () => {
  return (
    <nav>
      <div className='ui secondary pointing menu'>
        <NavLink to='/' className='item'>
          Home
        </NavLink>
        <NavLink to='/cards' className='item'>
          Cards
        </NavLink>
        <NavLink to='/cart' className='item float right'>
        <img src={cart} className="ui large shopping cart icon"/>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
