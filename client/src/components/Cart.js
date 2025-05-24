import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './cart.css';
import TrashIcon from './icons/trashIcon';
import OrderConfirmation from './modals/OrderConfirmation';

function Cart() {
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
  const [nameCount, setNameCount] = useState(0);
  const nameSet = new Set();
  const uniqueItems = [];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    console.log("CartItems (useEffect)" + cartItems);

    storedCart.forEach((item) => {
      if(!nameSet.has(item.name)){
        nameSet.add(item.name);
        uniqueItems.push(item);
      }
    });

    console.log("NameSet:", nameSet); // This will now show expected values
  console.log("UniqueItems:", uniqueItems);
  console.log("StoredCart: ", storedCart);

    setUniqueCartItems(uniqueItems);
    setCartItems(storedCart);
    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCart`)
    // .then(result => {
    //   console.log(result.data);
    //   setCartItems(result.data);
    // })
  }, [])

  let totalPrice = cartItems.reduce((prev, {price}) => prev + price, 0)
  let items = cartItems.map(i => i.name);
  console.log("CartItems " + cartItems);
  console.log("Unique Items " + uniqueCartItems);

  console.log(nameSet);

              //Count amount of certain item
            const nameCounts = {};
            cartItems.forEach(item => {
              nameCounts[item.name] = (nameCounts[item.name] || 0) + 1;
              console.log(nameCounts[item.name]);
            });
            console.log(nameCounts);

  console.log(cartItems.length);


  function submitOrder(){
    alert("Thank you for your order")
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
    nameCounts[cartItem.name]++;
    console.log(cartItem.name)
    console.log(nameCounts[cartItem.name]);

    console.log(nameCounts);
    setCartItems(prevItems => [...prevItems, cartItem])
  }

  function deleteItem(id){
    console.log(cartItems);

    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCartItem/` + id)
    // .then(result => {
    //   console.log(result);
    //   window.location.reload();
    // })
    // .catch(err => console.log(err))
  }
  return (
    <div>
      {cartItems.length === 0 ? <p>{cartText}</p> :
      <>
        <p>Your cart items: </p>
        <ul id='cart-list'>
          {uniqueCartItems.map((item) => {
            console.log(item);

            return (
            <li className='cart-list-item'>
              <div id='content-wrapper'><span id='cart-item-amount'>{nameCounts[item.name]}x </span> </div>
              <div id='content-wrapper'><span id='cart-item-name'>{item.name}</span> </div>
              <div id='button-wrapper'><span id='cart-item-price'>{nameCounts[item.name] * item.price}kr</span>
              <button id='remove-btn' onClick={() => deleteItem(item._id)}><TrashIcon /></button>
              <button id='remove-btn' onClick={() => deleteItem(item._id)}>-</button>
              <button id='remove-btn' onClick={() => addItem(item)}>+</button></div>
            </li>)
          })}
        </ul>
        <p id='total-price'>Total: {totalPrice}kr</p>

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
