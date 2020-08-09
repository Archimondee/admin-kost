import axios from 'axios';
import {api} from '../../utils/url/url';

export const GetNoKamar = async (id_kamar: number) => {
  const result = await axios
    .post(`${api.url}/manage/get_no_kamar.php`, {id_kamar: id_kamar})
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};
