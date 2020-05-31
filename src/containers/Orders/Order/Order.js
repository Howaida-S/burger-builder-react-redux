import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
  const ingredients = []; // [{name: salad, amount: 0}, .... ]
  for(let ingredientName in props.ingredients){
    ingredients.push( // so this is obj i'm pushhing into ingredients array 
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      })
  }
// now i can map ingredients into text in <p>Ingredients: Salad(1)</p>
  const ingredientOutput = ingredients.map(ig => {
    // return jsx here , span will be styled 
    return <span 
      className={classes.Output}
      key={ig.name}>{ig.name} ({ig.amount})</span>
  });
  return(
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
  </div>
  );
}

export default order;
