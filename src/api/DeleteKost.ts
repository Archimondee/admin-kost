import axios from 'axios';
import {api} from '../utils/url/url';

const DeleteKost = async (id_kost: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/kost/delete_kost.php`, {
      id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default DeleteKost;
