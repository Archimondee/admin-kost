import axios from 'axios';
import {api} from '../../utils/url/url';

export const GetTunggakan = async () => {
  const result = await axios
    .post(`${api.url}/manage/get_tunggakan.php`, {})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetPemesanan = async () => {
  const result = await axios
    .post(`${api.url}/manage/get_penerimaan.php`, {})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export const GetSelesai = async () => {
  const result = await axios
    .post(`${api.url}/manage/get_selesai.php`, {})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};
