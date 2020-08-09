import axios from 'axios';
import {api} from '../../utils/url/url';

const TolakPayment = async (id_pemesanan: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/tolak_payment.php`, {
      id_pemesanan: id_pemesanan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default TolakPayment;
