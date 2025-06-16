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

export async function foo_artists_main() {
  let limit = 8;
  let page = 1;
  let maxPage;

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

  async function loadMore() {
    page++;
    console.log('page =', page);
    fetchArtistsData(limit, page);
  }
}
