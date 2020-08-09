import axios from 'axios';
import {api} from '../utils/url/url';

const GetUser = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/user/get_data_user.php`)
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetUser;
