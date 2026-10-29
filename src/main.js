import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { PER_PAGE, getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideEndMessage,
  hideLoadMoreButton,
  hideLoader,
  showEndMessage,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let requestId = 0;
let isLoading = false;

const toastOptions = {
  position: 'topRight',
  backgroundColor: '#ef4040',
  messageColor: '#ffffff',
  titleColor: '#ffffff',
  iconColor: '#ffffff',
  progressBar: false,
  close: true,
  timeout: 4000,
  maxWidth: 432,
};

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(event) {
  event.preventDefault();

  const nextQuery = event.currentTarget.elements['search-text'].value.trim();

  if (nextQuery === '') {
    iziToast.error({
      ...toastOptions,
      message: 'Please enter a search query!',
    });
    return;
  }

  query = nextQuery;
  page = 1;
  const currentRequest = ++requestId;

  clearGallery();
  hideLoadMoreButton();
  hideEndMessage();
  showLoader();
  isLoading = true;

  try {
    const data = await getImagesByQuery(query, page);

    if (currentRequest !== requestId) {
      return;
    }

    if (data.hits.length === 0) {
      iziToast.error({
        ...toastOptions,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    updatePagination(data.totalHits);
  } catch {
    if (currentRequest !== requestId) {
      return;
    }

    iziToast.error({
      ...toastOptions,
      message: 'Something went wrong. Please try again later!',
    });
  } finally {
    if (currentRequest === requestId) {
      isLoading = false;
      hideLoader();
    }
  }
}

async function onLoadMore() {
  if (isLoading || query === '') {
    return;
  }

  isLoading = true;
  page += 1;
  const currentRequest = requestId;

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (currentRequest !== requestId) {
      return;
    }

    createGallery(data.hits);
    updatePagination(data.totalHits);
    hideLoader();
    scrollGallery();
  } catch {
    if (currentRequest !== requestId) {
      return;
    }

    page -= 1;
    iziToast.error({
      ...toastOptions,
      message: 'Something went wrong. Please try again later!',
    });
  } finally {
    if (currentRequest === requestId) {
      isLoading = false;
      hideLoader();
    }
  }
}

function updatePagination(totalHits) {
  const reachedEnd = page * PER_PAGE >= totalHits;

  if (reachedEnd) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  hideEndMessage();
  showLoadMoreButton();
}

function scrollGallery() {
  const card = document.querySelector('.gallery-item');

  if (!card) {
    return;
  }

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
