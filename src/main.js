import './js/sound-wave-api.js'
import './js/render-functions.js'
import './js/menu.js'
import './js/modal.js'
import './js/artists.js'

import './js/feedback.js'



import { fetchArtists } from './js/api.js';
import { createArtistCard } from './js/render.js';
import './css/styles.css';

const artistsList = document.querySelector('.artists-list');

async function loadArtists(page = 1, limit = 12) {
  try {
    const data = await fetchArtists(page, limit);

    const { artists } = data;

    if (!Array.isArray(artists)) {
      throw new Error('Невірна структура даних: artists не є масивом');
    }

    renderArtists(artists);
  } catch (error) {
    console.error('Помилка при завантаженні артистів:', error.message);
  }
}

function renderArtists(artists) {
  artistsList.innerHTML = ''; // очищення перед рендером
  const markup = artists.map(createArtistCard).join('');
  artistsList.insertAdjacentHTML('beforeend', markup);
}

loadArtists();