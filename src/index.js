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
    
    card.className = "card";
    image.src = obj.images[0].url;
    image.alt = obj.fullName;
    parkName.innerHTML = `<strong>${obj.fullName}</strong>`;
    parkName.innerText = obj.fullName
    state.innerText = obj.states
    fee.innerText = obj.entranceFees[0].cost
    image.src = obj.images[0].url;
    card.append(image, parkName, state, fee);
    card.addEventListener('click', e => {
        displayPark(obj)
    })
    parkGallery.append(card);
    card.append(parkName);
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
            e.target.innerHTML = `${redHeart}`
        })
    }
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
    mainPark.classList.remove('hidden')
    parkImg.src = parkObj.images[0].url 
    parkImg.alt = parkObj.fullName
    parkTitle.innerText = parkObj.fullName
    parkDescription.innerText = parkObj.description

    activityList.innerHTML = ""
    parkObj.activities.forEach(activity => renderLineItem(activity.name, activityList))

    feeList.innerHTML = ""
    parkObj.entranceFees.forEach(fee => renderLineItem(`${fee.title}: $${fee.cost}`, feeList))
    parkHours.innerText = parkObj.operatingHours[0].description
    parkAddress.innerText = `${parkObj.addresses[0].line1} \n ${parkObj.addresses[0].line2} \n ${parkObj.addresses[0].city}, ${parkObj.addresses[0].stateCode} ${parkObj.addresses[0].postalCode}`
}

//! Add event listeners


showFilters.addEventListener('click', e => {
    document.querySelector('#filters-container').classList.toggle('hidden');
})

moreFilters.addEventListener('submit', e => {
    e.preventDefault();
    const selectedItems = document.querySelectorAll('#states :checked')
    const selectedValues = [...selectedItems].map(item => item.value)

    const checkedBoxes = Array.from(document.querySelectorAll('input[type=checkbox]')).filter(box => box.checked === true)
    const checkedValues = []
    checkedBoxes.forEach(box => checkedValues.push(box.id))
    console.log(checkedValues)

    if (selectedValues.length === 0) {
        alert(`Please select a state`)
    } else if (checkedValues.length === 0) {
        alert(`Please select activities`)
    } else {
        getParks().then(parks => {
        parkGallery.innerHTML = ""
        const results = parks.data.filter(park => selectedValues.includes(park.states))
        for (let result of results) {
            for (let activities of result.activities) {
                if (checkedValues.includes(activities.name.toLowerCase())){
                    console.log(activities.name)
                    createCard(result)
                }
            }
         }
        })
    }

    document.querySelector('#filters-container').classList.toggle('hidden')
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

