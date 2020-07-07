import axios from 'axios';
import {api} from '../utils/url/url';

const GetKost = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/kost/get_kost.php`)
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetKost;
