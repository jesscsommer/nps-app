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
    // create parkName variable

    // add temporary name and state to Div in order to test filter
    const parkName = document.createElement('p');
    parkName.innerText = obj.fullName

    const state = document.createElement('p')
    state.innerText = obj.states

    image.src = obj.images[0].url;
    // attach image to card
    card.append(image, parkName, state);
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

//! Add event listeners 

showFilters.addEventListener('click', e => {
    moreFilters.classList.toggle('hidden');
})

submitBtn.addEventListener('submit', e => {
    //live server is preventing testing this effectively but if you run line by line in console, ['WA', 'OR'] is selectedValues
    e.preventDefault();

    const selectedItems = document.querySelectorAll('#states :checked')
    const selectedValues = [...selectedItems].map(item => item.value)
    console.log(selectedValues)

})


//! Fetch data

const getParks = (parkCode) => {
    if (parkCode) {
        return fetch(`${baseURL}/parks?parkCode=${parkCode}&api_key=${API_KEY}`)
        .then(res => res.json())
    } else {
        return fetch(`${baseURL}/parks?api_key=${API_KEY}`)
        .then(res => res.json())
    }
}

getParks('olym').then(parkObj => displayPark(parkObj.data[0]))

//! Filters

getParks().then(parks => console.log(parks.data))


// parks.data is an array of parks objects
// 'states' is the key on each obj with the states code 
// you'll have to get the multiselect values somehow 
// array .some() could perhaps help see if there is any overlap between the selected state codes (search queries) and the list of states for the parks

// get selected options and save into target array
// filter results array (parks.data) so that the state codes equal anything in the target array

//! Initial fetch
// fetch(`${baseURL}/parks?api_key=${API_KEY}`)
// .then(res => res.json())
// .then(parks => console.log(parks))

// const card = document.createElement('div');

