import React ,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/UI/Modal/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
class BurgerBuilder extends Component {
  state = {
// this is local UI state we don't need it in any other place in app     
    purchasing: false, // for show/ or hide modal 
  }
/* i want to load ingredient & reset them whenever this component get mounted 
now for that reason since we're doing it here 
we have the issue of not updating the price */  
  componentDidMount(){
    this.props.onInitIngredients();
  }
    
  updatePurchaseState(ingredients){// for disable/ or enable ordernow button  
    const sum = Object.values(ingredients) 
    .reduce(((sum,el)=>{return sum + el}),0);
    return sum > 0 // true or false
  }
  purchaseHandler = () => {
    if(this.props.isAuth){
      this.setState({purchasing: true});
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();// call it before navigate   
    this.props.history.push('/checkout');
  }

  render(){
    const disabledInfo = {...this.props.ings};
    for(let key in disabledInfo){    
      disabledInfo[key] = disabledInfo[key] <= 0 //the form will be { salad : true , cheese: false … and so on }
    }
    let orderSummary = <OrderSummary 
      ingredients={this.props.ings}
      totalPrice={this.props.price}
      purchaseCancelled = {this.purchaseCancelHandler}
      purchaseContinued = {this.purchaseContinueHandler}/>

    let myBurger = this.props.error? 
      <p style={{textAlign: 'center', fontWeight: 'bold', fontSize:'20px'}}>ingredients not reloaded !</p>
      :<Spinner/> 
      if(this.props.ings){
      myBurger = 
        <>
          <Burger ingredients = {this.props.ings}/>
          <BuildControls 
            ingredientAdded ={this.props.onIngredientAdded}
            ingredientRemoved ={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered = {this.purchaseHandler}
            isAuth={this.props.isAuth}/>
        </>
    }

    return(
      <>
        <Modal 
          show={this.state.purchasing}
          closed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {myBurger}
      </>
    );
  }
}
const mapStateToProps = state => {
  return{
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
// ingName passed from buildControls.js as ctr.type     
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)), 
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}
// wrap the burgerBuilder with : withErrorHandler 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

