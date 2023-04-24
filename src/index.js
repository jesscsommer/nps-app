//! Get API key

import {API_KEY} from "/config.js"

//! Globals

const baseURL = 'https://developer.nps.gov/api/v1'

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

