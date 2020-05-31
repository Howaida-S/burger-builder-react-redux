import React from 'react';
import classes from './Modal.module.css';
import {CSSTransition} from 'react-transition-group';
import Backdrop from './Backdrop/Backdrop';
const animationTiming = {
  enter: 400,
  exit: 1000
}
const modal = props => {
  return (
    <>
      <Backdrop show={props.show} closed={props.closed}/>
      <CSSTransition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: classes.ModalOpen,
        exit: '',
        exitActive: classes.ModalClosed,
      }}>
        <div className={classes.Modal}>
          {props.children}
        </div>
      </CSSTransition>  
    </>    
  );
};
export default modal;
