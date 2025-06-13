import 'normalize.css';
import './js/sound-wave-api.js'
import './js/menu.js'
import './js/feedback.js'

import { fetchArtists } from './js/artists.js';
import { createArtistCard } from './js/artists.js';
import { refs, fetchArtistData } from './js/modal.js';



const artistsList = document.querySelector('.list-cards');
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;
const limit = 8;

async function loadArtists(page = 1, limit = 8) {
  try {
    const data = await fetchArtists(page, limit);

    if (!data || !data.artists || !Array.isArray(data.artists)) {
      throw new Error(
        'Невірний формат даних: artists відсутній або не є масивом'
      );
    }

    console.log(`Отримані артисти для сторінки ${page}:`, data.artists);
    renderArtists(data.artists);
  } catch (error) {
    console.error('Помилка при завантаженні артистів:', error.message);
  }
}

function renderArtists(artists) {
  artistsList.innerHTML = '';
  const markup = artists.map(createArtistCard).join('');
  artistsList.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  console.log(`Завантажуємо сторінку: ${currentPage}`);
  loadArtists(currentPage, limit);
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('learn-more')) {
    const bioElement = event.target.previousElementSibling;
    const fullBio = bioElement.dataset.full;
    if (!fullBio) return;
    if (bioElement.classList.contains('expanded')) {
      bioElement.innerHTML = fullBio.slice(0, 200) + '...';
      event.target.textContent = 'Learn More';
    } else {
      bioElement.innerHTML = fullBio;
      event.target.textContent = 'Show Less';
    }

    bioElement.classList.toggle('expanded');
  }
});

loadArtists();

refs.elemListCards.addEventListener('click', openModalArtist);

async function openModalArtist(event) {
  const target = event.target;
  if (!target.closest('[data-id]')) return;

  const { id } = target.closest('[data-id]').dataset;
  if (!id) return;

  await fetchArtistData(id);
}
