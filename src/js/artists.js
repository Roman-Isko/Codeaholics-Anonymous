import { refs } from './refs.js';
import { getArtists } from './sound-wave-api.js';

export async function fetchArtistsData(limit, page) {
  try {
    showLoader();
    const response = await getArtists({
      limit,
      page,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching artists data:', error);
  } finally {
    hideLoader();
  }
}

function artistTamplate({
  _id,
  strArtist,
  strBiographyEN,
  strArtistThumb,
  genres,
}) {
  return `<li class="artists-card-item">
          <img class="artists-image"
            src=${strArtistThumb} />
          </a>
          <div class="artists-info">
            <ul class="aritists-genre-list">
            ${renderGenres(genres)}
            </ul>
            <p class="artists-name">${strArtist}</p>
            <p class="artists-bio">${strBiographyEN}</p>
            <button type="button" class="learn-more-btn" data-id="${_id}">Learn More
              <svg class="learn-more-icon" width="24" height="24">
                <use href="icon/symbol-defs.svg#icon-arrow-caret-right"></use>
              </svg>
            </button>
          </div>
        </li>`;
}

function renderGenres(genres) {
  return genres
    .map(genre => `<li class="artists-genre-item">${genre}</li>`)
    .join('');
}

function artistsTamplate(artists) {
  return artists.map(artistTamplate).join('');
}

export function createGallery(artists) {
  const markup = artistsTamplate(artists);
  refs.elemListCards.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  refs.loaderListArtists.classList.add('loader');
}

function hideLoader() {
  refs.loaderListArtists.classList.remove('loader');
}

export function showLoadMoreButton() {
  console.log('showLoadMoreButton');
  refs.loadMoreBtn.classList.remove('btn-load-more-hidden');
}

export function hideLoadMoreButton() {
  console.log('hideLoadMoreButton');
  console.log(refs.loadMoreBtn);
  
  refs.loadMoreBtn.classList.add('btn-load-more-hidden');
}
