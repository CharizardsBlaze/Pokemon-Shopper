import React from "react";
import { Link } from "react-router-dom";
// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = () => {
  return (
    <nav>
      <div className='ui secondary pointing menu'>
        <Link to='/' className='item'>
          Home
        </Link>
        <Link to='/cards' className='item'>
          Cards
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
