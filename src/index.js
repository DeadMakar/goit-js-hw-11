import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { updatePage } from './js/update-page';
import { fetchPhotos } from './js/axios';
import { makeURL, urlInfo } from './js/make-url';
import { createGalleryMarkup } from './js/markup-creator';
import { slowlyScroll } from './js/on-scroll';
import { showLoader, hideLoader } from './js/loader-status';

const lightbox = new SimpleLightbox('.gallery a');

refs.formRef.addEventListener('submit', handleSubmit);

addEventListener('scroll', onScroll);
