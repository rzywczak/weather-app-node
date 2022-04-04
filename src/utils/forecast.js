const request = require('request')

const forecast = (latitude, longtitude, callback) =>  {


const url = 'http://api.weatherstack.com/current?access_key=2ebe666bbd210890c6f2743d3a26aac0&query='+ longtitude +',' + latitude

request({ url, json: true }, (error, {body} = {}) => {

    if(error){
        callback('Unable to connect to weather service!', undefined)
    }
    else if (body.error){
        callback('Unable to find location ', undefined)
    }
    else{
        callback(undefined, 'It is currently '+ body.current.temperature + ' degress out. There feels like a ' + body.current.feelslike + ' degress' )
        
    }

})
}

module.exports = forecast