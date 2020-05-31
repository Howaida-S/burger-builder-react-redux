export const updateObject = (oldObject, updatedProperties) => {
  return{
    ...oldObject,
    ...updatedProperties
  }
};

// method to check validity we use it in Auth & ContactData containers
export const checkValidity = (value, rules) => {
  let isValid = true; // to avoid the behavior of seperate if check which returns the last check 
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }
  if (rules.isEmail) {
/* 1-(your name) @ 2-(domain) . 3-(extension) . 4-(again) => ex: the boss@yahoo.co.uk
1-any letters, numbers, dots and or hyphens
2-any letters, numbers, and or hyphens
3-any letters (with the range from 2 to 8)
4-dot then any letters (with the range from 2 to 8)
*/    
    const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    isValid = pattern.test(value) && isValid
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }
  return isValid;
}