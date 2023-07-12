// DEPENDENCIES
require('dotenv').config()
const PORT = process.env.PORT
const express= require('express')
const app = express()
const cors = require('cors')
const { Sequelize } = require('sequelize')
const path = require("path")
const { bodyParser } =require( 'body-parser')

//middleware
app.use(express.json())
app.use(cors({
    origin:"https://express-excursions.onrender.com"
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
// SEQUELIZE CONNECTION


// ROOT
app.get('/*', function(req,res){
        res.sendFile(path.join(__dirname, 'build','index.html'))
    })

// CONTROLLERS

const destinationsController = require('./controllers/destinations_controller')
app.use('/destinations', destinationsController)

const continentsController = require('./controllers/continent_controllers')
app.use('/continents', continentsController)



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
  

module.exports = app;