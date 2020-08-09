import axios from 'axios';
import {api} from '../../utils/url/url';

const CekUserKost = async (id_user: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/cek_user_kost.php`, {
      id_user: id_user,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default CekUserKost;
