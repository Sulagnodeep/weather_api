const request = require('request')

const baseURL = 'https://api.weatherapi.com/v1/current.json?key='
const apiKey = 'd972b61653f14b83b8384852211808'

const weather = (address, callback) => {
    const url = baseURL + apiKey +'&q=' + address +'&aqi=no'
    request({url, json: true}, (error,response) => {
        if(error) {
            callback('Unable to connect api service',undefined)
        } else if(response.body.error) {
            callback({error: response.body.error.message},undefined)
        } else {
            callback(undefined,{
                temp: response.body.current.temp_c,
                weather: response.body.current.condition.text,
                location: response.body.location.name,
                country: response.body.location.country
            })
        }
    })
}

module.exports = weather