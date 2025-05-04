import React, { useEffect, useState } from 'react';
import axios from "axios";
import MenuCard from './cards/menu-card';
import './menuList.css';

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/getMenu')
    .then(result => {
      setMenuItems(result.data);

    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div id='menu-list'>
      {menuItems.map((item, index) => {
        console.log(index);
        return (
          <MenuCard key={index} name={item.name} price={item.price} image={item.image} />
      )})}
    </div>
  )
}

export default MenuList
