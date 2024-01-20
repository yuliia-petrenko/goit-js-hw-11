import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41930626-f2ac102ea6260ef01eb19ab27';

const searchForm = document.querySelector('.img-form');
const inputForm = document.querySelector('.img-inp');
const btnForm = document.querySelector('.img-btn');
const loaderForm = document.querySelector('.loader');
const galleryForm = document.querySelector('.gallery');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchForm.query.value.trim();

  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  function fetchImages(url) {
    showLoader(true);
    return fetch(url).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.ststusText);
      }
      return resp.json();
    });
  }

  fetchImages(url)
    .then(data => {
      if (data.hits.length === 0) {
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        showLoader(false);
      }
      galleryForm.innerHTML = createMarkup(data.hits);
      showLoader(false);
      let simplyGallery = new SimpleLightbox('.gallery-item a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      searchForm.reset();
    })
    .catch(error => console.error(error));
});

function createMessage(message) {
  iziToast.show({
    class: 'error-svg',
    icon: 'error-svg',
    position: 'topRight',
    message: message,
    maxWidth: '350',
    messageColor: '#FAFAFB',
    messageSize: '16px',
    backgroundColor: '#EF4040',
    close: false,
    closeOnClick: true,
  });
}
function createMarkup(value) {
  return value
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
    <p class="gallery-item">Likes: ${likes} Views: ${views} Comments: ${comments} Downloads: ${downloads}</p>
  </a>
</li>`;
      }
    )
    .join('');
}

function showLoader(state = true) {
  loaderForm.style.display = !state ? 'none' : 'inline-block';
  btnForm.disabled = state;
}
