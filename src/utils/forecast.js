const request = require('request')

const forecast = (latitude,longtitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=72fa51c88af5f5c555134d6cb70ba9f3&query=' + latitude + ',' + longtitude
  request({url,json:true},(error,{body}) => {
    if (error) {
      callback('unable to connect service api!!',undefined)
    } else if (body.error) {
      callback('try another coordinate!!',undefined)
    } else {
      callback(undefined,body.current.weather_descriptions[0] + `. It's ` + body.current.temperature + ` degrees out. It's feels like ` + body.current.feelslike + ` degrees out`)
    }
  })
} 

module.exports = forecast