/*
to connect javascript to HTML

    querySelector
    querySelectorAll
    getElementsByClassName
    getElementsByTagName
    getElementById

*/ 

const baseURL = 'https://xkcd.now.sh'
//technically the APIUrl
let params = new URLSearchParams(window.location.search.substring(1)); 
//gets the query parameter without the '?'
let comicId = parseInt(params.get('issue'), 10);
//gets the current comicId

function changePage(path = '?comic=latest') { //defaults to latest comic
    fetch(`${baseURL}/${path}`) //first request is current comic
        .then(response => response.json())
        .then(result => {
            const titleAPI = result.title;
            const imgAPI = result.img;
            const altAPI = result.alt;
            comicId = result.num;

            //task 3
            document.getElementsByTagName("img")[0].src = imgAPI;
            document.getElementsByTagName("img")[0].alt = altAPI;
            document.getElementsByTagName("figcaption")[0].textContent = altAPI;
            document.getElementsByTagName('h1')[0].textContent = titleAPI; 
        })
}

//need 3 separate functions because each button click does something different
function handleBackButtonClick(event) {

let cId = comicId > 0 ? comicId - 1 : '';
window.location.search = (`?issue=${cId}`); //goes to another page 

}

function handleNextButtonClick(event) {

let cId = comicId < 2300 ? comicId + 1 : '';
window.location.search = (`?issue=${cId}`);

}

function handleRandomButtonClick(event) {
     
let comicId = Math.floor(Math.random() * 2300);
window.location.search =`?issue=${comicId}`; //don't use changePage to requery data

}

let backButton = document.getElementsByTagName('button')[0];
let randomButton = document.getElementsByTagName('button')[1];
let nextButton = document.getElementsByTagName('button')[2];

backButton.addEventListener('click', handleBackButtonClick)
nextButton.addEventListener('click', handleNextButtonClick)
randomButton.addEventListener('click', handleRandomButtonClick)


window.onload = function() {
    // if comicId is not a number, default
    if (isNaN(comicId)){
        changePage();
    }
    else{
    //if comicId is a number, change to that comic
        changePage(`?comic=${comicId}`);
    } 
}





