import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './cart.css';
import OrderConfirmation from './modals/OrderConfirmation';

function Cart( {setCartCount} ) {
  const [cartItems, setCartItems] = useState([]);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [postalCity, setPostalCity] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [cartText, setCartText] = useState("Cart is empty");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const nameSet = new Set();
  const uniqueItems = [];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    storedCart.forEach((item) => {
      if(!nameSet.has(item.name)){
        nameSet.add(item.name);
        uniqueItems.push(item);
      }
    });
    setUniqueCartItems(uniqueItems);
    setCartItems(storedCart);
  }, [])

  let totalPrice = cartItems.reduce((prev, {price}) => prev + price, 0)
  let items = cartItems.map(i => i.name);

  //Count amount of certain item
  const nameCounts = {};
  cartItems.forEach(item => {
    nameCounts[item.name] = (nameCounts[item.name] || 0) + 1;
    console.log(nameCounts[item.name]);
  });

  function submitOrder(){
    setOrderedItems(items);
    setCartText("Thank you for your order!");
    //Post order to orders collection
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addToOrders`,
      {
        foodOrders: cartItems.map(orders => orders.name),
        totalPrice: totalPrice,
        firstName: firstName,
        lastName: lastName,
        address: address,
        postalCode: postalCode,
        postalCity: postalCity,
        telephoneNumber: telephoneNumber,
        email: email
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))

      localStorage.clear(); //Clear cart when order submitted
      setOrderSubmitted(true);
  }

  function addItem(cartItem){
    const updatedCart =[...cartItems, cartItem]
    nameCounts[cartItem.name]++;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  }

  function deleteItem(cartItem){
    const updatedCart = [...cartItems];
    nameCounts[cartItem.name]--;
    const index = updatedCart.findIndex(item => item.name === cartItem.name);
    if(index > -1){
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length); //Update cartCount in ui
  }

  return (
    <div id='cart'>
      {cartItems.length === 0 ? <h2>{cartText}</h2> :
      <>
        <h2>Your cart items: </h2>
        <ul id='cart-list'>
          {uniqueCartItems
          .filter(item => nameCounts[item.name] > 0)
          .map((item) => {
            console.log(item);
            return(
              <li className='cart-list-item'>
                <div id='content-wrapper'></div>
                <div id='content-wrapper'>
                  <p id='cart-item-name'>{item.name}</p>
                  <p id='cart-item-price'>{nameCounts[item.name] ? nameCounts[item.name] * item.price : 0}kr</p>
                </div>
                <div id='button-wrapper'>
                  <button id='remove-btn' onClick={() => deleteItem(item)}>-</button>
                  <span id='name-count-container'>{nameCounts[item.name]}</span>
                  <button id='remove-btn' onClick={() => addItem(item)}>+</button>
                </div>
              </li>
            )
          })}
        </ul>
        <p id='total-price'>Total cost: <span style={{ color: '#941E32' }}>{totalPrice}:-</span></p>

        <hr id='cart-line-seperator'/>
        <h2>Checkout</h2>
        <p>Please fill in your details below to complete the order</p>
          <form id='cart-form'>
              <label className='input-labels' for="firstName">First Name</label>
              <input type='text' id='firstName' className='input-fields' name='firstName' onChange={e => setFirstName(e.target.value)} />
              <label className='input-labels' for="firstName">Last Name</label>
              <input type='text' id='lastName' className='input-fields' name='lastName' onChange={e => setLastName(e.target.value)} />

              <label className='input-labels' for="address">Address</label>
              <input type='text' id='address' className='input-fields' name='address' onChange={e => setAddress(e.target.value)} />

              <label className='input-labels' for='postalCode'>Postal Code</label>
              <input type='text' id='postalCode' className='input-fields' name='postalCode' onChange={e => setPostalCode(e.target.value)}/>
              <label className='input-labels' for='postalCity'>Postal City</label>
              <input type='text' id='postalCity' className='input-fields' name='postalCity' onChange={e => setPostalCity(e.target.value)}/>

            <label className='input-labels' for='telephoneNumber'>Telephone Number</label>
            <input type='number' id='telephoneNumber' className='input-fields' name='telephoneNumber' onChange={e => setTelephoneNumber(e.target.value)}/>
            <label className='input-labels' for='email'>Email</label>
            <input type='text' id='email' className='input-fields' name='email' onChange={e => setEmail(e.target.value)}/><br/>
          </form>
          <button id='submit-order-btn' type="submit" onClick={submitOrder}>Submit Order</button>
      </>
      }
      {orderSubmitted && <OrderConfirmation />}
    </div>
  )
}

export default Cart
