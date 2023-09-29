import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { urlInfo } from './js/config';
import updatePage from './js/update-page';
import { fetchPhotos } from './js/axios';
import { makeURL } from './js/make-url';
import { createMarkup } from './js/markup-creator';
import { slowlyScroll } from './js/slowly-scroll';
import { showLoader, hideLoader } from './js/loader-status';

const lightbox = new SimpleLightbox('.gallery a');

let totalPage = 1;
let currentPage = 1;
let isLoading = false;
console.log('currentPage:', currentPage, 'totalPage:', totalPage);
refs.formRef.addEventListener('submit', handleSubmit);
addEventListener('scroll', onScroll);

async function handleSubmit(e) {
  e.preventDefault();
  updatePage(e, refs.galleryWrapperRef);

  urlInfo.currentPage = 1;
  currentPage = 1;

  urlInfo.category = refs.inputRef.value.trim();
  if (urlInfo.category === '') {
    return Notiflix.Notify.failure('Please, enter something');
  }

  try {
    const valueQuery = await fetchPhotos(makeURL(urlInfo));

    if (valueQuery.hits.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    totalPage = Math.ceil(valueQuery.totalHits / 40);
    createMarkup(valueQuery, refs.galleryWrapperRef);
    currentPage += 1;
    slowlyScroll();
    lightbox.refresh();
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 400) {
      console.log('Error 400: ', error.response.data);
      Notiflix.Notify.failure('Invalid request. Please check your input.');
    } else {
      Notiflix.Notify.failure('An error occurred. Please try again later.');
    }
  }
}

async function onScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (
    scrollTop + clientHeight >= scrollHeight &&
    !isLoading &&
    currentPage <= totalPage
  ) {
    showLoader();
    isLoading = true;

    try {
      const valueQuery = await fetchPhotos(makeURL(urlInfo));

      if (valueQuery.hits.length > 0) {
        createMarkup(valueQuery, refs.galleryWrapperRef);
        currentPage += 1;
        slowlyScroll();
        lightbox.refresh();
      } else {
        removeEventListener('scroll', onScroll);
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        console.log('Error 400: ', error.response.data);
        Notiflix.Notify.failure('Invalid request. Please check your input.');
      } else {
        Notiflix.Notify.failure('An error occurred. Please try again later.');
      }
    } finally {
      hideLoader();
      isLoading = false;
    }
  }
}
