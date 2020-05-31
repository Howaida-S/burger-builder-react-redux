import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '', 
        validation: {
          required: true, 
          isEmail: true
        },
        valid: false,
        touched: false  
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',  
        validation: {
          required: true,       
          minLength: 6 
        },
        valid: false,
        touched: false  
      },
    },
      /* set it initially to true , we should be in sign up mode initially */
      isSignup: true
  }
  componentDidMount() {
    if (!this.props.buildingBurger) {
      this.props.onSetAuthRedirectPath('/');
    }
}
  inputChangedHandler(event, controlName){
    const updatedControl = updateObject(this.state.controls[controlName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
      touched: true 
    });
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updatedControl
    })
    this.setState({controls: updatedControls})
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
}
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup }
    })
  }
  render(){
/* convert obj into array 
controls = [
{id:email, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched}},
{id:password, config: {elementType: "input", elementConfig: {…}, value: "" , validation:{..},valid, touched}},
] */  
    const formElementsArray = [];
    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }
// loop through array & map it into array of JSX elements   
    let  form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}             
        invalid ={!formElement.config.valid}           
        shouldValidate ={formElement.config.validation}
        touched ={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
      
    ));
    if(this.props.loading){
      form =<Spinner />
    }
    let errorMessage = null ;
    if(this.props.error){ // because error message we recieve will be in the form ex: ERROR_Y 
      errorMessage = (
/* because error message we recieve will be in the form ex: ERROR_ONE: ... 
so use reg exp to replace _ with empty space & by css convert uppercase into lowercase */        
      <p className={classes.ErrorMsg}>{this.props.error.message.replace(/_/g,' ')}</p>
      );
    }

    let authRedirect = null;
    if(this.props.isAuth){ // after being authenticated it'll redirect to burgerbuilder page 
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={classes.Auth}>
          {authRedirect}
          {errorMessage} 
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
          <Button 
            btnType='Danger'
            clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup?'SIGN IN': 'SIGN UP'}</Button>
      </div>
  );
}
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    buildingBurger: state.burgerBuilder.building,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}
const mapDispatchToProps = dispatch => {
return {
  onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
