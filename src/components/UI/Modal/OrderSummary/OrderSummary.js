import React from 'react';
import Button from '../../Button/Button';
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igkey =>{
    return (
    // using key fo array 
    <li key={igkey}> 
      <span style ={{transform:'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}
    </li>)
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued }>CONTINUE</Button>
    </>
  );
};
export default orderSummary;
