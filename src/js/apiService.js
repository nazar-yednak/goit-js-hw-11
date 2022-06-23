import axios from 'axios'



const BASE_URL = 'https://pixabay.com/api';


export default class newsApiServise {
    constructor() {
        this.searchQ = '';
        this.page = 1;
        
    }
    async fetchCard() {
        const options = {
          key: '28055079-45e3c423b4c5366c3627ebf35',
            q: '',
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page:40
     }
    const url = `${BASE_URL}/?key=${options.key}&q=${this.searchQ}&image_type=${options.photo}&orientation=${options.orientation}&safesearch=${options.safesearch}&&page=${this.page}&per_page=${options.per_page}`
        
        return axios.get(url, options)
            .then(response => {            
                this.incrementPage() 
                console.log(response);
             return response.data
              
            })    
  
    }

    incrementPage() {
        this.page += 1
      
    }
    resetPage() {
        this.page = 1;
    }
    get query () {
        return this.searchQ
    }
    set query(newQuery)
    {
        this.searchQ = newQuery
    }
}