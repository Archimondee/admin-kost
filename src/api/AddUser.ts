import axios from 'axios';
import {api} from '../utils/url/url';

const AddUser = async (
  nama_user: string,
  jenkel: string,
  alamat: string,
  no_telpon: string,
  email: string,
  img: string,
  no_rekening: string,
  nama_rekening: string,
  nama_bank: string,
  username: string,
  password: string,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/user/tambah_user.php`, {
      nama_user: nama_user,
      jenkel: jenkel,
      alamat: alamat,
      no_telpon: no_telpon,
      email: email,
      img: img,
      no_rekening: no_rekening,
      nama_rekening: nama_rekening,
      nama_bank: nama_bank,
      username: username,
      password: password,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default AddUser;
