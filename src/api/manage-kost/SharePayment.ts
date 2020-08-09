import axios from 'axios';
import {api} from '../../utils/url/url';

const SharePayment = async (
  tagihan_bulan: string,
  tgl_pemesanan: string,
  pesan: string,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/share_payment.php`, {
      tagihan_bulan: tagihan_bulan,
      tgl_pemesanan: tgl_pemesanan,
      pesan: pesan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default SharePayment;
