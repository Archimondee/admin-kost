import axios from 'axios';
import {api} from '../../utils/url/url';

const GetIdPemesanan = async (id_pesanan: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/get_id_pesanan.php`, {
      id_pesanan: id_pesanan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetIdPemesanan;
