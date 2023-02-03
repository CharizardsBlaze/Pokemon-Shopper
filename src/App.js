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
  // SearchBar,
  Footer,
  About,
  Stripe,
  Admin,
  AddProduct,
  Account,
  OrderHistory,
} from "./components";

// TODO - Refactor into needed components, props to pass to them, and routes.

const App = () => {
  //------------------- State --------------------
  const [token, setToken] = useState(
    localStorage.getItem("pokemon-shopper-token") || ""
  );
  const [user, setUser] = useState({});
  //----------------- useEffects -----------------
  useEffect(() => {
    if (token) {
      async function GetUserInfo(token) {
        const currentUser = await getUser(token);
        setUser(currentUser);
      }
      GetUserInfo(token);
    }
  }, [token]);

  // REVIEW - Look at the OrderHistory component to see what props are needed to pass to it.
  return (
    <div>
      <NavBar token={token} setToken={setToken} user={user} setUser={setUser} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route className='item' path='/cards' element={<Cards />} />
        <Route
          className='item'
          path='/cards/:cardId'
          element={<CardDetail token={token} user={user} />}
        />
        <Route
          className='item'
          path='/account'
          element={<Account token={token} user={user} setUser={setUser} />}
        />
        <Route path='/register' element={<Register setToken={setToken} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route
          className='item'
          path='/cart'
          element={<Cart user={user} token={token} />}
        />
        <Route path='/:addProduct' element={<AddProduct token={token}/>} />
        <Route path='/:editProduct' element={<AddProduct token={token}/>} />
        <Route path='/about' element={<About />} />
        <Route
          className='checkout'
          path='/checkout'
          element={<Stripe token={token} />}
        />
        <Route path='/orders' element={<OrderHistory token={token} />} />
        {user.isAdmin ? (
          <Route path='/admin' element={<Admin user={user} token={token} />} />
        ) : null}
      </Routes>
      <Footer />
    </div>
  );
};

//----------------- Export -----------------
export default App;
