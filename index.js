function loadCategory(){
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then( res => res.json())
    .then( data => showCategory(data.data.news_category))
}

const showCategory = categories =>{
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    for(const category of categories){
        // console.log(category.category_name);
        const div = document.createElement('div');
        div.classList.add('categories');
        div.innerHTML = `
        <a onclick="loadNews(${category.category_id},'${category.category_name}')" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(div);
    }
}
const loadNews = (num, name) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/0${num}`)
    .then( res => res.json())
    .then( data => displayNews(data.data , name));
}
const displayNews = (newses, name) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    const itemNo = document.getElementById('item-no');
    itemNo.innerText = newses.length;

    const categoryName = document.getElementById('category-found');
    categoryName.innerText = name;

    const noNews = document.getElementById('no-news');
        if(newses.length === 0){
            noNews.classList.remove('d-none');
        }
        else{
            noNews.classList.add('d-none');
        }
    for(const news of newses){
        // console.log(news);
        const date = news.author.published_date.slice(0,10);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3 col-12 p-2">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                </div>
                <div class="col-md-9 col-12 p-2">
                    <div class="card-body">
                        <h3 class="card-title">${news.title}</h3>
                        <p class="card-text overflow-auto">${news.details}</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                    <div class="card-footer mt-auto d-flex justify-content-between">
                        <div class="d-flex">
                            <div class="p-1">
                                <img src="${news.author.img}" class="rounded-circle" alt="...">
                            </div>
                            <div>
                                <small><strong>${news.author.name}</strong></small>
                                <small class="d-block">${date}</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <h4><i class="fa-regular fa-eye"></i> ${news.total_view}</h4>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <p><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star" style="color: #FFD43B;"></i><i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i></p>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <button type="button" onclick="showModal('${news.title}')" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right fa-2xl" style="color: #17edfd;"></i></button>
                        </div>
                    </div>
             </div>
            </div>
        </div>
        `
        newsContainer.appendChild(div);
    }
}
const showModal = (title) =>{
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = title;
}

loadNews(1,'Breaking News');
loadCategory();