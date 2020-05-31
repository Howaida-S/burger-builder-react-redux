import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
class Checkout extends Component{
  checkoutCancelledHandler = () => {
  // i want execute goBack method upon cancelling .. this simply go back to last page     
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    let summary = <Redirect to='/'/> // if ingredients not loaded it'll be better to be redirected to burgerBuilderPge
    if(this.props.ings){ // only if ingredients loaded render the checkoutsummary
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/>: null ;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
          <Route 
          path={this.props.match.path + '/contact-data'} 
          component={ContactData} />
        </div>
      )
    }
    return summary /* now we can use that summary variable & output it here */
  }
}

const mapStateToProps = state => {
  return{
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
}
export default connect(mapStateToProps)(Checkout);
