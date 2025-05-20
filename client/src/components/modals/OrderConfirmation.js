import React from 'react';
import './orderConfirmation.css';
import CheckIcon from '../icons/checkIcon';

export default function() {
  return (
    <div id='order-confirmation'>
      <p>Thank you for your order. Please come to the restaurant and collect your order!</p>
      <p><CheckIcon /></p>
      <button id='order-confirmation-button' onClick={() => window.location.reload()}>OK</button>
    </div>
  )
}
