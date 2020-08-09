import axios from 'axios';
import {api} from '../../utils/url/url';

const GetIdKamar = async (id_kost: number, id_kamar: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/get_id_kamar.php`, {
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

export default GetIdKamar;
