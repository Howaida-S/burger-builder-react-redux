import React from 'react';
import classes from './Sidedrawer.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';
const sidedrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return(
    <>
      <Backdrop show={props.show} closed={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}> {/* close the drawer whenever we clock on any nav item*/}
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  );
};
export default sidedrawer;
