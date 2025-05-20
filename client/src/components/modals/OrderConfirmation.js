import React from 'react';
import './orderConfirmation.css';
import checkIcon from '../icons/checkIcon';

export default function() {
  return (
    <div id='order-confirmation'>
      <p>Thank you for your order. Please come to the restaurant and collect your order!</p>
      <checkIcon />
      <button id='order-confirmation-button' onClick={() => window.location.reload()}>OK</button>
    </div>
  )
}
