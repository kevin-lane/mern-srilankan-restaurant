import axios from 'axios';
import React, { useState } from 'react';
import './menuCard.css';

function MenuCard(props) {
  const [cartItems, setCartItems] = useState([]);
  function addItem(){
    alert(props.name + " has been added to the cart ");
      cartItems.push({name: props.name, price: props.price})
    console.log(cartItems)

    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", JSON.stringify(cartItems));

    }
    else{
      setCartItems([
        ...cartItems,
        { name: props.name, price: props.price }
      ]
    );
      localStorage.setItem("cart", JSON.stringify(cartItems));

      console.log(localStorage.getItem("cart"));

    }
    localStorage.setItem('cartName', props.name);
    localStorage.setItem('cartPrice', props.price);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addToCart`, { name: props.name, price: props.price })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  return (
    <div id='menu-card' key={props.id}>
        <p id='menu-name'>{props.name}</p>
        <p>{props.price}kr</p>
        <img id='menu-img' src={props.image} alt="" />
      <button id='submit-btn' type="" onClick={addItem}>+</button>
    </div>
  )
}

export default MenuCard
