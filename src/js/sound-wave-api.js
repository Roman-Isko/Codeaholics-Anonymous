// alert('api')
// import axios from 'axios';

// const BASE_URL = 'https://sound-wave.b.goit.study/api';

// async function getArtists() {
//   try {
//     const response = await axios.get(`${BASE_URL}/artists`);
//     console.log('Список артистів:', response.data);
//   } catch (error) {
//     console.error('Помилка при отриманні артистів:', error);
//   }
// }

// getArtists();

import axios from 'axios';
const soundWaveApi = axios.create({
  baseURL: 'https://sound-wave.b.goit.study/api',
});
export async function getArtists() {
  try {
    return await soundWaveApi.get('/artists');
  } catch (error) {
    console.error('Помилка при отриманні списку артистів:', error);
    throw error;
  }
}
export async function getArtistByID(id) {
  try {
    return await soundWaveApi.get(`/artists/${id}`);
  } catch (error) {
    console.error(`Помилка при отриманні актора з ID ${id}:`, error);
    throw error;
  }
}
export async function getFeedbacks() {
  try {
    return await soundWaveApi.get('/feedbacks');
  } catch (error) {
    console.error('Помилка при отриманні відгуків:', error);
    throw error;
  }
}

