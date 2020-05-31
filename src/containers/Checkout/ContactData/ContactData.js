import React, {Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-order.js';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import {connect} from 'react-redux';
import { updateObject, checkValidity} from './../../../shared/utility';
class ContactData extends Component{
  state ={ 
// this is  local UI state we don't need the form in any other place in app          
    orderForm : {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true, 
        },
        valid: false,
/* to keep track if the input touched by the user or not to decide if it valid or not ,
because without it it will be styled as invalid initially */     
        touched: false 
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true, 
        },
        valid: false,
        touched: false
      },
      zipcode :{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value:'',
        validation: {
          required: true, 
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: { 
        elementType: 'input',
        elementConfig :{
          type: 'text',
          placeholder: 'Country'
        },
        value:'',
        validation: {
          required: true, 
        },
        valid: false,
        touched: false
      },
      email :{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value:'',
        validation: {
          required: true,
          isEmail: true 
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value:'fastest',// it shouldn't be empty because if we don't change the value & submit the form it'll send empty value 
        validation:{}, // it's empty but now we have equal controls 
        valid: true // it has no valkidation rules so valid is always true 
      }
    },
    formIsValid:false, // to handle overall form validity 
  }

// method interact with changed properties 
inputChangedHandler(event, inputIdentifier){
  const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
    value: event.target.value,
    valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
    touched: true
  });
  const updatedOrderForm =updateObject(this.state.orderForm, {
    [inputIdentifier]: updatedFormElement
  })
  let formIsValid = true ;
  for(let inputIdentifier in updatedOrderForm){
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
  updatedOrderForm[inputIdentifier] = updatedFormElement;
  this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
}
// method to send post request order to firebase
  orderHandler = (event) => {
    event.preventDefault(); // to prevent default behaviour that cause reloading the form 
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; // key: value , here we only care for value
    }
    const order = {
      ingredients : this.props.ings,
      price : this.props.price,
      orderData: formData,
      userId: this.props.userId,
  }    
    this.props.onOrderBurger(order, this.props.token);
  }

  render(){
    const formElementsArray = [];
/* formEleentArray = [
{id:name, config: {elementType: "input", elementConfig: {…}, value: "", validation:{..},valid, touched} },
{id:street, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched} },
{id:zipcode, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched} },
{id:country, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched}},
{id:email, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched}},
{id:deliveryMethod, config: {elementType: "select", elementConfig: {…}, value: "",validation:{..},valid, touched}}
] */    
    for(let key in this.state.orderForm){ 
      formElementsArray.push({
        id: key,        
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} // revers the value because i'm passing the opposite
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event,formElement.id)}/>// to can react to obj & change its value
        })}
        <Button 
          btnType='Success' 
          disabled={!this.state.formIsValid} //disable is true if the form isn't valid & vice versa 
          >ORDER</Button>
    </form>
    );
    if(this.props.loading){
      form = <Spinner/>;
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };  
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
