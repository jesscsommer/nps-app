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
    card.className = "card";

    // create image variable
    const image = document.createElement('img');
    image.src = obj.images[0].url;

    // create 'more info' variable
    const moreInfo = document.createElement('div');
    
    // create parkName variable
    const parkName = document.createElement('p');
    parkName.innerHTML = `<strong>${obj.fullName}</strong>`;

    // create like button
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like button';

    // attach image to card
    card.append(image);
    parkGallery.append(card);

    // attach Park name to card
    card.append(parkName);

    // create location and entrance paragraph elements
    const location = document.createElement('p');
    const entranceFee = document.createElement('p');
    location.innerText = `Location: ${obj.addresses[0].line1}, ${obj.addresses[0].city}, ${obj.addresses[0].stateCode}, ${obj.addresses[0].postalCode}`;
    entranceFee.innerText = `Entrance fee: ${obj.entranceFees[0].cost}`;
    // add description & append
    card.append(location, entranceFee);
    // attach like button
    card.append(likeBtn);
    
}




// add input event to userInput
/*
userInput.addEventListener("change", (e) => {
    e
})
*/


//! Render on page 

const renderLineItem = (lineItem, destinationList) => {
    const li = document.createElement('li')
    li.innerText = lineItem
    destinationList.append(li)
}

const displayPark = (parkObj) => {
    parkImg.src = parkObj.images[0].url 
    parkImg.alt = parkObj.fullName
    parkTitle.innerText = parkObj.fullName
    parkDescription.innerText = parkObj.description
    // parkObj.activities.forEach(activity => renderLineItem(activity.name, activityList))
    parkHours.innerText = parkObj.operatingHours[0].description
    parkAddress.innerText = `${parkObj.addresses[0].line1} \n ${parkObj.addresses[0].line2} \n ${parkObj.addresses[0].city}, ${parkObj.addresses[0].stateCode} ${parkObj.addresses[0].postalCode}`
}

//! Fetch data

const getParks = (parkCode, path) => {
    if (parkCode) {
        return fetch(`${baseURL}/${path}?parkCode=${parkCode}&api_key=${API_KEY}`)
        .then(res => res.json())
    }
}

getParks('olym', 'parks').then(parkObj => displayPark(parkObj.data[0]))

//! Initial fetch
// fetch(`${baseURL}/parks?api_key=${API_KEY}`)
// .then(res => res.json())
// .then(parks => console.log(parks))

// const card = document.createElement('div');

