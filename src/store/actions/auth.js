import * as actionTypes from './actionTypes';
import axios from 'axios';
/*------------------- for sign in / sign up ------------------------------*/

export const authStart = () => { // we use this action to set loading state & show spinner
  return {
    type: actionTypes.AUTH_START
  }
}
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
    email: email,
    password: password,
    returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwYxcu09YFIUEhicwfGH8O38tvw5P4uZA';
    if(!isSignup){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwYxcu09YFIUEhicwfGH8O38tvw5P4uZA'
    }
    axios.post(url, authData)
    .then(response => {
/* persistent auth state with localStorage 
localStorage.setItem take 2 arguments : 1- key    2- the actual item
i store 3 things : 1- token   2- when it expires  3- userId
expiration time = number of seconds the token takes to expires 
the problem : expiration time is not updated so it's not useful when we fetch it from localStorage
the solution: store expiration date instead 
new Date().getTime() => date in ms // response.data.expiresIn * 1000 => expiration time in ms 
wrap them all by new Date( ) 
*/      
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn))
  })
  .catch(err => {
    dispatch(authFail(err.response.data.error))
  });
};
};
/*--------------------------- for log out ------------------------*/

export const logout = () => {
//we aren't logged in anymore so these  items aren't needed anymore  
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); // expiration time = 3600 sec but settime out take time in millisec so turn ms to sec by multiply in 1000
  };
};

/*-----for redirect in case of redirected to auth page through burgerbuilder page------*/
// this action is dispatched whenever the path is modified 
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

/*--------------- for persistent auth state with local storage (with auth & logout) ------------*/

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token'); // get my token from localStorage 
    if(!token){
      dispatch(logout());
    }else {
/* get my expirationDate from localStorage :
const expirtationTime then wrap the expirationDate with new Date() because what we retrieve from localStorage 
will be a string but with new Date() we can convert it to into a date obj */     
      const expirationDate = new Date(localStorage.getItem('expirationDate')); // get my expirationDate from localStorage 
      if(expirationDate <= new Date()){
        dispatch(logout());
      }else{
        const userId = localStorage.getItem('userId'); // here we can fetch a userId if we're logged in 
        dispatch(authSuccess(token, userId));// i want to dispatch my authSuccess action creator because i know that we're logged in
/* pass the amounts of seconds untill we should logged out which equals to 
the difference between the future date & how many seconds these are */        
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000)); // /1000 to convert from ms to s
      }
  };
};
}