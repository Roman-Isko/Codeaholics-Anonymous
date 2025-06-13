import{a as E,S as P}from"./assets/vendor-DCTTPbN7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const S=E.create({baseURL:"https://sound-wave.b.goit.study/api"});async function D(t){try{return await S.get(`/artists/${t}`)}catch(e){throw console.error(`Помилка при отриманні актора з ID ${t}:`,e),e}}async function I(){try{return await S.get("/feedbacks")}catch(t){throw console.error("Помилка при отриманні відгуків:",t),t}}const $=document.querySelector(".burger-icon"),A=document.querySelector(".burger-icon-x"),h=document.querySelector(".header-nav-list"),k=document.body;document.querySelector(".burger-svg");$.addEventListener("click",x);A.addEventListener("click",x);h.addEventListener("click",t=>{t.target.nodeName==="A"&&(h.classList.remove("active"),A.classList.remove("active"),$.classList.remove("active"),k.classList.remove("lock"))});function x(){h.classList.toggle("active"),$.classList.toggle("active"),A.classList.toggle("active"),h.classList.contains("active")?k.classList.add("lock"):k.classList.remove("lock")}const F=document.querySelector(".swiper-wrapper");function W(t){const e=Math.round(t);let s="";for(let i=0;i<5;i++)i<e?s+='<span class="star-icon filled"> ★ </span>':s+='<span class="star-icon empty"> ★ </span>';return s}async function R(){const i=(await I()).data.data.map(a=>{let r=a.rating;return`
 <div class="swiper-slide">
<div class="feedback-card">
<div class="feedback-rating-display"> ${W(r)} </div>
 <p class="feedback-text">"${a.descr}"</p>
 <p class="feedback-author">${a.name}</p>
 </div>
