const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
  res.render('index',{
    title:'weather app',
    name:'Minh Huy'
  })
})
app.get('/about',(req,res) => {
  res.render('about',{
    title:'About me',
    name:'Minh Huy'
  })
})

app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'you must provide the address'
    })
  }

  geocode(req.query.address,(error,{latitude,longtitude,location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude,longtitude,(error,forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title:'Help',
    message:'Hello Minh Huy',
    name:'Minh Huy'
  })
})

app.get('/help/*',(req,res) => {
  res.render('404',{
    title:'404 Page',
    error:'Help article not found',
    name:'Minh Huy'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title:'404 Page',
    error:'Page not found',
    name:'Minh Huy'
  })
})

app.listen(3000,() => {
  console.log('server is running at port 3000')
})

