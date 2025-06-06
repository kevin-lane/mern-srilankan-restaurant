import React, { useEffect, useState } from 'react';
import './menuCard.css';

function MenuCard(props) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
      setCartItems(JSON.parse(storedCart) || "[]");
    }
  }, []);

  function addItem(){
    alert(props.name + " has been added to the cart ");
    const newItem = { key: props.id, name: props.name, price: props.price };
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  }

  return (
    <div id='menu-card' key={props.id}>
        <p id='menu-name'>{props.name}</p>
        <p>{props.price}kr</p>
        <img id='menu-img' src={props.image} alt="" />
      <button id='submit-btn' type="" onClick={addItem}>+ Add to cart</button>
    </div>
  )
}

export default MenuCard;
