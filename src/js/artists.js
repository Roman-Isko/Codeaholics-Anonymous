// alert('artists')
import './js/artists.js';
import { fetchArtists } from './js/api.js';
import { createArtistCard } from './js/render.js';
import './css/styles.css';

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

    console.log(`Отримані артисти для сторінки ${page}`, data.artists);
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
export function createArtistCard(artist) {
  if (
    !artist ||
    !artist.strArtistThumb ||
    !artist.strArtist || 
    !artist.genres ||
    !artist.strBiographyEN 
  ) {
    return '';
  }

  const shortBio =
    artist.strBiographyEN.length > 200
      ? artist.strBiographyEN.slice(0, 200) + '...'
      : artist.strBiographyEN;

  return `
        <li class="artist-card">
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}"
             class="artist-image"
   data-id="${artist._id}" />
            <h3 class="artist-name">${artist.strArtist}</h3>
            <p class="artist-genre">${artist.genres.join(', ')}</p>
            <p class="artist-bio" data-full="${
              artist.strBiographyEN
            }">${shortBio}</p>
            <button class="learn-more">Learn More</button>
        </li>
    `;
}