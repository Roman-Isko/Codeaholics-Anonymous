import{a as I,S as R}from"./assets/vendor-DCTTPbN7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const $=I.create({baseURL:"https://sound-wave.b.goit.study/api"});async function W(t={}){try{return await $.get("/artists",{params:t})}catch(e){throw console.error("Помилка при отриманні списку артистів:",e),e}}async function G(t){try{return await $.get(`/artists/${t}`)}catch(e){throw console.error(`Помилка при отриманні актора з ID ${t}:`,e),e}}async function U(){try{return await $.get("/feedbacks")}catch(t){throw console.error("Помилка при отриманні відгуків:",t),t}}const A=document.querySelector(".burger-icon"),M=document.querySelector(".burger-icon-x"),y=document.querySelector(".header-nav-list"),k=document.body;document.querySelector(".burger-svg");A.addEventListener("click",E);M.addEventListener("click",E);y.addEventListener("click",t=>{t.target.nodeName==="A"&&(y.classList.remove("active"),M.classList.remove("active"),A.classList.remove("active"),k.classList.remove("lock"))});function E(){y.classList.toggle("active"),A.classList.toggle("active"),M.classList.toggle("active"),y.classList.contains("active")?k.classList.add("lock"):k.classList.remove("lock")}const K=document.querySelector(".swiper-wrapper");function X(t){const e=Math.round(t);let a="";for(let o=0;o<5;o++)o<e?a+='<span class="star-icon filled"> ★ </span>':a+='<span class="star-icon empty"> ★ </span>';return a}async function _(){const o=(await U()).data.data.slice(0,10).map(s=>{let i=s.rating;return`
 <div class="swiper-slide">
<div class="feedback-card">
<div class="feedback-rating-display"> ${X(i)} </div>
 <p class="feedback-text">"${s.descr}"</p>
 <p class="feedback-author">${s.name}</p>
 </div>
