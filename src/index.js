//! Get API key

import {API_KEY} from "/config.js"

//! Globals

const baseURL = 'https://developer.nps.gov/api/v1'

//! Initial fetch
fetch(`${baseURL}/parks?api_key=${API_KEY}`)
.then(res => res.json())
.then(parks => console.log(parks))

const card = document.createElement('div');
