import axios from 'axios';
import {api} from '../utils/url/url';

const EditKost = async (
  id_kost: number,
  foto: string,
  namaKost: string,
  namaPemilik: string,
  hargaBulanan: string,
  alamat: string,
  keterangan: string,
  fasilitas: string,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/kost/edit_kost.php`, {
      id_kost: id_kost,
      gambar_kost: foto,
      nama_kost: namaKost,
      alamat: alamat,
      harga_bulanan: hargaBulanan,
      keterangan: keterangan,
      fasilitas: fasilitas,
      nama_pemilik: namaPemilik,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default EditKost;
