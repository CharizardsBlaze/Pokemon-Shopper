import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Will likely want useNavigate for logout.

// TODO - This component is not needed if we put a condensed NavBar inside App.js instead.

const NavBar = ({token, setToken}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('pokemon-shopper-token')
    navigate('/')
  }
  return (
    <nav>
      <div className='ui secondary pointing menu'>
        <Link to='/' className='item'>
          Home
        </Link>
        <Link to='/cards' className='item'>
          Cards
        </Link>
        {token ? <button onClick={handleLogout}>Logout</button> :
        <>
        <Link to='/register' className="item">
        Register
        </Link>
        <Link to='/login' className="item">
        Login
        </Link>
        </>}
      </div>
    </nav>
  );
};

export default NavBar;
