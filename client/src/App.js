import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import CartIcon from './components/icons/cartIcon';
import XIcon from './components/icons/xIcon';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")  || "[]"));
  const [cartCount, setCartCount] = cartItems.length;

  useEffect(() => {
    setCartCount(cartCount);
  })
  //To count the amount of items in Cart and display on cart button
  //Add new URL
    // useEffect(() => {
    //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCart`)
    //   .then(result => {
    //     setCartCount(result.data.length)
    //   })
    // }, [])

  return (
    <div className="App">
      <div id='heading-section'>
        <div id='heading-text'>
          <h1>Tastes from Sri Lanka</h1>
          <p id='undertext'>Order delicious food and bites from Sri Lanka online - in Sweden</p>
        </div>
        <div id='cart-btn-holder'>
          <button id='cart-btn' onClick={() => setCartOpen(!cartOpen)}>{cartOpen ? <XIcon /> : <CartIcon />} ({cartCount})</button>
        </div>
      </div>
      {cartOpen ? <Cart /> : <MenuList /> }
      <address id='address-field'>
        <p>Visiting Address:</p>
        <p>Tastes from Sri Lanka</p>
        <p>Orientvägen 23</p>
        <p>112 24 Stockholm</p>
        <p>Telephone Number: +46 73 123 45 67</p>
      </address>
    </div>
  );
}

export default App;
