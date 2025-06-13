import{a as E,S as P}from"./assets/vendor-DCTTPbN7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const S=E.create({baseURL:"https://sound-wave.b.goit.study/api"});async function D(t){try{return await S.get(`/artists/${t}`)}catch(e){throw console.error(`Помилка при отриманні актора з ID ${t}:`,e),e}}async function I(){try{return await S.get("/feedbacks")}catch(t){throw console.error("Помилка при отриманні відгуків:",t),t}}const b=document.querySelector(".burger-icon"),L=document.querySelector(".burger-icon-x"),f=document.querySelector(".header-nav-list"),h=document.body;document.querySelector(".burger-svg");b.addEventListener("click",x);L.addEventListener("click",x);f.addEventListener("click",t=>{t.target.nodeName==="A"&&(f.classList.remove("active"),L.classList.remove("active"),b.classList.remove("active"),h.classList.remove("lock"))});function x(){f.classList.toggle("active"),b.classList.toggle("active"),L.classList.toggle("active"),f.classList.contains("active")?h.classList.add("lock"):h.classList.remove("lock")}const F=document.querySelector(".swiper-wrapper");function W(t){const e=Math.round(t);let s="";for(let o=0;o<5;o++)o<e?s+='<span class="star-icon filled"> ★ </span>':s+='<span class="star-icon empty"> ★ </span>';return s}async function R(){const o=(await I()).data.data.map(r=>{let a=r.rating;return`
 <div class="swiper-slide">
<div class="feedback-card">
<div class="feedback-rating-display"> ${W(a)} </div>
 <p class="feedback-text">"${r.descr}"</p>
 <p class="feedback-author">${r.name}</p>
 </div>
</div>
`}).join("");F.innerHTML=o,l.update()}const l=new P(".swiper",{initialSlide:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),U=document.querySelector(".custom-swiper-btn-next"),_=document.querySelector(".custom-swiper-btn-prev");U.addEventListener("click",()=>{l.slideNext()});_.addEventListener("click",()=>{l.slidePrev()});R();const $=document.querySelector(".dot.first"),k=document.querySelector(".dot.current"),A=document.querySelector(".dot.last");l.on("slideChange",()=>{const t=l.realIndex,e=l.slides.length-l.loopedSlides*2;$.classList.remove("active"),k.classList.remove("active"),A.classList.remove("active"),t===0?$.classList.add("active"):t===e-1?A.classList.add("active"):k.classList.add("active")});async function K(t=1,e=8){const s=`https://sound-wave.b.goit.study/api/artists?page=${t}&limit=${e}`;try{const{data:o}=await E.get(s);return o}catch(o){return console.error("Помилка отримання артистів:",o),null}}function X(t){if(!t||!t.strArtistThumb||!t.strArtist||!t.genres||!t.strBiographyEN)return"";const e=t.strBiographyEN.length>200?t.strBiographyEN.slice(0,200)+"...":t.strBiographyEN;return`
        <li class="artist-card">
            <img src="${t.strArtistThumb}" alt="${t.strArtist}" class="artist-image" />
            <h3 class="artist-name">${t.strArtist}</h3>
            <p class="artist-genre">${t.genres.join(", ")}</p>
            <p class="artist-bio" data-full="${t.strBiographyEN}">${e}</p>
            <button class="learn-more" data-id="${t._id}">Learn More</button>
        </li>
    `}const n={loader:document.querySelector(".show-loader"),btnCloseModalArtist:document.querySelector(".btn-close-modal-artist"),modalArtist:document.querySelector(".modal-artist"),modalOverlayArtist:document.querySelector(".modal-overlay-artist"),elemListCards:document.querySelector(".list-cards")};async function z(t){try{Q();const e=await D(t);Z(e)}catch(e){console.error("Error fetching artist data:",e)}finally{V()}}function G(){n.btnCloseModalArtist.addEventListener("click",v),n.modalOverlayArtist.addEventListener("click",M),document.addEventListener("keydown",q)}function J(){n.btnCloseModalArtist.removeEventListener("click",v),n.modalOverlayArtist.removeEventListener("click",M),document.removeEventListener("keydown",q)}function M(t){t.target===n.modalOverlayArtist&&v()}function q(t){t.key==="Escape"&&v()}function v(){var t;n.modalOverlayArtist.classList.remove("is-open-modal-artist"),document.body.classList.remove("body-no-scroll"),(t=n.modalArtist.querySelector(".container-modal-artist"))==null||t.remove(),J()}function Q(){n.loader.classList.add("loader")}function V(){n.loader.classList.remove("loader")}function Z(t){const e=Y(t.data);n.modalArtist.insertAdjacentHTML("beforeend",e),n.modalOverlayArtist.classList.add("is-open-modal-artist"),document.body.classList.add("body-no-scroll"),G()}function Y({strArtist:t,strArtistThumb:e,intFormedYear:s,intDiedYear:o,strGender:r,intMembers:a,strCountry:m,strBiographyEN:C,tracksList:O,genres:T}){const N=i=>{const c=Math.floor(i/1e3),g=Math.floor(c/60),d=c%60;return`${g}:${d<10?"0":""}${d}`},p={};O.forEach(i=>{p[i.strAlbum]||(p[i.strAlbum]=[]),p[i.strAlbum].push(i)});const j=(i,c)=>!i&&!c?"information missing":c?`${i}–${c}`:`${i}–present`,H=Object.entries(p).map(([i,c])=>{const g=c.map(d=>{let u=d.movie;return u&&!u.startsWith("http")&&(u=`https://${u.replace(/^\/\//,"")}`),`
            <li class="item-track-modal-artist">
              <p class="name-track-modal-artist">${d.strTrack}</p>
              <p class="time-track-modal-artist">${N(d.intDuration)}</p>
              ${u?`<a class="link-track-modal-artist" href="${u}" target="_blank" rel="noopener noreferrer">
                      <svg class="icon-track-modal-artist" width="24" height="24">
                        <use href="icon/symbol-defs.svg#icon-Youtube"></use>
                      </svg>
                    </a>`:'<div class="link-track-modal-artist"></div>'}
            </li>
          `}).join("");return`
        <div class="cont-albums-modal-artist">
          <h4 class="name-album-modal-artist">${i}</h4>
          <div class="cont-track-time-link">
            <p class="track-album-modal-artist">Track</p>
            <p class="time-album-modal-artist">Time</p>
            <p class="link-album-modal-artist">Link</p>
          </div>
          <ul class="list-track-modal-artist">
            ${g}
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
                <p class="text-info-modal-artist">${j(s,o)}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Sex</h4>
                <p class="text-info-modal-artist">${r}</p>
              </div>
            </div>
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Members</h4>
                <p class="text-info-modal-artist">${a}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Country</h4>
                <p>${m}</p>
              </div>
            </div>
            <div class="item-info-modal-artist biography-info-modal-artist">
              <h4 class="title-info-modal-artist">Biography</h4>
              <input type="checkbox" id="expand-bio" hidden>
              <p class="text-info-modal-artist expandable-text">${C}</p>
              <label for="expand-bio" class="expand-btn">▼ Show more</label>
            </div>
          </div>
          <ul class="list-genres-modal-artist">
            ${T.map(i=>`<li class="item-genres-modal-artist">${i}</li>`).join("")}
          </ul>
        </div>
      </div>
      <h3 class="albums-modal-artist">Albums</h3>
      <div class="conts-albums-modal-artist">${H}</div>
    </div>
  `}const w=document.querySelector(".list-cards"),tt=document.getElementById("load-more");let y=1;const et=8;async function B(t=1,e=8){try{const s=await K(t,e);if(!s||!s.artists||!Array.isArray(s.artists))throw new Error("Невірний формат даних: artists відсутній або не є масивом");console.log(`Отримані артисти для сторінки ${t}:`,s.artists),st(s.artists)}catch(s){console.error("Помилка при завантаженні артистів:",s.message)}}function st(t){w.innerHTML="";const e=t.map(X).join("");w.insertAdjacentHTML("beforeend",e)}tt.addEventListener("click",()=>{y++,console.log(`Завантажуємо сторінку: ${y}`),B(y,et)});document.addEventListener("click",t=>{if(t.target.classList.contains("learn-more")){const e=t.target.previousElementSibling,s=e.dataset.full;if(!s)return;e.classList.contains("expanded")?(e.innerHTML=s.slice(0,200)+"...",t.target.textContent="Learn More"):(e.innerHTML=s,t.target.textContent="Show Less"),e.classList.toggle("expanded")}});B();n.elemListCards.addEventListener("click",rt);async function rt(t){const e=t.target;if(!e.closest("[data-id]"))return;const{id:s}=e.closest("[data-id]").dataset;s&&await z(s)}
//# sourceMappingURL=index.js.map
