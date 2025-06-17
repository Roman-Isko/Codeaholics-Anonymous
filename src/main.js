// import 'normalize.css';
import './js/sound-wave-api.js';
import './js/menu.js';
import './js/feedback.js';

import { refs } from './js/refs.js';
import { fetchArtistData } from './js/modal.js';
import {
  fetchArtistsData,
  createGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/artists.js';

let limit = 8;
let page = 1;
let maxPage;

createArtistsList();
refs.loadMoreBtn.addEventListener('click', loadMore);

export async function createArtistsList() {
  try {
    const { artists, totalArtists } = await fetchArtistsData(limit, page);
    console.log('Артисты:', artists);
    console.log('Всего артистов:', totalArtists);

    maxPage = Math.ceil(totalArtists / limit);
    console.log('maxPage =', maxPage);

    createGallery(artists);
  } catch (error) {
    console.error('Error loading artists data:', error);
  } finally {
    updateLoadMoreButton();
  }
}

async function loadMore() {
  page++;
  console.log('page =', page);

  try {
    const { artists, totalArtists } = await fetchArtistsData(limit, page);
    console.log('+Артисты+:', artists);
    console.log('Всего артистов:', totalArtists);
    createGallery(artists);
    const elemArtistsCard = document.querySelector('.artists-card-item');
    const { height: cardHeight } = elemArtistsCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading artists data:', error);
  } finally {
    updateLoadMoreButton();
  }
}

function updateLoadMoreButton() {
  if (page < maxPage) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
}

refs.elemListCards.addEventListener('click', openModalArtist);

async function openModalArtist(event) {
  const target = event.target;
  if (!target.closest('[data-id]')) return;

  const { id } = target.closest('[data-id]').dataset;
  if (!id) return;

  await fetchArtistData(id);
}
