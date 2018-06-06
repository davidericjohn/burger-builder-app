import React from 'react';

import classes from './Order.css';

const order = props => {
  const order = props.order,
    ingredients = order.ingredients,
    orderData = order.orderData;
  const listIngredients = Object.keys(ingredients)
    .map(key => {
      return (
        <li key={key} className={classes.Ingredient}>
          {key} ({ingredients[key]})
        </li>
      );
    });

  return (
    <section className={classes.Order}>
      <div style={{ width: '100%' }}><h3>Order Details:</h3></div>
      <hr />
      <div><label>Name: </label> {orderData.name}</div>
      <div><label>Street: </label> {orderData.street}</div>
      <div><label>City: </label> {orderData.city}</div>
      <div><label>Zip Code: </label> {orderData.zipCode}</div>
      <div><label>Contact Number: </label> {orderData.contactNumber}</div>
      <div><label>Email: </label> {orderData.email}</div>
      <hr />
      <div><label>Date Ordered: </label> {order.orderDate}</div>
      <div><label>Order Status: </label> {order.orderStatus}</div>
      <div><label>Delivery Method: </label> {orderData.deliveryMethod}</div>
      <div><label>Date Delivered: </label> {order.deliveryDate}</div>
      <div><label>Price: </label> NZD {order.price.toFixed(2)}</div>
      <div style={{ width: '100%' }}><label>Ingredients: </label>
        <ul className={classes.Ingredients}>
          {listIngredients}
        </ul></div>
    </section>
  )
}

export default order;