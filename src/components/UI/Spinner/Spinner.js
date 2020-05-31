import React from 'react';
import classes from './Spinner.module.css';
const spinner = () => (
/* the loading in between is like a fallback in case the css isn't displayed then this will be shown */
  <div className={classes.Loader}>Loading...</div>
);
export default spinner;
