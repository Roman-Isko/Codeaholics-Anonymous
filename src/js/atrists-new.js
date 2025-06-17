import { getArtists } from './sound-wave-api.js';

export async function fetchArtistsData(limit, page) {
  try {
    // showLoader();
    const response = await getArtists({
      limit,
      page,
    });
    return response.data;

  } catch (error) {
    console.error('Error fetching artists data:', error);

  } finally {
    // hideLoader();
  }
}

let limit = 8;
let page = 1;
let maxPage;

export async function createArtistsList() {
  
  const elemListArtists = document.querySelector('.list-cards'); //исправить поиск в новой редакции
  const loadMoreBtn = document.querySelector('#load-more'); //исправить поиск в новой редакции

  loadMoreBtn.addEventListener('click', loadMore);

  try {
    const { artists, totalArtists } = await fetchArtistsData(limit, page);
    console.log('Артисты:', artists);
    console.log('Всего артистов:', totalArtists);

    maxPage = Math.ceil(totalArtists / limit);
    console.log('maxPage =', maxPage);

    // createGallery(res.images);
  } catch (error) {
    console.error('Error loading artists data:', error);
  } finally {
    // lastPage();
    // searchInput.value = '';
    // updateLoadMoreButton();
  }
}


async function loadMore() {
  // showLoader();
  page++;
  console.log('page =', page);

  try {
    const { artists, totalArtists } = await fetchArtistsData(limit, page);
    console.log('+Артисты+:', artists);
    console.log('Всего артистов:', totalArtists);

    // const { height: cardHeight } = document
    //   .querySelector('.gallery-item')
    //   .getBoundingClientRect();

    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: 'smooth',
    // });
  } catch (error) {
    console.error('Error loading artists data:', error);
  } finally {
    // hideLoader();
    // lastPage();
    updateLoadMoreButton();
  }
}

function updateLoadMoreButton() {
  if (page < maxPage) {
    // showLoadMoreButton();
  } else {
    // hideLoadMoreButton();
  }
}
