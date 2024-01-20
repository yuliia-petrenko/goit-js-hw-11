import{S as m,i as f}from"./assets/vendor-9310f15c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const d="https://pixabay.com/api/",y="41930626-f2ac102ea6260ef01eb19ab27",l=document.querySelector(".img-form");document.querySelector(".img-inp");const g=document.querySelector(".img-btn"),h=document.querySelector(".loader"),p=document.querySelector(".gallery");l.addEventListener("submit",t=>{t.preventDefault();const o=l.query.value.trim();if(!o){c("The search field can't be empty! Please, enter your request!");return}const s=`${d}?key=${y}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`;function n(e){return a(!0),fetch(e).then(r=>{if(!r.ok)throw new Error(r.ststusText);return r.json()})}n(s).then(e=>{e.hits.length===0&&(c("Sorry, there are no images matching your search query. Please, try again!"),a(!1)),p.innerHTML=b(e.hits),a(!1),new m(".gallery-item a",{captionsData:"alt",captionDelay:250}),l.reset()}).catch(e=>console.error(e))});function c(t){f.show({class:"error-svg",icon:"error-svg",position:"topRight",message:t,maxWidth:"350",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0})}function b(t){return t.map(({webformatURL:o,largeImageURL:s,tags:n,likes:e,views:r,comments:i,downloads:u})=>`
        <li class="gallery-item">
  <a class="gallery-link" href="${s}">
    <img
      class="gallery-image"
      src="${o}"
      alt="${n}"
    />
    <p class="gallery-item">Likes: ${e} Views: ${r} Comments: ${i} Downloads: ${u}</p>
  </a>
</li>`).join("")}function a(t=!0){h.style.display=t?"inline-block":"none",g.disabled=t}
//# sourceMappingURL=commonHelpers.js.map
