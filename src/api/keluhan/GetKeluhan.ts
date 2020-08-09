import axios from 'axios';
import {api} from '../../utils/url/url';

export const GetKeluhanRegistered = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/keluhan/daftar_keluhan.php`, {
      //id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetKeluhanDone = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/keluhan/keluhan_selesai.php`, {
      // id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};
