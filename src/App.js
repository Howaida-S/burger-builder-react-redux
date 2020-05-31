import React ,{Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = ( // this is the routing setup for unauthenticated users 
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/'/> {/* in case of unknown route instead of shown blank page redirect to / */}
      </Switch>
    );
    if(this.props.isAuth){
      routes = ( // this is the routing setup for authenticated users 
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth} />
          <Route path= "/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/'/>
      </Switch>
      );
    }

    return (
      <>
        <Layout>
          {routes}
        </Layout>
      </>
    );
  }}
const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
