//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const searchContainer = document.querySelector("#searchContainer");

const userInput = document.querySelector("input#userInputField");

const redHeart = '❤️';

const emptyHeart = '♡';


//! fetch calls
fetch(`${baseURL}/parks?api_key=${API_KEY}`)
.then(res => res.json())
.then(parks => {
    // console.log(parks.data);
    parks.data.forEach(park => {
        createCard(park);
        filterByUserInput(park);
    })
})
// console.log(userInput);
// console.log(userInput.value);
//! functions
// filter user input function
// attach change event to userInput
// userInput.addEventListener("change", (e) => {
//     e.preventDefault();
//     // e.target.value.textContent
// })

function filterByUserInput(obj) {
    
}

// card create function
function createCard(obj) {
    const card = document.createElement('div');
    const image = document.createElement('img');
    const parkName = document.createElement('p');
    const state = document.createElement('p');
    const fee = document.createElement('p');
    const location = document.createElement('p');
    const entranceFee = document.createElement('p');
    const likeContainer = document.createElement('p');
    const favList = document.getElementById('favList');

    parkName.innerHTML = `<strong>${obj.fullName}</strong>`;
    parkName.innerText = obj.fullName
    parkName.className = "parkName";
    card.className = "card";
    image.src = obj.images[0].url;
    image.alt = obj.fullName;
    state.innerText = obj.states
    fee.innerText = obj.entranceFees[0].cost
    card.append(image, parkName, state, fee);
    parkGallery.append(card);
    location.innerText = `Location: 
    ${obj.addresses[0].line1}, ${obj.addresses[0].city}, ${obj.addresses[0].stateCode}, ${obj.addresses[0].postalCode}`;
    entranceFee.innerText = `Entrance fee: 
    ${obj.entranceFees[0].cost}`;
    // add fee and location to card
    // card.append(location, entranceFee);
    likeContainer.innerHTML = `<span class="heartGlyph">${emptyHeart}</span>`;

    likeContainer.addEventListener('click', e => {
        let favListP = document.createElement('p');
        favListP.className = "favListP";
        console.log(emptyHeart);
        console.log(e.target);
        console.log(e.target.innerHTML);
        console.log(e.target.innerHTML === emptyHeart);
        // if heart is 
        if (e.target.innerHTML.includes(`${emptyHeart}`)) {
            favListP.id = obj.fullName.replaceAll(" ", "")
            e.target.innerHTML = `${redHeart}`;
            favListP.className = 'favListP';
            favListP.textContent = `${obj.fullName}`;
            favList.append(favListP);
        } else if (e.target.innerHTML.includes(`${redHeart}`)) {
            e.target.innerHTML = `${emptyHeart}`;
            document.querySelector(`#${obj.fullName.replaceAll(" ", "")}`).remove();
        }
    })
    card.append(likeContainer);
}

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
    parkObj.activities.forEach(activity => renderLineItem(activity.name, activityList))
    parkHours.innerText = parkObj.operatingHours[0].description
    parkAddress.innerText = `${parkObj.addresses[0].line1} \n ${parkObj.addresses[0].line2} \n ${parkObj.addresses[0].city}, ${parkObj.addresses[0].stateCode} ${parkObj.addresses[0].postalCode}`
}

//! Add event listeners


showFilters.addEventListener('click', e => {
    moreFilters.classList.toggle('hidden');
})

moreFilters.addEventListener('submit', e => {
    e.preventDefault();
    const selectedItems = document.querySelectorAll('#states :checked')
    const selectedValues = [...selectedItems].map(item => item.value)
    const checkedValues = []
    checkedBoxes.forEach(box => checkedValues.push(box.id))

    getParks().then(parks => {
        parkGallery.innerHTML = ""
    })
})

//! Fetch data

const getParks = (parkCode) => {
    if (parkCode) {
        return fetch(`${baseURL}/parks?parkCode=${parkCode}&api_key=${API_KEY}`)
        .then(res => res.json())
    } else {
        return fetch(`${baseURL}/parks?limit=475&api_key=${API_KEY}`)
        .then(res => res.json())
    }
}

//! Filters

