import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
  orders: [],
  loading: false,
  purchased: false
}; 

const orderReducer = (state = initialState, action) => {
/*--------------------------- send orders ----------------------------*/        
  switch(action.type){
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true})// for loading 
/* here set purchased to false but in success set it to true so now purchased changes as soon as we 
did successfully purchase  but it always reset once we revisit the checkout container */
    case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false});    
    case actionTypes.PURCHASE_BURGER_SUCCESS:
// merge the id & orderData into one obj , distribute the properties of orderData &  add a new property id 
      const newOrder = updateObject(action.orderData, {id: action.OrderId})     
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      })
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false})
/*----------------- fetching orders ----------------------*/       
    case actionTypes.FETCH_ORDERS_START: return updateObject(state,{loading: true})
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {
      orders: action.orders,
      loading: false 
    })
    case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false})
    default: return state;
  }
};
export default orderReducer;
