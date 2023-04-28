//! Globals
const baseURL = 'https://developer.nps.gov/api/v1'

const redHeart = '❤️';

const emptyHeart = '♡';


//! Render on page 

const createCard = (obj) => {

    const card = document.createElement('div');
    card.className = "card";

    const image = document.createElement('img');
    image.src = obj.images[0].url;
    image.alt = obj.fullName;

    const parkName = document.createElement('h3');
    parkName.innerText = obj.fullName
 
    const location = document.createElement('p');
    location.innerText = `${obj.addresses[0].city}, ${obj.addresses[0].stateCode}`

    const likeContainer = document.createElement('p');
    likeContainer.innerHTML = `<span class="heartGlyph">${emptyHeart}</span>`;
    likeContainer.addEventListener('click', e => {handleLike(e, obj)})
   
    card.append(image, parkName, location, likeContainer);
    card.addEventListener('click', e => {
        displayPark(obj)
    })
    parkGallery.append(card);

    }


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
    parkObj.activities.forEach(activity => renderLineItem(activity.name, activityList))
    parkObj.entranceFees.forEach(fee => renderLineItem(`${fee.title}: $${fee.cost}`, feeList))
    parkHours.innerText = parkObj.operatingHours[0].description
    parkAddress.innerText = `${parkObj.addresses[0].line1} \n ${parkObj.addresses[0].line2} \n ${parkObj.addresses[0].city}, ${parkObj.addresses[0].stateCode} ${parkObj.addresses[0].postalCode}`
}



//! Add event listeners
showFilters.addEventListener('click', e => {
    document.querySelector('#filters-container').classList.toggle('hidden');
})

userInputField.addEventListener("change", (e) => {
    const userPark = e.target.value.toLowerCase();
    parkGallery.innerHTML = '';
    getParks()
    .then(parks => {
        const results = parks.data.filter(park =>
            park.fullName.toLowerCase().includes(userPark));
        results.forEach(result => createCard(result));
        })
    })

moreFilters.addEventListener('submit', e => {
    e.preventDefault();
    const selectedItems = document.querySelectorAll('#states :checked')
    const selectedValues = [...selectedItems].map(item => item.value)
    const checkedValues = []
    checkedBoxes.forEach(box => checkedValues.push(box.id))

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
                    createCard(result)
                }
            }
         }
        })
    }

    document.querySelector('#filters-container').classList.toggle('hidden')
})

const handleLike = (e, obj) => {
    let favListP = document.createElement('p');
    favListP.addEventListener('click', e => displayPark(obj))
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
}

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

fetch(`${baseURL}/parks?api_key=${API_KEY}`)
.then(res => res.json())
.then(parks => {
    parks.data.forEach(park => {
        createCard(park);
    })
})


