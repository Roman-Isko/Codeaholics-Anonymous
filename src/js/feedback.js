// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';

// import 'css-star-rating/css/star-rating.min.css';

// import { getFeedbacks } from './sound-wave-api';

// const swiperWrapper = document.querySelector('.swiper-wrapper');
// const dotFirst = document.querySelector('.dot.first');
// const dotCurrent = document.querySelector('.dot.current');
// const dotLast = document.querySelector('.dot.last');

// function renderStarsSimple(rating) {
//   const roundedRating = Math.round(rating);
//   let starsHtml = '';
//   for (let i = 0; i < 5; i++) {
//     starsHtml += `<span class="star-icon ${i < roundedRating ? 'filled' : 'empty'}">★</span>`;
//   }
//   return starsHtml;
// }

// function updateDots(swiper) {
//   const index = swiper.realIndex;
//   const totalSlides = swiper.slides.length - swiper.loopedSlides * 2;

//   dotFirst.classList.remove('active');
//   dotCurrent.classList.remove('active');
//   dotLast.classList.remove('active');

//   if (index === 0) {
//     dotFirst.classList.add('active');
//   } else if (index === totalSlides - 1) {
//     dotLast.classList.add('active');
//   } else {
//     dotCurrent.classList.add('active');
//   }
// }

// const swiper = new Swiper('.swiper', {
//   initialSlide: 0,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

// async function renderFeedback() {
//   try {
//     const response = await getFeedbacks();
//     const info = response.data.data;

//     const markup = info
//       .map(
//         item => `
//       <div class="swiper-slide">
//         <div class="feedback-card">
//           <div class="feedback-rating-display">${renderStarsSimple(item.rating)}</div>
//           <p class="feedback-text">"${item.descr}"</p>
//           <p class="feedback-author">${item.name}</p>
//         </div>
//       </div>`
//       )
//       .join('');

//     swiperWrapper.innerHTML = markup;
//     swiper.update();
//     updateDots(swiper);
//   } catch (error) {
//     console.error('Помилка завантаження відгуків:', error);
//   }
// }

// swiper.on('slideChange', () => updateDots(swiper));

// renderFeedback();




// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// Додай те, що реально використовуєш


import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import 'css-star-rating/css/star-rating.min.css';


import {getFeedbacks } from './sound-wave-api'


const swiperWrapper = document.querySelector(".swiper-wrapper");

function renderStarsSimple(rating) {
 const roundedRating = Math.round(rating);
let starsHtml = '';
for (let i = 0; i < 5; i++) {
if (i < roundedRating) {
starsHtml += '<span class="star-icon filled"> ★ </span>';
} else {
starsHtml += '<span class="star-icon empty"> ★ </span>';  
}
 }

 return starsHtml;

}

async function renderFeedback() {


const response = await getFeedbacks();
const data = response.data; 
const info = data.data;
 


const markup = info.map(item => {
 let rating = item.rating;




return `
 <div class="swiper-slide">
<div class="feedback-card">
<div class="feedback-rating-display"> ${renderStarsSimple(rating)} </div>
 <p class="feedback-text">"${item.descr}"</p>
 <p class="feedback-author">${item.name}</p>
 </div>
</div>
`;
 }).join('');

 swiperWrapper.innerHTML = markup;
 swiper.update();

}



const swiper = new Swiper('.swiper', {
 initialSlide: 0,
navigation: {
 nextEl: '.swiper-button-next',
 prevEl: '.swiper-button-prev',
 },

});



renderFeedback();
const dotFirst = document.querySelector('.dot.first');
const dotCurrent = document.querySelector('.dot.current');
const dotLast = document.querySelector('.dot.last');

swiper.on('slideChange', () => {
const index = swiper.realIndex;
const total = swiper.slides.length - swiper.loopedSlides * 2;
dotFirst.classList.remove('active');
dotCurrent.classList.remove('active');
dotLast.classList.remove('active');
if (index === 0) {
 dotFirst.classList.add('active');
 } else if (index === total - 1) {
 dotLast.classList.add('active');
 } else {

 dotCurrent.classList.add('active');

 }

});
