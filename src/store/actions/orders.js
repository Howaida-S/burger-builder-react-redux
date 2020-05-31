import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
/*------------------ sending orders to server --------------------*/

export const purchaseBurgerStart = () => { // for loading 
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerSuccess = (id, orderData) => { // for success 
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    OrderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => { // for failing
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurger = (orderData, token ) => { // async code 
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token,orderData) // this url require token
    .then(response =>{
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(error => {
      dispatchEvent(purchaseBurgerFail(error));
    })
  };
};

/* ---------------------- for redirect after purchase done----------------------- */
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
  
/*------------------ fetching orders from server --------------------*/
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
export const fetchOrdersSuccess = ( orders ) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders // as payload 
  };
};
export const fetchOrdersFail = ( error ) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart()); // to set loading to true 
// this url requires a token & userId to filter ther order for only specific user    
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get( '/orders.json' + queryParams)
        .then( res => {
          const fetchedOrders = [];
          for ( let key in res.data ) { // to convert obj (res.data) into array 
            fetchedOrders.push( {
              ...res.data[key], // distribute old properties
              id: key // add a new property 
            } );
          }
          dispatch(fetchOrdersSuccess(fetchedOrders));
      } )
      .catch( err => {
        dispatch(fetchOrdersFail(err));
      } );
  };
};
