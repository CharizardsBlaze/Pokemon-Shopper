import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAllProducts, getUser } from "./api";
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
  Stripe
} from "./components";

// TODO - Refactor into needed components, props to pass to them, and routes.

const App = () => {
  //------------------- State --------------------

  // const [cards, setCards] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  //----------------- useEffects -----------------

  const gettingAllProducts = async() => {
    const allProducts = await getAllProducts();
    setAllProducts(allProducts);
  };
  const useEffectGetUser = async () => {
    if(token){
    const currentUser = await getUser(token)
    if(currentUser.id){
    setUser(currentUser)
    }
    }
  }
  // get all products on load
  useEffect(() => {
    gettingAllProducts();
  }, [])
  useEffect(() => {
    const localToken = localStorage.getItem('pokemon-shopper-token')
    if(localToken){
      setToken(localToken)
    }
  }, [])
  useEffect(() => {
    useEffectGetUser()
  }, [token])
  return (
    //TODO - Temporary NavBar for testing. Will be changed later.

    <div className='container'>
      <NavBar token={token} setToken={setToken} allProducts={allProducts}/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          className='item'
          path='/cards'
          element={<Cards allProducts={allProducts}/>}
        />
        <Route
          className='item'
          path='/cards/:cardId'
          element={<CardDetail token={token}/>}
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
        <Route className='item' path='/cart' element={<Cart />} />
      </Routes>
      <Stripe />
    </div>
  );
};

//----------------- Export -----------------
export default App;
