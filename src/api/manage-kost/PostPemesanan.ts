import axios from 'axios';
import {api} from '../../utils/url/url';

const PostPemesanan = async (
  tgl_pemesanan: string,
  id_user: number,
  id_kost: number,
  id_kamar: number,
  tagihan_bulan: string,
  pesan: string,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/manage/post_pemesanan.php`, {
      tgl_pemesanan: tgl_pemesanan,
      id_user: id_user,
      id_kost: id_kost,
      id_kamar: id_kamar,
      tagihan_bulan: tagihan_bulan,
      pesan: pesan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default PostPemesanan;
