import 'css-star-rating/css/star-rating.min.css';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';


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


const customNextBtn = document.querySelector('.custom-swiper-btn-next');
const customPrevBtn = document.querySelector('.custom-swiper-btn-prev');

customNextBtn.addEventListener('click', () => {
  swiper.slideNext();
});

customPrevBtn.addEventListener('click', () => {
  swiper.slidePrev();
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
dotFirst.addEventListener('click', () => {
  swiper.slideTo(0); // Первый слайд
  updateDotsActive(0);
});

dotLast.addEventListener('click', () => {
  const total = swiper.slides.length;
  swiper.slideTo(total - 1); // Последний слайд
  updateDotsActive(total - 1);
});

dotCurrent.addEventListener('click', () => {
  const total = swiper.slides.length;
  const mid = Math.floor((total - 1) / 2); // Средний слайд
  swiper.slideTo(mid);
  updateDotsActive(mid);
});
function updateDotsActive(index) {
  dotFirst.classList.remove('active');
  dotCurrent.classList.remove('active');
  dotLast.classList.remove('active');

  if (index === 0) {
    dotFirst.classList.add('active');
  } else if (index === swiper.slides.length - 1) {
    dotLast.classList.add('active');
  } else {
    dotCurrent.classList.add('active');
  }
}
