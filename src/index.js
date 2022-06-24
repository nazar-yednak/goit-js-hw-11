
import NewsApiService from './js/apiService'
import Notiflix from 'notiflix'

import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    galery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
    img: document.querySelector('img')


}

const newsApiServise = new NewsApiService()



refs.galery.innerHTML = "";
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galery.addEventListener('click', onImageClick);

console.log(refs.loadMoreBtn.addEventListener('click', onLoadMore));

let searchQ = "";
function onSearch(e) {
   
   e.preventDefault()
   
  const form = e.currentTarget;
  
  if (e.currentTarget.elements.searchQuery.value === ""       ) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  }
  
  else {  
    newsApiServise.query = e.currentTarget.elements.searchQuery.value;
    newsApiServise.resetPage()
    resetSearchGallery()
    newsApiServise.fetchCard().then(renderGaleryCard).catch(error => { console.log(error); }
   
    );

   
  
    form.reset();
    
  }
}



function renderGaleryCard(data) {   
 
const markup =  data.hits.map(({ largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
<a href="${largeImageURL }"><img src="${largeImageURL}" alt="${tags}" loading="lazy" /></a> 
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
 </div>
</div>`
   }).join("")
  refs.galery.insertAdjacentHTML('beforeend', markup)
  if (data.totalHits >= 40)  {
    refs.loadMoreBtn.classList.remove('is-hidden')
  }
  //  if (data.totalHits < 40)  {
  //   refs.loadMoreBtn.classList.add('is-hidden')
  // }



  Notiflix.Notify.success(`Sol lucet "Hooray! We found ${data.totalHits} images.`);

}
function onLoadMore( e) {
 e.preventDefault();
  newsApiServise.fetchCard().then(data => {
    if (data.hits.length < 40 ) {    
    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
     refs.loadMoreBtn.classList.add('is-hidden')
        return;
        
    }
  
   
    else {
     
  newsApiServise.fetchCard().then(renderGaleryCard)
     
       
    }
  }).catch(error => { console.log(error); })

}   
 

function resetSearchGallery(){
  refs.galery.innerHTML= ""
}

function onImageClick(e) {
  e.preventDefault();  
  let galleryCard = new SimpleLightbox('a', { captionDelay: 250 });
  galleryCard.refresh();
  refs.galery.addEventListener("click", galleryCard);
}



