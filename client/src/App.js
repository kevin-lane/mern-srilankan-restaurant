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
        <img src="https://sdmntprukwest.oaiusercontent.com/files/00000000-6aec-6243-8863-9d6e596b2a50/raw?se=2025-05-25T18%3A22%3A02Z&sp=r&sv=2024-08-04&sr=b&scid=f37988b6-4fa4-557b-87d4-b67e8e9890b5&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T05%3A17%3A14Z&ske=2025-05-26T05%3A17%3A14Z&sks=b&skv=2024-08-04&sig=kK9%2BpNQFx%2BFU4jvhDhalcblz4ZVu%2BlXviGmoXANlN9M%3D" alt="tastes-from-srilanka-logo" width={200} height={200}/>
        {/* <div id='heading-text'>
          <h1>Tastes from Sri Lanka</h1>
          <p id='undertext'>Order delicious food and bites from Sri Lanka online - in Sweden</p>
        </div> */}
        <div id='cart-btn-holder'>
          <button id='cart-btn' onClick={() => setCartOpen(!cartOpen)}>{cartOpen ? <XIcon /> : <CartIcon />} ({cartCount})</button>
        </div>
      </div>
      <div id='banner'>

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
