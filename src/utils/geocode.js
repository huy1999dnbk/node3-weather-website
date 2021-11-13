const request = require('request')
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaHV5MTk5OWRuYmsiLCJhIjoiY2t2a2U4cjZ5MnVkazJvcWkyeTY3eHJqcSJ9.7AcWtHya28zIbdyLDRS7sQ&limit=1'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect api service!', undefined)
    } else if (body.features.length === 0) {
      callback('Try another search!', undefined)
    } else {
      
      callback(undefined, {
        longtitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode