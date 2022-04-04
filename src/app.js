const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

// Define paths for Express config 
const publicDirectoryPath =  path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')
const publicAboutFile = publicDirectoryPath+'/about.html'
const publicHelpFile = publicDirectoryPath+'/help.html'


// Setup hadnlebars engine and views location
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => { 
    res.render('index',{
        title: 'Weather app',
        name: 'Rafał Ż'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rafał Ż'
    })
})
app.get('/help', (req, res )=> {
    res.render('help', {
        helpText: 'Help for you for free',
        name: 'Rafał Ż',
        title: 'Help'
    })
})

app.get('/weather', (req, res )=> {
    if(!req.query.address){
        return res.send({
          error: 'you must provie an address! '
        })
    }
    // console.log(req.query.adress)

    argv = req.query.address
if(argv){
geocode(argv, (error, {latitude, longtitude, location} = {}) => {
    if(error){
        return res.send({error})  
    }
    forecast(latitude, longtitude, (error, forecastData) => {
        if(error){
            return error
        }
        res.send({
            address: req.query.address,
            location : location,
            forecastData
        })
       
      })
    }) 
}

})

app.get('/products', (req, res )=> {
    if(!req.query.search){
        return res.send({
          error: 'you must provie a serch message'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// app.get(publicAboutFile, (req, res ) => {
//     res.send('<title>About application</title>')
// })
//     res.send({
//         forecast: 'It is windy',
//         location: {
//             locationname: 'Kraków',
//             longtitude: 24.00,
//             latitude: 25.00
//         } 
//     })
// })
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Rafał Ż',
        errorMessage: 'This help article not found.'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rafał Ż',
        errorMessage: 'This page not found.'

    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000. ")
})





