import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchCards, fetchUser } from "./api/api";
import "./App.css";
import {
  AccountDetails,
  AccountForm,
  CardDetail,
  Cards,
  Cart,
  Home,
  // NavBar,
} from "./components";

// TODO - Refactor into needed components and routes.
// TODO - Implement Router changes if needed.

//----------------- App -----------------
const App = () => {
  const [card, setCard] = useState([]);

  //TODO - We could also have a wishlist or favorites feature.
  //TODO - Temporary token for testing and can be changed freely.

  const [pokeToken, setPokeToken] = useState(
    window.localStorage.getItem("pokeToken") || null
  );

  const [user, setUser] = useState(null);

  //TODO - MOVE TO NAVBAR
  const navigate = useNavigate();

  const getCards = async () => {
    try {
      console.log("Requested pokeToken for getCards in app.js", pokeToken);
      const result = await fetchCards(pokeToken);

      setCard(result);
    } catch (error) {
      console.error("!Error in getCards!", error);
    }
  };

  //----------------- useEffects -----------------
  // REVIEW - For use as template.
  useEffect(() => {
    getCards();
  }, [pokeToken]);

  useEffect(() => {
    if (pokeToken) {
      const getUser = async () => {
        const data = await fetchUser(pokeToken);
        console.log("fetch user", data);
        setUser(data);
      };
      getUser();
    }
  }, [pokeToken]);

  useEffect(() => {
    if (pokeToken) {
      window.localStorage.setItem("pokeToken", pokeToken);
    } else {
      window.localStorage.removeItem("pokeToken");
    }
  }, [pokeToken]);

  //TODO - MOVE TO NAVBAR
  const logOut = () => {
    setUser(null);
    setPokeToken(null);
    navigate("/");
  };

  //----------------- return -----------------
  return (
    //TODO - Temporary NavBar for testing. Will be changed later.

    <div className='container'>
      {location.pathname === "/cards" ? (
        <div className='headerMast'></div>
      ) : null}
      <nav
        className='fluid inverted ui borderless fixed secondary menu'
        id='nav-bar'>
        <div className='left menu'>
          <Link className='blue ui button' to='/'>
            Home
          </Link>
          <Link className='blue ui button' to='/cards'>
            Cards
          </Link>
        </div>
        <h2 className='ui right header item' id='navBarTitle'>
          Pokemon Shopper
        </h2>
        <div className='right menu' id='navRightButtons'>
          {pokeToken ? (
            <>
              <Link
                className='blue ui right floated button'
                to='/account'
                style={{ fontFamily: "Righteous", fontWeight: "400" }}>
                Account
              </Link>
              <button
                onClick={logOut}
                className='red inverted ui right floated button'>
                Log Out
              </button>
            </>
          ) : (
            <div className='ui buttons'>
              <Link className='green ui button' to='/account/login'>
                Log In
              </Link>
              <div
                className='or'
                // TODO - Put this in a css file.
                style={{
                  fontFamily: "Kalam",
                  fontWeight: "400",
                }}></div>
              <Link className='green ui button' to='/account/register'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* //REVIEW - If we move to NavBar component, we need to pass in props. */}
      {/* <NavBar loggedIn={loggedIn} logOut={logOut} /> */}

      <Routes>
        <Route path='/' element={<Home pokeToken={pokeToken} user={user} />} />
        <Route
          className='item'
          path='/cards'
          element={
            <Cards card={card} pokeToken={pokeToken} setCard={setCard} />
          }
        />
        <Route
          className='item'
          path='/cards/:cardId'
          element={<CardDetail card={card} getCards={getCards} />}
        />
        <Route
          className='item'
          path='/account'
          element={<AccountDetails user={user} />}
        />
        <Route
          className='item'
          path='/account/:action'
          element={<AccountForm setPokeToken={setPokeToken} />}
        />
        <Route className='item' path='/cart' element={<Cart user={user} />} />
      </Routes>
    </div>
  );
};

//----------------- Export -----------------
export default App;
