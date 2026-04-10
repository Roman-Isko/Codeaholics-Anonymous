
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';


import 'css-star-rating/css/star-rating.min.css';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';


import { getFeedbacks } from './sound-wave-api.js';


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
  if (!swiperWrapper) return;

  try {
    const response = await getFeedbacks();
    const data = response?.data;
    const info = data?.data;
    if (!Array.isArray(info)) return;

    const markup = info
      .map(item => {
        const rating = item.rating;
        return `
 <div class="swiper-slide">
<div class="feedback-card">
<div class="feedback-rating-display"> ${renderStarsSimple(rating)} </div>
 <p class="feedback-text">"${item.descr}"</p>
 <p class="feedback-author">${item.name}</p>
 </div>
</div>
`;
      })
      .join('');

    swiperWrapper.innerHTML = markup;
    swiper.update();
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error);
  }

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

if (customNextBtn) {
  customNextBtn.addEventListener('click', () => {
    swiper.slideNext();
  });
}

if (customPrevBtn) {
  customPrevBtn.addEventListener('click', () => {
    swiper.slidePrev();
  });
}


renderFeedback();
const dotFirst = document.querySelector('.dot.first');
const dotCurrent = document.querySelector('.dot.current');
const dotLast = document.querySelector('.dot.last');

swiper.on('slideChange', () => {
if (!dotFirst || !dotCurrent || !dotLast) return;
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
