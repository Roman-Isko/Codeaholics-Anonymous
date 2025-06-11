import { getArtistByID } from './sound-wave-api.js';

const loader = document.querySelector('.show-loader');
const btnCloseModalArtist = document.querySelector('.btn-close-modal-artist');
const modalArtist = document.querySelector('.modal-artist');
const modalOverlayArtist = document.querySelector('.modal-overlay-artist');

async function fetchArtistData() {
  try {
    showLoader();
    // const res = await getArtistByID('65ada69eaf9f6d155db48612');
    // const res = await getArtistByID('65ada54daf9f6d155db47e29');
    // const res = await getArtistByID('65ada5b8af9f6d155db4806b');
    // const res = await getArtistByID('65ada6e9af9f6d155db48765');
    const res = await getArtistByID('65adaafaaf9f6d155db4a11b');
    // const res = await getArtistByID('65adaaecaf9f6d155db4a0e5');

    console.log(res.data);
    createModalArtist(res);
  } catch (error) {
    console.error('Error fetching artist data:', error);
  } finally {
    hideLoader();
  }
}

fetchArtistData();
setupModalClose();

function setupModalClose() {
  btnCloseModalArtist.addEventListener('click', closeModal);

  modalOverlayArtist.addEventListener('click', e => {
    if (e.target === modalOverlayArtist) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function closeModal() {
  modalOverlayArtist.classList.remove('is-open-modal-artist');
  document.body.classList.remove('body-no-scroll');
  modalArtist.querySelector('.container-modal-artist')?.remove();
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

  const albumsHTML = Object.entries(albums)
    .map(([albumName, tracks]) => {
      const tracksHTML = tracks
        .map(
          track => `
      <li class="item-track-modal-artist">
        <p class="name-track-modal-artist">${track.strTrack}</p>
        <p class="time-track-modal-artist">${formatDuration(
          track.intDuration
        )}</p>
        ${
          track.movie
            ? `
          <a class="link-track-modal-artist" href="${track.movie}" target="_blank">
            <svg class="icon-track-modal-artist" width="24" height="24">
              <use href="../img/symbol-defs.svg#icon-Youtube"></use>
            </svg>
          </a>
        `
            : '<div class="link-track-modal-artist"></div>'
        }
      </li>
    `
        )
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

  return `<div class="container-modal-artist">
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
            <p class="text-info-modal-artist">${intFormedYear}–${
    intDiedYear || 'present'
  }</p>
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
        <li class="item-genres-modal-artist">Alternative</li>
        <li class="item-genres-modal-artist">Pop</li>
        <li class="item-genres-modal-artist">Rock</li>
        <li class="item-genres-modal-artist">Indie</li>
      </ul>
    </div>
  </div>
  <h3 class="albums-modal-artist">Albums</h3>
  <div class="conts-albums-modal-artist">
    ${albumsHTML}
  </div>
</div>`;
}

function createModalArtist(res) {
  const markup = renderArtist(res.data);
  modalArtist.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  modalOverlayArtist.classList.add('is-open-modal-artist');
  document.body.classList.add('body-no-scroll');
  loader.classList.add('loader');
}

function hideLoader() {
  loader.classList.remove('loader');
}
