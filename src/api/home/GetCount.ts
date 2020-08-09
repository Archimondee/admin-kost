import axios from 'axios';
import {api} from '../../utils/url/url';

export const GetJumlahUser = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/home/get_count_user.php`, {
      //id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetJumlahKost = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/home/get_count_kost.php`, {
      // id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetJumlahKamar = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/home/get_count_kamar.php`, {
      // id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetJumlahKeluhan = async () => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/home/get_count_keluhan.php`, {
      // id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};
