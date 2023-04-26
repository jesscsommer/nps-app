//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const searchContainer = document.querySelector("#searchContainer");

const userInput = document.querySelector("#userInput");

const redHeart = '&#x2764;&#xfe0f;'

const emptyHeart = '&#x2661;'

//! Initial fetch
fetch(`${baseURL}/parks?api_key=${API_KEY}`)
.then(res => res.json())
.then(parks => {
    parks.data.forEach(park => {
        createCard(park);
    })
})

//! functions


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
    const glyphsArr = document.getElementsByClassName('heartGlyph');
    const favList = document.getElementById('favList');
    const cardParkName = document.querySelector('.parkName');
    // card.append(parkName);
    
    parkName.innerHTML = `<strong>${obj.fullName}</strong>`;
    parkName.innerText = obj.fullName
    parkName.className = "parkName";
    card.className = "card";
    image.src = obj.images[0].url;
    image.alt = obj.fullName;
    state.innerText = obj.states
    fee.innerText = obj.entranceFees[0].cost
    image.src = obj.images[0].url;
    card.append(image, parkName, state, fee);
    parkGallery.append(card);
    location.innerText = `Location: 
    ${obj.addresses[0].line1}, ${obj.addresses[0].city}, ${obj.addresses[0].stateCode}, ${obj.addresses[0].postalCode}`;
    entranceFee.innerText = `Entrance fee: 
    ${obj.entranceFees[0].cost}`;
    // add fee and location to card
    // card.append(location, entranceFee);
    likeContainer.innerHTML = `<span class="heartGlyph">${emptyHeart}</span>`;
    for (let glyph of glyphsArr) {
        glyph.addEventListener('click', e => {
            // console.log(e.target);
            e.target.innerHTML = `${redHeart}`;
        })
    }
    let favListP = document.createElement('p');
    favListP.className = 'favListP';
    favListP.textContent = `${obj.fullName}`;
    favList.append(favListP);

    // for (let glyph of glyphsArr) {
    //     glyph.addEventListener('click', toggle);
    // }
    // function toggle() {
    //     const like = likeContainer.innerHTML = `<span class="heartGlyph">${emptyHeart}</span>`;
    //     if (like===) {

    //     }
    // }
    card.append(likeContainer);
}

// attach change event to userInput
// userInput.addEventListener("change", (e) => {
//     e.preventDefault();
//     // e.target.value.textContent
// })





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
    const maxPrice = parseInt(costRange.value);

    const checkedBoxes = Array.from(document.querySelectorAll('input[type=checkbox')).filter(box => box.checked === true)
    const checkedValues = []
    checkedBoxes.forEach(box => checkedValues.push(box.id))
    console.log(checkedValues)

    getParks().then(parks => {
        const results1 = parks.data.filter(park => selectedValues.includes(park.states))
        const results2 = results1.filter(result => (result.entranceFees[0].cost < maxPrice))
        console.log(results2)
        parkGallery.innerHTML = ""
        results2.forEach(createCard)
    })
})

// park obj --> activities, which is an array of objects --> objects have the name key for activity, first letter is uppercase

costRange.addEventListener('change', e => {
    maxValue.innerText = `$${e.target.value}`;
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

getParks('olym').then(parkObj => displayPark(parkObj.data[0]))

//! Filters

