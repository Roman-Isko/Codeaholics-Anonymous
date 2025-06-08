import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api';

async function getArtists() {
  try {
    const response = await axios.get(`${BASE_URL}/artists`);
    console.log('Список артистів:', response.data);
  } catch (error) {
    console.error('Помилка при отриманні артистів:', error);
  }
}

getArtists();
