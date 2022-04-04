const request = require("request");

const geocode = (address, callback) => {
    const encodeURLComponentAddress= encodeURIComponent(address)
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  encodeURLComponentAddress +'.json?access_token=pk.eyJ1IjoicmFmYWVsbG80MjAiLCJhIjoiY2wxY2x0cGprMDhxdjNmanBxMHE1ZzNmayJ9.Pw3_yM7HdEaP2g-rAQUWxA&limit=1'

    request ({ url, json: true }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services! ', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = (
    geocode
)
