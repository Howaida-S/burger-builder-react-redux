import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
/* now i want to do 2 things : 
1- dispatch that action 
2- redirect 
*/
class Logout extends Component {
/*  and i want to do this right at the start when enter this page 
so here what i can do is i can add componentDidMount & i can then call this.props.onLogOut()
and this will then be the first thing i do when rendering this component */
  componentDidMount(){
    this.props.onLogout();
  }
  render(){
    return <Redirect to='/'/>
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};
/* i call connect here */
export default connect(null, mapDispatchToProps )(Logout);

