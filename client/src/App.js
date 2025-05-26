import './App.css';
import React, { useEffect, useState } from 'react';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import CartIcon from './components/icons/cartIcon';
import XIcon from './components/icons/xIcon';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart")  || "[]").length);
  console.log("Cartcount: " + cartCount);

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
        <img src="../public/tastes-from-srilanka-logo.jpg" alt="tastes-from-srilanka-logo" width={200} height={200}/>
        {/* <div id='heading-text'>
          <h1>Tastes from Sri Lanka</h1>
          <p id='undertext'>Order delicious food and bites from Sri Lanka online - in Sweden</p>
        </div> */}
        <div id='cart-btn-holder'>
          <button id='cart-btn' onClick={() => setCartOpen(!cartOpen)}>{cartOpen ? <XIcon /> : <CartIcon />} ({cartCount})</button>
        </div>
      </div>
      <div id='banner'>
 <h1>Tastes from Sri Lanka</h1>
          <p id='undertext'>Order delicious food and bites from Sri Lanka online - in Sweden</p>
      </div>
      {cartOpen ? <Cart setCartCount={setCartCount}/> : <MenuList /> }
      <address id='address-field'>
        <p>Visiting Address:</p>
        <p>Tastes from Sri Lanka</p>
        <p>Orientalvägen 23</p>
        <p>112 24 Stockholm</p>
        <p>Telephone Number: +46 73 123 45 67</p>
      </address>
    </div>
  );
}

export default App;
