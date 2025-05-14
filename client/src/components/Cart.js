import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './cart.css';
import TrashIcon from './icons/trashIcon';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [postalCity, setPostalCity] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCart`)
    .then(result => {
      console.log(result.data);
      setCartItems(result.data);
    })
  }, [])

  let totalPrice = cartItems.reduce((prev, {price}) => prev + price, 0)
  let items = cartItems.map(i => i.name);

  function submitOrder(){
    alert("Thank you for your order")
    setOrderedItems(items);

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

      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCart`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

      // window.location.reload();
  }

  function deleteItem(id){
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCartItem/` + id)
    .then(result => {
      console.log(result);
      window.location.reload();
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      {cartItems.length === 0 ? <p>Your cart is empty</p> :
      <>
        <p>Your cart items: </p>
        <ul id='cart-list'>
          {cartItems.map((item) => {
            console.log(item);

            return (
            <li className='cart-list-item'>
              <div id='content-wrapper'><span id='cart-item-name'>{item.name}</span> </div>
              <div id='button-wrapper'><span id='cart-item-price'>{item.price}kr</span><button id='remove-btn' onClick={() => deleteItem(item._id)}><TrashIcon /></button></div>
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
    </div>
  )
}

export default Cart
