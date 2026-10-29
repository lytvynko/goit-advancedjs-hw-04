import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${escapeHtml(tags)}"
          loading="lazy"
        />
      </a>
      <ul class="info">
        <li class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${likes}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${views}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${comments}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${downloads}</p>
        </li>
      </ul>
    </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-visible');
}

export function showEndMessage() {
  endMessage.classList.add('is-visible');
}

export function hideEndMessage() {
  endMessage.classList.remove('is-visible');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
