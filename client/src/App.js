import './App.css';
import React, { useEffect, useState } from 'react';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import CartIcon from './components/icons/cartIcon';
import XIcon from './components/icons/xIcon';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart")  || "[]").length);

  return (
    <div className="App">
      <div id='heading-section'>
        <img src="/tastes-from-srilanka-logo.jpg" alt="tastes-from-srilanka-logo" width={200} height={200}/>
        <div id='cart-btn-holder'>
          <button id='cart-btn' onClick={() => setCartOpen(!cartOpen)}>{cartOpen ? <XIcon /> : <CartIcon />} <span>Cart</span><span id='cart-count'>{cartCount}</span></button>
        </div>
      </div>
      {cartOpen ? <></> :
        <div id='banners'>
          <div id='banner-left'>
            <div id='cta-container'>
              <a id='go-to-menu-btn' href='#menu-selection'>Order something delicious</a>
            </div>
          </div>
          <div id='banner-right'>
            <h1 id='header-text'>Tastes from Sri Lanka</h1>
            <p id='intro-text'>
            Ayobowan and vannakam! Tastes From Sri Lanka is a Sri Lankan Restaurant in Stockholm, Sweden. We offer delicious and authentic food from Sri Lanka, which is an island nation south of India.
            At our restaurant, you can order your food online and come to the restaurant!
            We look forward to welcome you!
            </p>
          </div>
        </div>
      }

      <div id='menu-selection'>
        {cartOpen ? <Cart setCartCount={setCartCount}/> : <MenuList /> }
      </div>

<div>
        <footer id='footer'>
        <address id='address-field'>
          <p>Visiting Address</p>
          <p>Tastes from Sri Lanka</p>
          <p>Orientalvägen 23</p>
          <p>112 24 Stockholm</p>
          <p>Telephone Number: +46 73 123 45 67</p>
        </address>
        <div>
          <p>Opening Hours</p>
          <p>Monday - Friday: 8:00 - 21:00</p>
          <p>Saturday - Sunday: 10:00 - 18:00</p>
        </div>
      </footer>
</div>

    </div>
  );
}

export default App;
