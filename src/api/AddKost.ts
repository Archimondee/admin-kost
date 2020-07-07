import axios from 'axios';
import {api} from '../utils/url/url';

const AddKost = async (
  foto: string,
  namaKost: string,
  namaPemilik: string,
  hargaBulanan: string,
  alamat: string,
  keterangan: string,
  fasilitas: string,
  jumlahKamar: number,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/kost/tambah_kost.php`, {
      gambar_kost: foto,
      nama_kost: namaKost,
      alamat: alamat,
      harga_bulanan: hargaBulanan,
      stok_kamar: jumlahKamar,
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

export default AddKost;
