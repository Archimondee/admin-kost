import axios from 'axios';
import {api} from '../../utils/url/url';

export const GetGuest = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/get_tamu.php`, {})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetGuestKost = async () => {
  const result = await axios
    .post(`${api.url}/manage/get_kost.php`, {})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetGuestKamar = async (id_kost: number) => {
  const result = await axios
    .post(`${api.url}/manage/get_kamar.php`, {id_kost: id_kost})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};
