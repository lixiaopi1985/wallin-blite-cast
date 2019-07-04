const request = require('request');

const geocoding = (address, callback)=>{
    const accessToken = "pk.eyJ1IjoieHBpbmdsaSIsImEiOiJjanRoZ2hubnYwcGZvNDlwanY3MDNtaTV0In0.tV1awL0ijm1xgsiwq0d5QA";
    const query = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`;
    const url = encodeURI(query);

    request({url: url, json: true}, (err, response)=>{


        const respFeature = response.body.features[2];
        const userCoords = respFeature.geometry.coordinates; //callback ---> geojson
        const state = respFeature.context[respFeature.context.length - 2].short_code.split("-")[1]
        callback(userCoords, state);

    })

}


module.exports.geocoding = geocoding;



