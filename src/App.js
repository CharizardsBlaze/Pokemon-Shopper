import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./api";
import "./App.css";
import {
  // AccountDetails,
  // AccountForm,
  CardDetail,
  Cards,
  Cart,
  Home,
  NavBar,
  Register,
  Login,
  SearchBar,
  Footer,
  About,
  Stripe,
  Admin,
} from "./components";

// TODO - Refactor into needed components, props to pass to them, and routes.

const App = () => {
  //------------------- State --------------------

  // const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('pokemon-shopper-token') || '')
  const [user, setUser] = useState({});
  //----------------- useEffects -----------------

  const useEffectGetUser = async (token) => {
    const currentUser = await getUser(token)
    setUser(currentUser)
  }
  useEffect(() => {
    if(token){
    useEffectGetUser(token)
  }
  }, [token])
  return (
    //TODO - Temporary NavBar for testing. Will be changed later.

    <div className='container'>
      <NavBar token={token} setToken={setToken} user={user} setUser={setUser}/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          className='item'
          path='/cards'
          element={<Cards />}
        />
        <Route
          className='item'
          path='/cards/:cardId'
          element={<CardDetail token={token} user={user}/>}
        />
        {/* <Route
          className='item'
          path='/account'
          element={<AccountDetails />}
        />
        <Route
          className='item'
          path='/account/:action'
          element={<AccountForm />}
        /> */}
        <Route path="/register" element={<Register setToken={setToken} />}/>
        <Route path="/login" element={<Login setToken={setToken} />}/>
        <Route className='item' path='/cart' element={<Cart user={user} token={token}/>} />
        <Route path="/about" element={<About /> } />
        <Route className='checkout' path="/checkout" element={<Stripe />} />
        {user.isAdmin ? (<Route path="/admin" element={<Admin user={user} token={token} />} />) : null }
      </Routes>
      <Footer />
    </div>
  );
};

//----------------- Export -----------------
export default App;
