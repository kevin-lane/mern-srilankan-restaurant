import React, { useEffect, useState } from 'react';
import axios from "axios";
import MenuCard from './cards/menu-card';
import './menuList.css';

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getMenu`)
    .then(result => {
      console.log(result.data);

      setMenuItems(result.data);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div id='menu-list'>
      {menuItems.map((item, index) => {
        return (
          <MenuCard id={item._id} key={item._id} name={item.name} price={item.price} image={item.image} />
      )})}
    </div>
  )
}

export default MenuList
