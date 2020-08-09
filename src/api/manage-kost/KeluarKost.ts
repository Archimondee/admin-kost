import axios from 'axios';
import {api} from '../../utils/url/url';

const KeluarKost = async (
  id_user: number,
  id_kost: number,
  id_kamar: number,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/keluar_kost.php`, {
      id_user: id_user,
      id_kost: id_kost,
      id_kamar: id_kamar,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default KeluarKost;
