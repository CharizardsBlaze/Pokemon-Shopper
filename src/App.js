import React from "react";
import { Route, Routes } from "react-router-dom";
// import { fetchCards, fetchUser } from "./api";
import "./App.css";
import {
  // AccountDetails,
  // AccountForm,
  // CardDetail,
  // Cards,
  Cart,
  Home,
  NavBar,
} from "./components";

// TODO - Refactor into needed components, props to pass to them, and routes.

const App = () => {
  //------------------- State --------------------

  // const [cards, setCards] = useState([]);

  //----------------- useEffects -----------------

  const gettingAllProducts = async() => {
    const allProducts = await getAllProducts();
    setAllProducts(allProducts);
  };

  // get all products on load
  useEffect(() => {
    gettingAllProducts();
  })

  return (
    //TODO - Temporary NavBar for testing. Will be changed later.

    <div className='container'>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route
          className='item'
          path='/cards'
          element={<Cards />}
        />
        <Route
          className='item'
          path='/cards/:cardId'
          element={<CardDetail />}
        />
        <Route
          className='item'
          path='/account'
          element={<AccountDetails />}
        />
        <Route
          className='item'
          path='/account/:action'
          element={<AccountForm />}
        /> */}
        <Route className='item' path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
};

//----------------- Export -----------------
export default App;
