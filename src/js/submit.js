import lightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { refs } from './refs';
import { updatePage } from './update-page';
import { fetchPhotos } from './axios';

let totalPage;

export async function handleSubmit(e) {
  e.preventDefault();
  updatePage(e, refs.galleryWrapperRef);

  urlInfo.currentPage = 1;

  urlInfo.category = refs.inputRef.value.trim();
  if (urlInfo.category === '')
    return Notiflix.Notify.failure('Please, enter something');
  const url = makeURL(urlInfo);
  try {
    const valueQuery = await fetchPhotos(url);

    if (valueQuery.hits.length === 0)
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    Notiflix.Notify.success(`Hooray! We found ${valueQuery.totalHits} images.`);

    totalPage = Math.ceil(valueQuery.totalHits / 40);

    createMarkup(valueQuery, refs.galleryWrapperRef);
    urlInfo.currentPage += 1;
    slowlyScroll();
    lightbox.refresh();

    refs.formRef.reset();
  } catch (error) {
    console.log(error);
  }
}
