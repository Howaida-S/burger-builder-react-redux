import React , {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';
class BurgerIngredient extends Component {
  render (){
    let ingredient = null;
    switch (this.props.type){ // in class-based component you access props through this.props
      case ('bread-bottom'):
        ingredient = <div className ={classes.BreadBottom}></div>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className = {classes.BreadTop}>
            <div className = {classes.Seeds1}></div>
            <div className = {classes.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className ={classes.Meat}></div>;
        break;
      case ('cheese'):
        ingredient = <div className ={classes.Cheese}></div>; 
        break;
      case ('salad'):
        ingredient = <div className ={classes.Salad}></div>; 
        break;
      case ('bacon'):
        ingredient = <div className ={classes.Bacon}></div>; 
        break; 
      default :
        ingredient = null;      
    }
    return ingredient ; // ingredient is either null or one of many divs 
  }
}
/* add prop type validation 
use PropTypes we imported to make sure the type should be string & chain another condition that it's required
so if we ever tried to use ingredient component without passing a type we'll get an error */
BurgerIngredient.propTypes = { type : PropTypes.string.isRequired }
export default BurgerIngredient;