</div>
`}).join("");K.innerHTML=o,c.update()}const c=new R(".swiper",{initialSlide:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),z=document.querySelector(".custom-swiper-btn-next"),J=document.querySelector(".custom-swiper-btn-prev");z.addEventListener("click",()=>{c.slideNext()});J.addEventListener("click",()=>{c.slidePrev()});_();const v=document.querySelector(".dot.first"),f=document.querySelector(".dot.current"),p=document.querySelector(".dot.last");c.on("slideChange",()=>{const t=c.realIndex,e=c.slides.length-c.loopedSlides*2;v.classList.remove("active"),f.classList.remove("active"),p.classList.remove("active"),t===0?v.classList.add("active"):t===e-1?p.classList.add("active"):f.classList.add("active")});v.addEventListener("click",()=>{c.slideTo(0),S(0)});p.addEventListener("click",()=>{const t=c.slides.length;c.slideTo(t-1),S(t-1)});f.addEventListener("click",()=>{const t=c.slides.length,e=Math.floor((t-1)/2);c.slideTo(e),S(e)});function S(t){v.classList.remove("active"),f.classList.remove("active"),p.classList.remove("active"),t===0?v.classList.add("active"):t===c.slides.length-1?p.classList.add("active"):f.classList.add("active")}const r={btnCloseModalArtist:document.querySelector(".btn-close-modal-artist"),elemListCards:document.querySelector(".artists-card-list"),loader:document.querySelector(".show-loader"),loaderListArtists:document.querySelector(".artists-show-loader"),loadMoreBtn:document.querySelector(".btn-load-more"),modalArtist:document.querySelector(".modal-artist"),modalOverlayArtist:document.querySelector(".modal-overlay-artist")};async function Q(t){try{Y();const e=await G(t);et(e)}catch(e){console.error("Error fetching artist data:",e)}finally{tt()}}function V(){r.btnCloseModalArtist.addEventListener("click",g),r.modalOverlayArtist.addEventListener("click",x),document.addEventListener("keydown",q)}function Z(){r.btnCloseModalArtist.removeEventListener("click",g),r.modalOverlayArtist.removeEventListener("click",x),document.removeEventListener("keydown",q)}function x(t){t.target===r.modalOverlayArtist&&g()}function q(t){t.key==="Escape"&&g()}function g(){var t;r.modalOverlayArtist.classList.remove("is-open-modal-artist"),document.body.classList.remove("body-no-scroll"),(t=r.modalArtist.querySelector(".container-modal-artist"))==null||t.remove(),Z()}function Y(){r.loader.classList.add("loader")}function tt(){r.loader.classList.remove("loader")}function et(t){const e=st(t.data);r.modalArtist.insertAdjacentHTML("beforeend",e),r.modalOverlayArtist.classList.add("is-open-modal-artist"),document.body.classList.add("body-no-scroll"),V()}function st({strArtist:t,strArtistThumb:e,intFormedYear:a,intDiedYear:o,strGender:s,intMembers:i,strCountry:m,strBiographyEN:j,tracksList:P,genres:D}){const H=n=>{const l=Math.floor(n/1e3),b=Math.floor(l/60),d=l%60;return`${b}:${d<10?"0":""}${d}`},h={};P.forEach(n=>{h[n.strAlbum]||(h[n.strAlbum]=[]),h[n.strAlbum].push(n)});const N=(n,l)=>!n&&!l?"information missing":l?`${n}–${l}`:`${n}–present`,F=Object.entries(h).map(([n,l])=>{const b=l.map(d=>{let u=d.movie;return u&&!u.startsWith("http")&&(u=`https://${u.replace(/^\/\//,"")}`),`
            <li class="item-track-modal-artist">
              <p class="name-track-modal-artist">${d.strTrack}</p>
              <p class="time-track-modal-artist">${H(d.intDuration)}</p>
              ${u?`<a class="link-track-modal-artist" href="${u}" target="_blank" rel="noopener noreferrer">
                      <svg class="icon-track-modal-artist" width="24" height="24">
                        <use href="icon/symbol-defs.svg#icon-Youtube"></use>
                      </svg>
                    </a>`:'<div class="link-track-modal-artist"></div>'}
            </li>
          `}).join("");return`
        <div class="cont-albums-modal-artist">
          <h4 class="name-album-modal-artist">${n}</h4>
          <div class="cont-track-time-link">
            <p class="track-album-modal-artist">Track</p>
            <p class="time-album-modal-artist">Time</p>
            <p class="link-album-modal-artist">Link</p>
          </div>
          <ul class="list-track-modal-artist">
            ${b}
          </ul>
        </div>
      `}).join("");return`
    <div class="container-modal-artist">
      <h2 class="title-modal-artist">${t}</h2>
      <div class="cont-image-text-modal">
        <div class="image-wrapper">
          <img class="image-modal-artist" src="${e}" alt="photo ${t}" />
        </div>
        <div class="info-about-artist">
          <div class="list-info-modal-artist">
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Years active</h4>
                <p class="text-info-modal-artist">${N(a,o)}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Sex</h4>
                <p class="text-info-modal-artist">${s}</p>
              </div>
            </div>
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Members</h4>
                <p class="text-info-modal-artist">${i}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Country</h4>
                <p>${m}</p>
              </div>
            </div>
            <div class="item-info-modal-artist biography-info-modal-artist">
              <h4 class="title-info-modal-artist">Biography</h4>
              <input type="checkbox" id="expand-bio" hidden>
              <p class="text-info-modal-artist expandable-text">${j}</p>
              <label for="expand-bio" class="expand-btn">▼ Show more</label>
            </div>
          </div>
          <ul class="list-genres-modal-artist">
            ${D.map(n=>`<li class="item-genres-modal-artist">${n}</li>`).join("")}
          </ul>
        </div>
      </div>
      <h3 class="albums-modal-artist">Albums</h3>
      <div class="conts-albums-modal-artist">${F}</div>
    </div>
  `}async function B(t,e){try{return ot(),(await W({limit:t,page:e})).data}catch(a){console.error("Error fetching artists data:",a)}finally{nt()}}function at({_id:t,strArtist:e,strBiographyEN:a,strArtistThumb:o,genres:s}){return`<li class="artists-card-item">
          <img class="artists-image"
            src=${o}
            alt="artist photo ${e}" />
          <div class="artists-info">
            <ul class="artists-genre-list">
            ${rt(s)}
            </ul>
            <p class="artists-name">${e}</p>
            <p class="artists-bio">${a}</p>
            <button type="button" class="learn-more-btn" data-id="${t}">Learn More
              <svg class="learn-more-icon" width="24" height="24">
                <use href="icon/symbol-defs.svg#icon-arrow-caret-right"></use>
              </svg>
            </button>
          </div>
        </li>`}function rt(t){return t.map(e=>`<li class="artists-genre-item">${e}</li>`).join("")}function it(t){return t.map(at).join("")}function C(t){const e=it(t);r.elemListCards.insertAdjacentHTML("beforeend",e)}function ot(){r.loaderListArtists.classList.add("loader")}function nt(){r.loaderListArtists.classList.remove("loader")}function ct(){r.loadMoreBtn.classList.remove("btn-load-more-hidden")}function lt(){r.loadMoreBtn.classList.add("btn-load-more-hidden")}let w=8,L=1,O;dt();r.loadMoreBtn.addEventListener("click",ut);async function dt(){try{const{artists:t,totalArtists:e}=await B(w,L);O=Math.ceil(e/w),C(t)}catch(t){console.error("Error loading artists data:",t)}finally{T()}}async function ut(){L++;try{const{artists:t,totalArtists:e}=await B(w,L);C(t);const a=document.querySelector(".artists-card-item"),{height:o}=a.getBoundingClientRect();window.scrollBy({top:o,behavior:"smooth"})}catch(t){console.error("Error loading artists data:",t)}finally{T()}}function T(){L<O?ct():lt()}r.elemListCards.addEventListener("click",mt);async function mt(t){const e=t.target;if(!e.closest("[data-id]"))return;const{id:a}=e.closest("[data-id]").dataset;a&&await Q(a)}
//# sourceMappingURL=index.js.map
