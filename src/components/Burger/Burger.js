import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)// [salad,bacon,cheese,meat]
  .map(igkey => {
/* the length = amount of ingredient  [,] => 
[ [undefined], 
  [undefined],  
  [undefined,undefined],
  [undefined]
]   
*/
    return [...Array(props.ingredients[igkey])] // the length = amount of ingredient  [,]
    .map((_,i)=>{
      return <BurgerIngredient key={igkey+ i} type ={igkey}/>     
    });
  }).reduce((arr,el)=>{
    return arr.concat(el); // [] empty array , concat() => uset to join 2 or more arrays 
  },[]); 
  return (
    <div className = {classes.Burger}>      
      <BurgerIngredient type ='bread-top'/>
      {transformedIngredients.length === 0? <p>please start adding the ingredients!</p>:transformedIngredients}
      <BurgerIngredient type ='bread-bottom'/>
    </div>  
  );
};

export default burger;
