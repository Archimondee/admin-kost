import axios from 'axios';
import {api} from '../../utils/url/url';

const TerimaPayment = async (
  id_pemesanan: number,
  id_user: number,
  id_kost: number,
  id_kamar: number,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/terima_payment.php`, {
      id_pemesanan: id_pemesanan,
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

export default TerimaPayment;
