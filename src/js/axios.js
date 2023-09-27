import axios from 'axios';
import { urlInfo } from './config';

export async function fetchPhotos(urlInfo) {
  const response = await axios.get(urlInfo.BASE_URL);
  return response.data;
}
