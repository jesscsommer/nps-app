
//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const userInput = document.querySelector("#userInputField");

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

    const fee = document.createElement('p')
    fee.innerText = obj.entranceFees[0].cost

    image.src = obj.images[0].url;
    // attach image to card
    card.append(image, parkName, state, fee);
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

