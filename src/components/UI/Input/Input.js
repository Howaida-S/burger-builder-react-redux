import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
/* InputElement class will be always there ,
but if the input field has invalid prop set to true we'll add another class Invalid  
and now we only want to add this invalid class if the element has been touched */  
  let inputElement = null ;
// error message 
  let validationError = null;
  const inputClasses = [classes.InputElement];
  if(props.invalid && props.touched){
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter a valid value</p>;
  }
  switch ( props.elementType ) {
    case('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
    break;
    case ('textarea'):
      inputElement = <textarea
      className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
/* select here has a closing tag because in between i'll need to create our options 
i'll wrap this in () so that i can write multi-line jsx code */      
      case ('select'):
        inputElement = (
          <select
            className={inputClasses.join(' ')}                       
            value={props.value}
            onChange={props.changed}>
{/* elementConfig: {
  options: [
      {value: 'fastest', displayValue: 'Fastest'},
      {value: 'cheapest', displayValue: 'Cheapest'}
  ]}, */}              
            {props.elementConfig.options.map(option => (
              <option 
                  key={option.value} 
                  value={option.value}>
                  {option.displayValue}
              </option>
              ))}
          </select>);
      break;
      default:
        inputElement = <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
        }

  return(
    <div className={classes.Input}> {/* container for input because i have multiple elements in there */}
      {inputElement} {/* i want to output my inputelement here */}
      {validationError} {/* error message appear here in case of invalid*/}
    </div>
  );
};
export default input;
