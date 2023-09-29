import { urlInfo } from './config';

export function makeURL(urlInfo) {
  const { BASE_URL, API_KEY, category, perPage, currentPage } = urlInfo;
  return `${BASE_URL}/?key=${API_KEY}&q=${category}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`;
}
