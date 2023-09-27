import { refs } from './refs';

export const hideLoader = () => {
  refs.loaderRef.classList.add('visually-hidden');
};

export const showLoader = () => {
  refs.loaderRef.classList.remove('visually-hidden');
};
