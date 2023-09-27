import { makeURL } from './make-url';
import { fetchPhotos } from './axios';
import { createMarkup } from './markup-creator';
import { showLoader, hideLoader } from './loader-status';
import { refs } from './refs';
import lightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export async function onScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    const url = makeURL(urlInfo);

    showLoader();

    try {
      const valueQuery = await fetchPhotos(url);

      urlInfo.currentPage += 1;

      createMarkup(valueQuery, refs.galleryWrapperRef);

      slowlyScroll();

      lightbox.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }
}
