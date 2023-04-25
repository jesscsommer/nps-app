//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const searchContainer = document.querySelector("#searchContainer");

const userInput = document.querySelector("#userInput");

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
    image.src = obj.images[0].url;
    image.alt = obj.fullName;

    // create 'more info' variable
    const moreInfo = document.createElement('div');
    
    // create parkName variable
    // add temporary name and state to Div in order to test filter
    const parkName = document.createElement('p');
    parkName.innerHTML = `<strong>${obj.fullName}</strong>`;

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
    card.append(parkName);

    // create location and entrance paragraph elements
    const location = document.createElement('p');
    const entranceFee = document.createElement('p');
    location.innerText = `Location: 
    ${obj.addresses[0].line1}, ${obj.addresses[0].city}, ${obj.addresses[0].stateCode}, ${obj.addresses[0].postalCode}`;
    entranceFee.innerText = `Entrance fee: 
    ${obj.entranceFees[0].cost}`;

    // add fee and location to card
    // card.append(location, entranceFee);
    
    // add a count variable for each card's like button
    let count = 0;

    // create and add a <p> to hold like glyph
    const likeContainer = document.createElement('p');
    likeContainer.innerHTML = `<span class="heartGlyph">&#x2661;</span>`;

    // create 
   
    const glyphsArr = document.getElementsByClassName('heartGlyph')
    //iterate over glpyhs array and attach listeners
    for (let glyph of glyphsArr) {
        glyph.addEventListener('click', e => {
            // console.log(e.target);
            count++;
            e.target.innerHTML = '&#x2764;&#xfe0f;'
        })
    }
    // attach heart glyph
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
        // const results3 = results2.filter(result => checkedBoxes.includes(result.activities.name.toLowerCase()))
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

