import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';
class Layout extends Component {
  state = {
    showSidedrawer: false
  }
  sidedrawerClosedHandler = () => {
    this.setState({showSidedrawer:false})
  }
  sideDrawerTogglededHandler = () => {
    this.setState((prevState) => {
      return {showSidedrawer: !prevState.showSidedrawer};
    });
  }

  render(){
    return (
      <>
        <Toolbar 
          isAuth={this.props.isAuth} 
          drawerToggleClicked={this.sideDrawerTogglededHandler}/>       
        <Sidedrawer 
          isAuth={this.props.isAuth} 
          show ={this.state.showSidedrawer} 
          closed={this.sidedrawerClosedHandler}/>
        <main className ={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null 
  }
}
export default connect(mapStateToProps)(Layout);
