import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
const controls = [
  {Label:'Salad', type: 'salad'},
  {Label:'Bacon', type: 'bacon'},
  {Label:'Cheese', type: 'cheese'},
  {Label:'Meat', type: 'meat'}
]
const buildControl = (props) => (
  <div className={classes.BuildControls}>
    <p>current price : <strong>{props.price.toFixed(2)}</strong></p> 
    {controls.map(ctrl => {
      return <BuildControl 
        key={ctrl.type} 
        label={ctrl.Label}
        added ={props.ingredientAdded.bind(this, ctrl.type)}
        removed ={props.ingredientRemoved.bind(this, ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    })}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>  
  </div>
);
export default buildControl;
