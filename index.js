import{a as B,S as $,i as u}from"./assets/vendor-BX8YMJUK.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const x="58303341-638c410ebb1bf44bb21757c0a",O="https://pixabay.com/api/",p=15;async function g(e,r){return(await B.get(O,{params:{key:x,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:p}})).data}const y=document.querySelector(".gallery"),h=document.querySelector(".loader"),b=document.querySelector(".load-more"),L=document.querySelector(".end-message"),v=new $(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function S(e){const r=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:o,views:l,comments:M,downloads:A})=>`<li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img
          class="gallery-image"
          src="${s}"
          alt="${_(t)}"
          loading="lazy"
        />
      </a>
      <ul class="info">
        <li class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${o}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${l}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${M}</p>
        </li>
        <li class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${A}</p>
        </li>
      </ul>
    </li>`).join("");y.insertAdjacentHTML("beforeend",r),v.refresh()}function C(){y.innerHTML="",v.refresh()}function q(){h.classList.add("is-visible")}function m(){h.classList.remove("is-visible")}function R(){b.classList.add("is-visible")}function w(){b.classList.remove("is-visible")}function H(){L.classList.add("is-visible")}function P(){L.classList.remove("is-visible")}function _(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const D=document.querySelector(".form"),G=document.querySelector(".load-more");let d="",n=1,i=0,c=!1;const f={position:"topRight",backgroundColor:"#ef4040",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",progressBar:!1,close:!0,timeout:4e3,maxWidth:432};D.addEventListener("submit",I);G.addEventListener("click",T);async function I(e){e.preventDefault();const r=e.currentTarget.elements["search-text"].value.trim();if(r===""){u.error({...f,message:"Please enter a search query!"});return}d=r,n=1;const s=++i;C(),w(),P(),q(),c=!0;try{const a=await g(d,n);if(s!==i)return;if(a.hits.length===0){u.error({...f,message:"Sorry, there are no images matching your search query. Please try again!"});return}S(a.hits),E(a.totalHits)}catch{if(s!==i)return;u.error({...f,message:"Something went wrong. Please try again later!"})}finally{s===i&&(c=!1,m())}}async function T(){if(c||d==="")return;c=!0,n+=1;const e=i;q();try{const r=await g(d,n);if(e!==i)return;S(r.hits),E(r.totalHits),m(),z()}catch{if(e!==i)return;n-=1,u.error({...f,message:"Something went wrong. Please try again later!"})}finally{e===i&&(c=!1,m())}}function E(e){if(n*p>=e){w(),H();return}P(),R()}function z(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
