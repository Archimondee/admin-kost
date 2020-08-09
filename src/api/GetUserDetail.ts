import axios from 'axios';
import {api} from '../utils/url/url';

const GetUserDetail = async (id_user: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/user/get_user.php`, {
      id_user: id_user,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetUserDetail;
