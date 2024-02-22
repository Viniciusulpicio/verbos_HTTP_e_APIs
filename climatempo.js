const axios = require('axios')

const api = axios.create({
    baseURL: 'https://openweathermap.org/'
})

module.exports = api_climate;