</div>
`}).join("");F.innerHTML=i,n.update()}const n=new P(".swiper",{initialSlide:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),U=document.querySelector(".custom-swiper-btn-next"),_=document.querySelector(".custom-swiper-btn-prev");U.addEventListener("click",()=>{n.slideNext()});_.addEventListener("click",()=>{n.slidePrev()});R();const v=document.querySelector(".dot.first"),p=document.querySelector(".dot.current"),f=document.querySelector(".dot.last");n.on("slideChange",()=>{const t=n.realIndex,e=n.slides.length-n.loopedSlides*2;v.classList.remove("active"),p.classList.remove("active"),f.classList.remove("active"),t===0?v.classList.add("active"):t===e-1?f.classList.add("active"):p.classList.add("active")});v.addEventListener("click",()=>{n.slideTo(0),w(0)});f.addEventListener("click",()=>{const t=n.slides.length;n.slideTo(t-1),w(t-1)});p.addEventListener("click",()=>{const t=n.slides.length,e=Math.floor((t-1)/2);n.slideTo(e),w(e)});function w(t){v.classList.remove("active"),p.classList.remove("active"),f.classList.remove("active"),t===0?v.classList.add("active"):t===n.slides.length-1?f.classList.add("active"):p.classList.add("active")}async function K(t=1,e=8){const s=`https://sound-wave.b.goit.study/api/artists?page=${t}&limit=${e}`;try{const{data:i}=await E.get(s);return i}catch(i){return console.error("Помилка отримання артистів:",i),null}}function X(t){if(!t||!t.strArtistThumb||!t.strArtist||!t.genres||!t.strBiographyEN)return"";const e=t.strBiographyEN.length>200?t.strBiographyEN.slice(0,200)+"...":t.strBiographyEN;return`
        <li class="artist-card">
            <img src="${t.strArtistThumb}" alt="${t.strArtist}" class="artist-image" />
            <h3 class="artist-name">${t.strArtist}</h3>
            <p class="artist-genre">${t.genres.join(", ")}</p>
            <p class="artist-bio" data-full="${t.strBiographyEN}">${e}</p>
            <button class="learn-more" data-id="${t._id}">Learn More</button>
        </li>
    `}const c={loader:document.querySelector(".show-loader"),btnCloseModalArtist:document.querySelector(".btn-close-modal-artist"),modalArtist:document.querySelector(".modal-artist"),modalOverlayArtist:document.querySelector(".modal-overlay-artist"),elemListCards:document.querySelector(".list-cards")};async function z(t){try{Q();const e=await D(t);Z(e)}catch(e){console.error("Error fetching artist data:",e)}finally{V()}}function G(){c.btnCloseModalArtist.addEventListener("click",y),c.modalOverlayArtist.addEventListener("click",M),document.addEventListener("keydown",q)}function J(){c.btnCloseModalArtist.removeEventListener("click",y),c.modalOverlayArtist.removeEventListener("click",M),document.removeEventListener("keydown",q)}function M(t){t.target===c.modalOverlayArtist&&y()}function q(t){t.key==="Escape"&&y()}function y(){var t;c.modalOverlayArtist.classList.remove("is-open-modal-artist"),document.body.classList.remove("body-no-scroll"),(t=c.modalArtist.querySelector(".container-modal-artist"))==null||t.remove(),J()}function Q(){c.loader.classList.add("loader")}function V(){c.loader.classList.remove("loader")}function Z(t){const e=Y(t.data);c.modalArtist.insertAdjacentHTML("beforeend",e),c.modalOverlayArtist.classList.add("is-open-modal-artist"),document.body.classList.add("body-no-scroll"),G()}function Y({strArtist:t,strArtistThumb:e,intFormedYear:s,intDiedYear:i,strGender:a,intMembers:r,strCountry:u,strBiographyEN:T,tracksList:C,genres:O}){const N=o=>{const l=Math.floor(o/1e3),L=Math.floor(l/60),d=l%60;return`${L}:${d<10?"0":""}${d}`},g={};C.forEach(o=>{g[o.strAlbum]||(g[o.strAlbum]=[]),g[o.strAlbum].push(o)});const j=(o,l)=>!o&&!l?"information missing":l?`${o}–${l}`:`${o}–present`,H=Object.entries(g).map(([o,l])=>{const L=l.map(d=>{let m=d.movie;return m&&!m.startsWith("http")&&(m=`https://${m.replace(/^\/\//,"")}`),`
            <li class="item-track-modal-artist">
              <p class="name-track-modal-artist">${d.strTrack}</p>
              <p class="time-track-modal-artist">${N(d.intDuration)}</p>
              ${m?`<a class="link-track-modal-artist" href="${m}" target="_blank" rel="noopener noreferrer">
                      <svg class="icon-track-modal-artist" width="24" height="24">
                        <use href="icon/symbol-defs.svg#icon-Youtube"></use>
                      </svg>
                    </a>`:'<div class="link-track-modal-artist"></div>'}
            </li>
          `}).join("");return`
        <div class="cont-albums-modal-artist">
          <h4 class="name-album-modal-artist">${o}</h4>
          <div class="cont-track-time-link">
            <p class="track-album-modal-artist">Track</p>
            <p class="time-album-modal-artist">Time</p>
            <p class="link-album-modal-artist">Link</p>
          </div>
          <ul class="list-track-modal-artist">
            ${L}
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
                <p class="text-info-modal-artist">${j(s,i)}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Sex</h4>
                <p class="text-info-modal-artist">${a}</p>
              </div>
            </div>
            <div class="group-info-about-artist">
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Members</h4>
                <p class="text-info-modal-artist">${r}</p>
              </div>
              <div class="item-info-modal-artist">
                <h4 class="title-info-modal-artist">Country</h4>
                <p>${u}</p>
              </div>
            </div>
            <div class="item-info-modal-artist biography-info-modal-artist">
              <h4 class="title-info-modal-artist">Biography</h4>
              <input type="checkbox" id="expand-bio" hidden>
              <p class="text-info-modal-artist expandable-text">${T}</p>
              <label for="expand-bio" class="expand-btn">▼ Show more</label>
            </div>
          </div>
          <ul class="list-genres-modal-artist">
            ${O.map(o=>`<li class="item-genres-modal-artist">${o}</li>`).join("")}
          </ul>
        </div>
      </div>
      <h3 class="albums-modal-artist">Albums</h3>
      <div class="conts-albums-modal-artist">${H}</div>
    </div>
  `}const tt=document.querySelector(".list-cards"),et=document.getElementById("load-more");let b=1;const st=8;async function B(t=1,e=8){try{const s=await K(t,e);if(!s||!s.artists||!Array.isArray(s.artists))throw new Error("Невірний формат даних: artists відсутній або не є масивом");console.log(`Отримані артисти для сторінки ${t}:`,s.artists),at(s.artists)}catch(s){console.error("Помилка при завантаженні артистів:",s.message)}}function at(t){const e=t.map(X).join("");tt.insertAdjacentHTML("beforeend",e)}et.addEventListener("click",()=>{b++,console.log(`Завантажуємо сторінку: ${b}`),B(b,st)});document.addEventListener("click",t=>{if(t.target.classList.contains("learn-more")){const e=t.target.previousElementSibling,s=e.dataset.full;if(!s)return;e.classList.contains("expanded")?(e.innerHTML=s.slice(0,200)+"...",t.target.textContent="Learn More"):(e.innerHTML=s,t.target.textContent="Show Less"),e.classList.toggle("expanded")}});B();c.elemListCards.addEventListener("click",rt);async function rt(t){const e=t.target;if(!e.closest("[data-id]"))return;const{id:s}=e.closest("[data-id]").dataset;s&&await z(s)}
//# sourceMappingURL=index.js.map
