import axios from 'axios';
const instance = axios.create({
  baseURL:'https://burger-e7180.firebaseio.com/'
});
export default instance;