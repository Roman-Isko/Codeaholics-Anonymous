import { refs } from './refs.js';
import { getArtistByID } from './sound-wave-api.js';

export async function fetchArtistData(id) {
  try {
    showLoader();

    const res = await getArtistByID(id);
    createModalArtist(res);
  } catch (error) {
    console.error('Error fetching artist data:', error);
  } finally {
    hideLoader();
  }
}

function addModalCloseListeners() {
  refs.btnCloseModalArtist.addEventListener('click', closeModal);
  refs.modalOverlayArtist.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscPress);
}

function removeModalCloseListeners() {
  refs.btnCloseModalArtist.removeEventListener('click', closeModal);
  refs.modalOverlayArtist.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscPress);
}

function onOverlayClick(e) {
  if (e.target === refs.modalOverlayArtist) {
    closeModal();
  }
}

function onEscPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  refs.modalOverlayArtist.classList.remove('is-open-modal-artist');
  document.body.classList.remove('body-no-scroll');
  refs.modalArtist.querySelector('.container-modal-artist')?.remove();
  removeModalCloseListeners();
}

function showLoader() {
  refs.loader.classList.add('loader');
}

function hideLoader() {
  refs.loader.classList.remove('loader');
}

function createModalArtist(res) {
  const markup = renderArtist(res.data);
  refs.modalArtist.insertAdjacentHTML('beforeend', markup);

  refs.modalOverlayArtist.classList.add('is-open-modal-artist');
  document.body.classList.add('body-no-scroll');

  addModalCloseListeners();
}

function renderArtist({
  strArtist,
  strArtistThumb,
  intFormedYear,
  intDiedYear,
  strGender,
  intMembers,
  strCountry,
  strBiographyEN,
  tracksList,
  genres,
}) {
  const formatDuration = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const albums = {};
  tracksList.forEach(track => {
    if (!albums[track.strAlbum]) {
      albums[track.strAlbum] = [];
    }
    albums[track.strAlbum].push(track);
  });

  const formatActiveYears = (formedYear, diedYear) => {
    if (!formedYear && !diedYear) return 'information missing';
    if (!diedYear) return `${formedYear}–present`;
    return `${formedYear}–${diedYear}`;
  };

  const albumsHTML = Object.entries(albums)
    .map(([albumName, tracks]) => {
      const tracksHTML = tracks
        .map(track => {
          let movieUrl = track.movie;
          if (movieUrl && !movieUrl.startsWith('http')) {
            movieUrl = `https://${movieUrl.replace(/^\/\//, '')}`;
          }

          return `
            <li class="item-track-modal-artist">
              <p class="name-track-modal-artist">${track.strTrack}</p>
              <p class="time-track-modal-artist">${formatDuration(
                track.intDuration
              )}</p>
              ${
                movieUrl
                  ? `<a class="link-track-modal-artist" href="${movieUrl}" target="_blank" rel="noopener noreferrer">
                      <svg class="icon-track-modal-artist" width="24" height="24">
                        <use href="icon/symbol-defs.svg#icon-Youtube"></use>
                      </svg>
                    </a>`
                  : '<div class="link-track-modal-artist"></div>'
              }
            </li>
          `;
        })
        .join('');

      return `
        <div class="cont-albums-modal-artist">
          <h4 class="name-album-modal-artist">${albumName}</h4>
          <div class="cont-track-time-link">
            <p class="track-album-modal-artist">Track</p>
            <p class="time-album-modal-artist">Time</p>
            <p class="link-album-modal-artist">Link</p>
          </div>
          <ul class="list-track-modal-artist">
            ${tracksHTML}
          </ul>
        </div>
      `;
    })
    .join('');

  return `
    <div class="container-modal-artist">
      <h2 class="title-modal-artist">${strArtist}</h2>
      <div class="cont-image-text-modal">
        <div class="image-wrapper">
          <img class="image-modal-artist" src="${strArtistThumb}" alt="photo ${strArtist}" />
        </div>
        <div class="info-about-artist">
          <div class="list-info-modal-artist">
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Years active</h4>
                <p class="text-info-modal-artist">${formatActiveYears(
                  intFormedYear,
                  intDiedYear
                )}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Sex</h4>
                <p class="text-info-modal-artist">${strGender}</p>
              </div>
            </div>
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Members</h4>
                <p class="text-info-modal-artist">${intMembers}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Country</h4>
                <p>${strCountry}</p>
              </div>
            </div>
            <div class="item-info-modal-artist biography-info-modal-artist">
              <h4 class="title-info-modal-artist">Biography</h4>
              <input type="checkbox" id="expand-bio" hidden>
              <p class="text-info-modal-artist expandable-text">${strBiographyEN}</p>
              <label for="expand-bio" class="expand-btn">▼ Show more</label>
            </div>
          </div>
          <ul class="list-genres-modal-artist">
            ${genres
              .map(
                genre => `<li class="item-genres-modal-artist">${genre}</li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
      <h3 class="albums-modal-artist">Albums</h3>
      <div class="conts-albums-modal-artist">${albumsHTML}</div>
    </div>
  `;
}
