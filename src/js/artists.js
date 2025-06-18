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

function artistTemplate({
  _id,
  strArtist,
  strBiographyEN,
  strArtistThumb,
  genres,
}) {
  return `<li class="artists-card-item">
          <img class="artists-image"
            src=${strArtistThumb}
            alt="artist photo ${strArtist}" />
          <div class="artists-info">
            <ul class="artists-genre-list">
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

function artistsTemplate(artists) {
  return artists.map(artistTemplate).join('');
}

export function createGallery(artists) {
  const markup = artistsTemplate(artists);
  refs.elemListCards.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  refs.loaderListArtists.classList.add('loader');
}

function hideLoader() {
  refs.loaderListArtists.classList.remove('loader');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('btn-load-more-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('btn-load-more-hidden');
}
