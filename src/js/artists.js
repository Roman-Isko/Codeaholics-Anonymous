import axios from 'axios';

export async function fetchArtists(page = 1, limit = 8) {
  const url = `https://sound-wave.b.goit.study/api/artists?page=${page}&limit=${limit}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Помилка отримання артистів:', error);
    return null;
  }
}
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
  const genresMarkup = artist.genres
    .map(genre => `<span class="genre">${genre}</span>`)
    .join(', ');
  const shortBio =
    artist.strBiographyEN.length > 200
      ? artist.strBiographyEN.slice(0, 200) + '...'
      : artist.strBiographyEN;

  return `
        < class="artist-card">
            <img src="${artist.strArtistThumb}" alt="${
    artist.strArtist
  }" class="artist-image" />
            <h3 class="artist-name">${artist.strArtist}</h3>
            <p class="artist-genre">${artist.genres.join(', ')}</p>
            <p class="artist-bio" data-full="${
              artist.strBiographyEN
            }">${shortBio}</p>
          <div class="btn-wrapper"><button class="lea">Learn More</button>
        <svg class="icon" width="16" height="16">
            <use xlink:href="../public/icon/symbol-defs.svg#icon-arrow-caret-right"></use>
        </svg></div>
        </li>
    `;
}
