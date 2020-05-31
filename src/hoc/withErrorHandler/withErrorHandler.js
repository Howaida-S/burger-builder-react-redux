// this is global error handler 
import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component { 
    state = {
      error: null,
    }
/* can't make interceptors in componentDidMount because the life cycle come after 
componentDidMount call in wrapped ( children) component */    
    componentDidMount(){     
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      })      
      this.resInterceptor =axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }
// we should remove interceptors & with that preventing memory leaks when using this hoc in other pages   
      componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);// eject requires ref to interceptor
        axios.interceptors.response.eject(this.resInterceptor);    
      }
    errorConfirmedHandler = () => {
      this.setState({show: false});
    }
    render(){
      return (
        <>       
        <Modal 
          show ={this.state.error}
          closed ={this.errorConfirmedHandler}>
          {this.state.error ?this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props}/> 
      </>
      );
    }
  }
}  
export default withErrorHandler;

