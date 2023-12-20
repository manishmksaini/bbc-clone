
// console.log(value)
function inputValue() {
    let value = document.getElementById('inputEmail').value

    let password = document.getElementById('inputPassword').value

    let pass = document.getElementById('password')

    let email = document.getElementById('email')
    email.textContent = "";

    pass.textContent = "";

    if (value == "user@info.com" && password == "user") {
        // email.textContent = "";
        // pass.textContent = "";
        // console.log(value, password)
        window.location.href = "http://127.0.0.1:5500/index.html?#"
    }

    else if (value !== "user@info.com" && password === "user") {
        email.textContent = "Please enter valid Email"
    }
    else if (value === "user@info.com" && password !== "user") {

        pass.textContent = "Please enter valid Password"
    }
    else {
        alert("pleasse enter valid details")
    }

}

//==================>>data----from----api<<==================//

// const apiID = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// const link = "https://newsapi.org/v2/everything?q=";

// async function process() {
//     const result = await fetch(`${link}(india)&apiKey=${apiID}`);
//     const data = await result.json();

//     const newData = data.map(content=>{
//         return content.articles.description
//     })

//     console.log(newData)
//     // console.log(newdata)
//     console.log(data.articles)



//     //=====>>articles--data(data.articles)--<<=========

//     // console.log(result)
// }
// try {

//     // const cardImg = document.getElementsByClassName('card-img-top')
//     // const cardTitle = document.getElementsByClassName('card-title')
//     // const cardSubtitle = document.getElementsByClassName('card-subtitle')
//     // const description = document.getElementsByClassName('card-subtitle')

// } catch (error) {

// }
// process()



// description ====> p(description)
// publishedAt =====> h6()
// urlToImage =======> img
// title =========> h4()



// ===================================

// const apiID = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// const link = "https://newsapi.org/v2/everything?q=bbc-news";

// window.addEventListener('load', ()=>process('India'));

// async function process() {
//     try {
//         const result = await fetch(`${link}(india)&apiKey=${apiID}`);
//         const data = await result.json();

//         const articlesContainer = document.getElementById('row');

//         if (data.articles && data.articles.length > 0) {
//             const articles = data.articles.map(article => {
//                 return `
//                 <div class="col-md-3">
//                     <div class="card">
//                         <img class="card-img-top " src="${article.urlToImage}">
//                         <div class="card-body p-2">
//                         <h4 class="card-title">${article.title}</h4>
//                         <h6 class="card-subtitle py-2 ">${article.publishedAt}</h6>
//                         <p class="card-text ">${article.description}</p>
//                         <a href="${article.url}" target="_blank">Read more</a>
//                     </div>
//                     </div>
//                     </div>

//                 `;
                
//             });

//             articlesContainer.innerHTML = articles.join('');
//         } else {
//             articlesContainer.innerHTML = "No articles found.";
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }
// process()

// =====================================================================



const apiID = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const link = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', ()=>getNews('India'));

async function getNews (topic){
        const result = await fetch(`${link}${topic}&apiKey=${apiID}`);
        const data = await result.json();
        // console.log(data)
        
        mainContent(data.articles);
        console.log(data)
        
}

function mainContent (articles){
const container = document.getElementById('row')
const newsTemplate = document.getElementById('newsTemplate')

container.innerHTML = " ";
 
articles.forEach(item => {
    
    if (!item.urlToImage) return;
    const cardClone = newsTemplate.cloneNode(true);
    fillData (cardClone, item);
    container.appendChild(cardClone);
    
});
}
 

function fillData(cardClone, item) {

    const newsImage = cardClone.querySelector('.card-img-top');
    const newsTitle= cardClone.querySelector('.card-title');
    const newsPublishedAt = cardClone.querySelector('.card-subtitle');
    const newsDescription = cardClone.querySelector('.card-text');

    newsImage.src = item.urlToImage;
    newsTitle.innerHTML = item.title;
    newsPublishedAt.innerHTML = item.publishedAt;
    newsDescription.innerHTML = item.description;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(item.url, "_blank");
    })
}


let selectedNav = null;
function navClick(id){
    getNews(id);
    const navItem = document.getElementById(id);
    selectedNav?.classList.remove('selected');
    selectedNav = navItem;
    selectedNav.classList.add('selected')
}


const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    const topic = searchBox.value;
    if (!topic) return;
    getNews(topic);
    selectedNav?.classList.remove("active");
    selectedNav = null;
});

