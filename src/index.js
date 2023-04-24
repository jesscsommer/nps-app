//! Get API key

import {API_KEY} from "/config.js"

//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const userInput = document.querySelector("#userInputField");

//! Initial fetch
fetch(`${baseURL}/parks?api_key=${API_KEY}`)
.then(res => res.json())
.then(parks => {
    console.log(parks.data[0]);
    parks.data.forEach(park => {
        createCard(park);
    })
    // createCards(parks.data);
})

//! functions
// card create function
function createCard(obj) {
    // create card variable
    const card = document.createElement('div');
    // create image variable
    const image = document.createElement('img');
    // create parkName variable
    const parkName = document.createElement('p');
    image.src = obj.images[0].url;
    // attach image to card
    card.append(image);
    parkGallery.append(card);
    // attach Park name to card
    
    // clicking park name shows details
        // who entrance fee info
    // attach park location
    // attach like button
}




// add input event to userInput
/*
userInput.addEventListener("change", (e) => {
    e
})
*/


